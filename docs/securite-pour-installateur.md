# TECHPAL VM-HEXCEL — Plan complet de finalisation sécurité

**Serveur :** `46.105.135.232` (Ubuntu 20.04.6 LTS) — **Maison actuelle des services :** TECHPAL (Next.js `:3010`), Odoo (8069/8072), Odoo 17 (`:8090`), MailHog.
**Règle absolue :** rien sur `/opt/Techpal/TECHPAL`, nginx, ni le service `techpal-next`. Chaque étape se termine par une vérification avant de passer à la suivante.

**Fait et vérifié** : Fail2ban (jail sshd active), `unattended-upgrades` configuré (redémarrage auto désactivé), TECHPAL en prod 200, Nginx testé OK.

---

## Étape 0 — MailHog : fermer la porte ouverte (priorité 1, 2 min)

MailHog écoute sur `*:1025` (SMTP) et `*:8025` (UI) avec des connexions distantes constatées. C'est un outil de dev qui ne doit **jamais** être accessible depuis Internet.

- Confirmer auprès de l'équipe dev d'abord :
  - **S'il n'est pas utilisé** (le plus probable) :
    ```bash
    sudo systemctl disable --now mailhog
    ss -tlnp | grep -E '1025|8025'   # attendu : aucun PID mailhog ; si encore présent, redémarrer le service après édition de l'unit
    ```
  - **S'il est utilisé pour les mails de test Odoo**, le restreindre au loopback : modifier `/etc/systemd/system/mailhog.service` et remplacer `ExecStart=/usr/local/bin/mailhog` par :
    ```ini
    ExecStart=/usr/local/bin/mailhog -smtp-bind-addr 127.0.0.1:1025 -http-bind-addr 127.0.0.1:8025
    ```
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl restart mailhog
    ss -tlnp | grep -E '1025|8025'   # attendu : 127.0.0.1 uniquement
    ```

## Étape 1 — Activer le pare-feu UFW (5 min, après Étape 0)

Les règles sont déjà préparées (`22/80/443 allow`, `1025/8025 deny`), l'option est **complètement safe** pour ce serveur puisque 3010 est local, et Odoo passe par Nginx.

```bash
# 1. Garder la session SSH actuelle OUVERTE et en ouvrir une seconde en parallèle pour vérifier
sudo ss -tlnp
sudo ufw status verbose
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# PAS 8069 / 8072 : Odoo est proxyficé par Nginx, un accès direct n'est pas requis
sudo ufw --force enable
sudo ufw status verbose
```

Validations :

- la **nouvelle session SSH** s'ouvre sans problème (l'ancienne est gardée en secours) ;
- depuis n'importe où : `curl -I https://www.techpalservices.com/en` → **HTTP/2 200** ;
- `curl -I https://hexcel.techpalservices.com/web/login` → **200** ;
- `sudo ufw status verbose` affiche `Status: active` et les 3 règles `ALLOW` + 2 `DENY`.

Rollback si besoin : `sudo ufw disable` puis, si perte totale d'accès, utiliser la console VPS de l'hébergeur.

## Étape 2 — Odoo : erreurs 500 sur la racine (coordination Odoo)

`https://hexcel.techpalservices.com/` répond HTTP 500 alors que `/web/login` répond 200. Ce n'est pas un problème de pare-feu, mais un problème applicatif/route.

```bash
journalctl -u odoo-server --since "2 hours ago" --no-pager | grep -Ei 'error|traceback' | tail -40
```

➡️ Transmettre la sortie à l'équipe Odoo / à l'intégrateur (BDD `hexcel_demo`, module personnalisé ?) avant de fermer l'étape.

## Étape 3 — Mises à jour en attente + redémarrage libssl1.1 (fenêtre calme)

- 167 paquets en attente ; `/var/run/reboot-required` indique `libssl1.1`.
- Décision : planifier une fenêtre de 30-60 min hors pics :
```bash
sudo cp -a /etc /etc.backup-$(date +%Y%m%d) 2>/dev/null || true
sudo apt update
sudo apt upgrade -y
sudo reboot
```
- Après reboot : `systemctl is-active techpal-next odoo-server odoo17 nginx` — tous attendus `active`.
- `unattended-upgrades` est déjà en place pour la suite, avec **pas de reboot auto** (conservé volontairement).

## Étape 4 — Ubuntu 20.04 EOL : ESM ou migration (décision business)

Ubuntu 20.04 n'a plus de support standard ; la VM n'est pas rattachée à Ubuntu Pro.

Option A — **garder focal + ESM** (gratuit jusqu'à 5 machines) :
- créer un compte sur `ubuntu.com/pro`, générer un jeton, puis `sudo pro attach <jeton>` ;
- vérifier : `pro status` → `esm-infra` en `enabled`.

Option B — **migrer** vers Ubuntu 22.04/24.04 : planifiée avec l'équipe infra (sauvegarde BDD + migration + tests Odoo).

➡️ À décider avec la direction technique. ESM fait gagner du temps sans migration.

## Étape 5 — Renforcement SSH (après validation des clés)

SSH actif : `PermitRootLogin yes`, `PasswordAuthentication yes`.

1. Sur une machine de l'entreprise : `ssh-keygen -t ed25519 -C "techpal-admin"` ;
2. installer la clé sur le serveur : `ssh-copy-id -i ~/.ssh/id_ed25519.pub root@46.105.135.232` (adapter le user si ce n'est pas root) ;
3. ouvrir un nouveau terminal et vérifier la connexion **sans mot de passe** ;
4. sauvegarder `/etc/ssh/sshd_config` puis, dans un fichier maintenu par l'installateur :
```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%Y%m%d)
sudo sed -i 's/^#*\s*PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sudo sed -i 's/^#*\s*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl reload ssh
```
5. Garder la session actuelle ouverte jusqu'à validation d'une nouvelle connexion.

## Étape 6 — Monitoring externe (gratuit, zéro install)

- https://uptimerobot.com → `New Monitor` → `HTTPS` → `https://www.techpalservices.com/en` → intervalle 5 min → alertes e-mail/SMS.
- Tester l'alerte en coupant temporairement le site (stop de `techpal-next` 1 minute, puis `systemctl start`).

## Étape 7 — Sauvegardes testées (validation restauration)

- PostgreSQL / Odoo : sauvegarde `pg_dump` des bases `hexcel_demo`, `IBS-TEST`, et `odoo` (rôles), plus le filestore (voir `data_dir` dans `/etc/odoo-server.conf`).
- Restaurer **une copie** de test sur une base de travail (ex. `restore_test`) et vérifier `SELECT count(*)` sur une table critique.
- Nginx et conf TECHPAL : déjà dans le git, les sauvegarder avec `/etc/nginx` sous `/root/security-backups` (le backup existe déjà pour UFW ; compléter avec nginx).

## Étape 8 — Optionnel : CrowdSec (défense communautaire)

```bash
curl -s https://install.crowdsec.net | sudo sh
sudo apt install -y crowdsec crowdsec-firewall-bouncer-iptables
sudo cscli collections install crowdsecurity/sshd crowdsecurity/nginx
sudo systemctl enable --now crowdsec
sudo systemctl restart nginx
sudo cscli decisions list
```

## Interdits

- NE PAS activer/redémarrer le VPS sans fenêtre et console de secours.
- NE PAS modifier `/etc/nginx`, `/opt/Techpal/TECHPAL`, le service `techpal-next`.
- NE PAS rebooter le serveur sans prévenir TECHPAL.
- NE PAS passer la clé GitHub Actions en admin.

## À renvoyer pour clôture

1. Sortie de l'étape 0 (MailHog inactif ou loopback) — preuve `ss -tlnp`.
2. Sortie `sudo ufw status verbose` après activation.
3. Nouveau comportement `/web/login` et TECHPAL OK.
4. Jeton ESM attaché ou plan de migration Ubuntu validé par la direction.
5. URL du moniteur UptimeRobot + preuve d'alerte de test.
6. Renvoyer l'erreur Odoo 500 si elle persiste.
