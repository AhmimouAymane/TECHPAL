# Runbook sécurité — VPS TECHPAL (46.105.135.232)

État actuel : le site Next.js tourne sous `techpal-next.service` sur le port **3010**.
Le déploiement passe par GitHub Actions (`.github/workflows/deploy.yml`) : `git pull` →
`npm ci` → build → `systemctl restart techpal-next.service`.

**Règle d'or** : ne jamais élargir les droits sudo de la clé GitHub (`TECHPAL_SSH_KEY`).
Le compte de déploiement n'a le droit de faire que `systemctl restart techpal-next.service`.
Toute la mise en place ci-dessous = **une seule fois, à la main, avec ton accès root**.

---

## 0. Reconnaissance (avant tout)

```bash
ssh <ton-user-root>@46.105.135.232
cat /etc/os-release
ss -tlnp                 # quoi écoute sur quels ports (3010 ? 80/443 ? nginx ?)
sudo last -a | head      # connexions récentes
ps aux | grep -E 'nginx|apache|caddy' | grep -v grep
```

Note : si `ss` montre un reverse proxy (nginx/caddy) sur 80/443, active les jails web correspondantes.
Si **seul** 3010 est exposé, bloque le reste avec l'étape 1.

## 1. Pare-feu (ufw)

```bash
sudo apt update && sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH              # ou : sudo ufw allow from <IP-admin> to any port 22
sudo ufw allow 80/tcp               # si reverse proxy présent
sudo ufw allow 443/tcp
# si 3010 est ouvert en direct sur Internet :
# sudo ufw allow 3010/tcp
sudo ufw --force enable
sudo ufw status verbose
```

Mieux : exposer **uniquement** 80/443 via un reverse proxy + firewall, et laisser 3010 en 127.0.0.1.
Si tu veux, on met ça en place dans un second temps (modifie juste `next start -p 3010` + config nginx + ufw).

## 2. Fail2ban (brute force SSH + HTTP)

```bash
sudo apt install -y fail2ban
sudo tee /etc/fail2ban/jail.local >/dev/null <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true

# Décommente si nginx est présent :
# [nginx-http-auth]
# enabled = true
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

## 3. CrowdSec (détection collaborative active)

```bash
curl -s https://install.crowdsec.net | sudo sh
sudo apt install -y crowdsec crowdsec-firewall-bouncer-iptables || sudo apt install -y crowdsec
sudo cscli collections install crowdsecurity/sshd
sudo cscli collections install crowdsecurity/nginx      # si nginx présent
sudo systemctl enable --now crowdsec
sudo cscli decisions list | head
```

CrowdSec bloque les IPs malveillantes déjà fichées dans la communauté (utile pour les scanners/bots).

## 4. Mises à jour automatiques de sécurité

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -f noninteractive unattended-upgrades
sudo systemctl status unattended-upgrades
```

## 5. Supervision de disponibilité (uptime)

Option A — rien à installer : UptimeRobot (gratuit, HTTPS toutes les 5 min, alertes e-mail/Telegram) :
https://uptimerobot.com → moniteur "HTTPS" sur `https://www.techpalservices.com/en`.

Option B — auto-hébergé (si tu préfères tout chez toi) :

```bash
docker run -d --restart=always --name uptime-kuma -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma:1
```

Puis ajouter le moniteur `https://www.techpalservices.com/en` + notification Telegram/e-mail.

## 6. Métriques serveur (optionnel)

Netdata : CPU/RAM/disque/SSH échoués en live, avec alertes Telegram.

```bash
curl -s https://my-netdata.io/kickstart.sh | bash
```

⚠️ Expose Netdata **uniquement en local/VPN** (le port 19999), ou avec authentification.

## 7. Vérifications d'hygiène (5 min)

- `sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'` → `passwordauthentication no`, `permitrootlogin prohibit-password` (clé > mot de passe)
- Ta clé publique d'admin est dans `~/.ssh/authorized_keys` ; les clés GitHub Actions sont **différentes**
- `sudo apt upgrade -y` après l'installation de tout ce qui précède
- Sauvegarde de `/opt/Techpal/TECHPAL/public` et des uploads éventuels

## 8. Côté dépôt (déjà fait)

Ces éléments ne remplacent pas le runbook, ils le complètent :

- **next.config.ts** : en-têtes de sécurité sur toutes les routes (nosniff, DENY, HSTS, Permissions-Policy…)
- **.github/dependabot.yml** : PRs hebdo de correctifs npm + mensuelles GitHub Actions
- **.github/workflows/security.yml** : `npm audit` en mode advisory (rapports sans bloquer le deploy)

## 9. CSP stricte (à NE PAS activer sans test)

Un vrai Content-Security-Policy nécessite un nonce Next.js ou `unsafe-inline`. À préparer et
tester en préprod avant activation ; tant que ce n'est pas fait, les en-têtes ci-dessus suffisent.
