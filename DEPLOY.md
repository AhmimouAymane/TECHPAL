# Guide de déploiement - Techpal Studio

Site vitrine TECHPAL (Next.js 16 + React 19 + Tailwind v4). Tout le site est statique, sauf la route `/api/contact` (formulaire → e-mail via SMTP).

## 1. Prérequis

- Node.js **20 ou plus** et npm
- Un compte Gmail avec un **mot de passe d'application** (pour l'envoi du formulaire de contact)

## 2. Variables d'environnement

Créer un fichier `.env.local` à la racine (jamais commité) :

```env
# Connexion SMTP (Gmail : mot de passe d'application, PAS le mot de passe du compte)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=techpalservices@gmail.com
SMTP_PASS=<mot-de-passe-application-16-caracteres>
CONTACT_TO=contact@techpalservices.com
```

| Variable      | Rôle                                                        | Obligatoire    |
| ------------- | ----------------------------------------------------------- | -------------- |
| `SMTP_HOST`   | Serveur SMTP sortant                                        | Oui            |
| `SMTP_PORT`   | Port SMTP (465 = SSL par défaut si absent)                   | Non            |
| `SMTP_USER`   | Compte d'envoi                                              | Oui            |
| `SMTP_PASS`   | Mot de passe d'application Gmail                            | Oui            |
| `CONTACT_TO`  | Boîte de réception des messages du formulaire (défaut : `SMTP_USER`) | Non   |

## 3. Installation et build

```bash
npm ci          # installation des dépendances (npm install fonctionne aussi)
npm run build   # génère le dossier .next
```

## 4. Démarrage

### Option A - VPS / serveur (production)

```bash
npm run start                # écoute sur le port 3000 par défaut
npm start -- -p 3001         # autre port si besoin
```

Garder le process en vie avec PM2 :

```bash
npm i -g pm2
pm2 start "npm start -- -p 3000" --name techpal
pm2 save
```

Puis placer un reverse proxy (Nginx/Caddy) devant le port 3000, avec HTTPS et la redirection `www` si besoin.

### Option B - Vercel

1. Importer le dépôt sur Vercel.
2. Renseigner les variables du tableau ci-dessus dans *Settings → Environment Variables*.
3. Déployer (le build `next build` est détecté automatiquement).

## 5. Check-list avant mise en ligne

- [ ] `.env.local` présent avec les 4 variables SMTP et le mot de passe d'application valide
- [ ] Formulaire de contact testé : un message part bien de `SMTP_USER` vers `CONTACT_TO`
- [ ] Domaine configuré (correct custom domain), HTTPS actif
- [ ] `https://<domaine>/sitemap.xml` accessible
- [ ] Favicon affiché (`src/app/icon.png` + `src/app/favicon.ico`)
- [ ] Vérifier les pages `/`, `/fr`, `/en`, `/fr/projets`, `/fr/contact`

## 6. Contenu / maintenance

- Textes FR/EN : `src/content/fr.ts` et `src/content/en.ts`
- Clients, technologies, menu : `src/content/site.ts`
- Projet/réalisations : `src/content/projects.ts`
- Images : `public/` (logos clients dans `public/partners/`, visuels projets dans `public/projets/`, logos technos dans `public/tech/`)
- Le formulaire SMTP est dans `src/app/api/contact/route.ts`
