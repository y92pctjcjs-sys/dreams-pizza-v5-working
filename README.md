# Dream's Pizza Joigny — V5

Démo **Next.js** prête à être montrée à la pizzeria et poussée sur GitHub.

## Ce que contient cette V5

- accueil plus crédible commercialement
- carte riche inspirée des éléments publics de Dream's Pizza Joigny
- tailles **Junior / Senior / Mega**
- types de pâte **Classic / Pan / Cheesy**
- recherche dans la carte
- panier persistant
- checkout orienté **retrait à la pizzeria**
- **numéro de téléphone** comme champ principal
- paiement **espèces** ou **carte via Stripe**
- enregistrement local des commandes via `/api/orders`

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre `http://localhost:3000`.

## Variables d'environnement

Copie `.env.example` en `.env.local`.

```bash
cp .env.example .env.local
```

Renseigne ensuite :

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`

## Déployer

Ce projet est simple à publier sur GitHub puis sur Vercel.

### Push rapide

```bash
git init
git add .
git commit -m "Dreams Pizza Joigny V5"
git branch -M main
git remote add origin <TON-REPO-GITHUB>
git push -u origin main
```

## Fichiers utiles à modifier

### Carte et infos magasin

```bash
data/menu.ts
```

### Style global

```bash
app/globals.css
```

### Checkout

```bash
components/checkout-form.tsx
```

## Important

Cette V5 est une **démo avancée** :
- plusieurs éléments de Joigny sont repris depuis des sources publiques
- certains items secondaires restent une reconstruction démonstrative du réseau Dreams Pizza
- il faut encore **valider la carte finale, les prix finaux et les offres exactes** avec la pizzeria avant mise en production réelle
