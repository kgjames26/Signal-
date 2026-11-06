# Signal

Site PWA qui regroupe et décrit automatiquement tous tes projets déployés sur Vercel.

Il se met à jour tout seul dès que tu ajoutes un nouveau projet sur Vercel (via l’API Vercel).

## Fonctionnalités

- Liste dynamique de tous tes projets Vercel
- Descriptions personnalisées (faciles à éditer dans le code)
- Liens directs vers les sites
- Design sombre et moderne
- Installable comme PWA

## Configuration obligatoire

1. Crée un token Vercel :
   - Va sur [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Crée un nouveau token (scope : Full Account ou au minimum les projets)
2. Après le déploiement sur Vercel, ajoute `VERCEL_TOKEN` dans les variables d’environnement Production (et Preview si nécessaire), puis redéploie.

## Personnaliser les descriptions

Ouvre `app/api/projects/route.js` et modifie l’objet `DESCRIPTIONS`.

## Déploiement

1. Pousse ce dépôt sur GitHub.
2. Importe-le dans Vercel.
3. Ajoute la variable `VERCEL_TOKEN`.
4. Déploie.

Le site se met à jour automatiquement à chaque nouvelle visite (cache serveur de 60 secondes).
