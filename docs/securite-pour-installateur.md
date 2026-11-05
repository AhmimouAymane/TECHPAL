# TECHPAL — Installation sécurité VPS (version simplifiée)

**À qui je m'adresse** : la personne qui a l'accès root/installation au serveur.
**Temps nécessaire** : ~15 minutes. **Compilation des étapes** : dans l'ordre, sans en sauter.
**Règle d'or** : rien dans `/opt/Techpal/TECHPAL`, ni `/etc/nginx`, ni `sshd_config` ne doit être modifié. Si un doute existe, on s'arrête et on nous demande.

## Ce qu'il faut savoir avant de commencer

Le site Next.js tourne déjà sur le port **3010** sous `techpal-next.service`.
Ce document ne touche **pas** le site : il ajoute seulement une protection aux portes d'entrée (SSH) + un maintien à jour automatique.

## Étape 0 — Se connecter

```bash
ssh <votre-compte-root>@46.105.135.232
```

## Étape 1 — Mises à jour de sécurité automatiques (5 min)

Copier-coller chaque ligne une par une :

```bash
python3 --version   # INFO : indique la version du système, pas grave si vide
sudo apt update
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -f noninteractive unattended-upgrades
sudo systemctl enable --now unattended-upgrades
```

Si aucune erreur rouge : c'est ok.

## Étape 2 — Fail2ban : blocage des brute-force SSH (5 min)

```bash
sudo apt install -y fail2ban
sudo tee /etc/fail2ban/jail.local >/dev/null <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
EOF
sudo systemctl enable --now fail2ban
sudo systemctl restart fail2ban
```

Vérification (pas obligé, mais conseillé) :

```bash
sudo fail2ban-client status sshd
```

Ça doit afficher `Server ready: true` et une liste (même vide) de banissements.

## Étape 3 — Pare-feu : commandes exactes

Configuration vérifiée du serveur : **Nginx sur 80/443 (reverse proxy) → 127.0.0.1:3010** ; SSH sur le port **22** ; 3010 n'est **pas** exposé.

Dans l'ordre, copier-coller :

```bash
sudo ss -tlnp
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH              # = 22/tcp
sudo ufw allow 80/tcp               # HTTP (nginx)
sudo ufw allow 443/tcp              # HTTPS (nginx)
sudo ufw logging on
sudo ufw --force enable
sudo ufw status verbose
```

Points de contrôle :

1. Le port **3010 ne doit PAS** apparaître dans `ss -tlnp` avec une adresse publique (il reste sur `127.0.0.1:3010`) : c'est le cas, vérifié. On ne l'ouvre pas dans ufw.
2. Avant d'activer : garder **une session SSH ouverte**, ouvrir une **nouvelle session SSH** de test dans un autre terminal. Si la nouvelle session passe, tout va bien ; on peut fermer l'ancienne.
3. Si un service inconnu écoute sur un port autre que 22/80/443 (dans `ss -tlnp`), vous arrêter AVANT d'activer et nous envoyer le résultat de `ss -tlnp`.

Vérification finale (depuis n'importe où, même votre machine) :

```bash
curl -I https://www.techpalservices.com/en | head -1   # attendu : HTTP/2 200
```

## Étape 3bis — CrowdSec + collection nginx (optionnel, recommandé)

```bash
curl -s https://install.crowdsec.net | sudo sh
sudo apt install -y crowdsec crowdsec-firewall-bouncer-iptables
sudo cscli collections install crowdsecurity/sshd crowdsecurity/nginx
sudo systemctl enable --now crowdsec
sudo systemctl restart nginx
sudo cscli decisions list
```

## Étape 4 — Supervision du site (optionnel, 5 min)

Pas encore : on le fera via un service gratuit en ligne (UptimeRobot), sans rien installer sur le serveur.

## Ce dont on a besoin de vous

1. Confirmation que les étapes 1, 2 et 3 sont passées (ou le message d'erreur, sans tenter de corriger vous-même).
2. Le résultat de `sudo ufw status verbose` si activé.

## Ce qu'il/elle ne faut PAS faire

- Modifier `sshd_config` (aucun réglage SSH)
- Éteindre ou redémarrer le VPS
- Toucher à `/opt/Techpal/TECHPAL`
- Supprimer le service `techpal-next.service`
