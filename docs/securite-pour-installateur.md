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

## Étape 3 — Pare-feu (À CONTRÔLER AVANT D'AGIR)

Le pare-feu Peut COUPER LE SITE ou VEROUILLER votre accès SSH s'il est mal réglé. **Ne l'activez pas sans répondre d'abord aux 2 questions suivantes** et nous transmettre les réponses :

1. Le site passe-t-il par un reverse proxy (nginx/caddy/apache) sur le port 80 ou 443, ou en direct sur 3010 ?
2. Quel port utilisez-vous pour la connexion SSH (22 standard ?) ?

En fonction de la réponse, on vous enverra les **3 lignes exactes** à coller.

## Étape 4 — Supervision du site (optionnel, 5 min)

Pas encore : on le fera via un service gratuit en ligne (UptimeRobot), sans rien installer sur le serveur.

## Ce dont on a besoin de vous

1. Confirmation que les étapes 1 et 2 sont passées (ou le message d'erreur).
2. Les réponses aux 2 questions de l'étape 3.

## Ce qu'il/elle ne faut PAS faire

- Modifier `sshd_config` (aucun réglage SSH)
- Éteindre ou redémarrer le VPS
- Toucher à `/opt/Techpal/TECHPAL`
- Supprimer le service `techpal-next.service`
