# Référencement et publication LWS

## Ce que produit le projet

`npm ci`, puis `npm run build` génère dans `dist/` un site statique adapté à un hébergement mutualisé. Aucun serveur Node.js n'est nécessaire chez LWS. Le pré-rendu génère l'accueil et six paires de pages françaises et anglaises : agriculteurs/GIC, acheteurs, agronomes, investisseurs, projet et pilote.

Les textes sont présents dans le HTML sans exécuter JavaScript. React active ensuite le tableau de bord, le thème et le formulaire. Les contenus éditoriaux se trouvent dans `src/app/data/seoPages.ts`. Ne pas modifier directement `dist/`, qui est régénéré à chaque build.

Chaque page dispose d'un titre et d'une description propres, d'une URL canonique, de métadonnées sociales et de données structurées Organization/WebSite/WebPage. Les pages bilingues déclarent leurs alternatives réciproques `hreflang`. Le sitemap ne contient que des pages réellement générées. Aucune date de modification ni note client artificielle n'est ajoutée.

L'adresse principale retenue est **https://si-tcha.com/**. Les règles Apache redirigent HTTP et www vers cette adresse. Si un proxy/CDN termine le HTTPS, vérifier la configuration HTTPS avant activation pour éviter une boucle de redirection.

## Vérifications locales

1. `npm run build`
2. `npm run check:seo`
3. `npm run preview`, puis ouvrir l'adresse indiquée.

Le contrôle automatique vérifie les 13 pages, les textes pré-rendus, les titres/descriptions distincts, les canoniques, les données JSON-LD, les images, les liens internes, les ancres, les alternatives linguistiques et les fichiers d'exploration.

Vite preview ne simule pas Apache : il ne valide ni les redirections `.htaccess` ni le véritable statut 404 de LWS. Un contrôle en ligne est indispensable après publication.

Les images volumineuses ont été converties en WebP et redimensionnées. Les images sans référence dans le code ont été retirées de `src/assets` et conservées dans `.backups/seo-images-20261021/` pour récupération. Ce dossier ne doit pas être publié. Pour reconvertir les originaux, le script `scripts/optimize-images.mjs` peut les relire depuis cette sauvegarde.

## Publication

1. Identifier le panneau et le dossier racine du domaine : généralement `htdocs` avec LWS Panel, `public_html` avec cPanel ; vérifier dans l'offre plutôt que créer un dossier au hasard.
2. Sauvegarder les fichiers actuels et le `.htaccess` existant. Relever les anciennes URL à conserver et prévoir des redirections 301 spécifiques si elles changent. Ne pas tout rediriger vers l'accueil.
3. Activer/vérifier le certificat HTTPS du domaine et de www.
4. Envoyer **le contenu de `dist/`**, y compris `.htaccess`, dans la racine web. Ne pas envoyer le dossier parent, `src`, `.env.local`, `.backups`, `.seo-build` ou `node_modules`. Le dossier technique `dist/.vite` n'est pas nécessaire à l'hébergement.
5. Fusionner les règles du nouveau `.htaccess` avec d'éventuelles directives nécessaires à l'offre. Ne pas conserver d'ancienne réécriture qui renvoie toutes les URL vers `index.html` : les chemins inconnus doivent retourner 404.
6. Vérifier l'accueil, les 12 pages thématiques, les images, le formulaire et les liens. Faire un envoi Formspree intentionnel et confirmer sa réception dans `contact@si-tcha.com`.
7. Contrôler `http://si-tcha.com`, `https://www.si-tcha.com`, `/index.html`, une page sans slash final et une adresse inexistante. Confirmer les statuts 301/200/404 attendus et l'absence d'en-tête `X-Robots-Tag: noindex` injecté par l'hébergement.
8. Ouvrir `/robots.txt`, `/sitemap.xml` et `/indexnow-key.txt`. Vider un éventuel cache LWS/CDN après la mise en ligne.

Ne pas modifier les enregistrements MX, SPF, DKIM et DMARC de la messagerie lors d'un réglage du domaine.

## Google et Bing : interventions dans les comptes

- Ajouter une propriété de domaine dans Google Search Console et vérifier sa propriété avec le TXT DNS fourni par Google. Le code de vérification doit venir du compte réel ; il ne peut pas être inventé.
- Soumettre `https://si-tcha.com/sitemap.xml`, inspecter l'accueil et les pages prioritaires puis demander leur indexation. Vérifier le HTML exploré et le rapport d'indexation.
- Ajouter/importer le domaine dans Bing Webmaster Tools et soumettre le même sitemap. Surveiller également le rapport AI Performance s'il est proposé dans le compte.
- Après publication et contrôle des pages, lancer `npm run seo:notify` pour informer les moteurs participant à IndexNow. Le script vérifie d'abord que la clé et les pages sont présentes en ligne ; aucune notification n'est envoyée au build. Une réception IndexNow ne garantit pas l'indexation. Google ne remplace pas la Search Console par IndexNow.
- Suivre impressions, clics, requêtes, pages indexées et contacts reçus. Comparer les recherches de marque et les recherches métier, avec pays/appareil/période comparables.
- Vérifier les performances mobiles et les Core Web Vitals dans PageSpeed Insights et Search Console après déploiement ; les données terrain nécessitent suffisamment de visites.

## Weglot : accueil français indexable

Les nouvelles pages `/fr/…/` sont déjà rédigées en français, statiques et autonomes : elles ne dépendent pas de Weglot. Leurs pages anglaises sont sous `/en/…/`.

L'accueil conserve son contenu source anglais et son sélecteur Weglot. Sa traduction JavaScript ne crée pas à elle seule une seconde page d'accueil indexable. Pour l'indexation de sa traduction française :

1. Dans le projet Weglot, configurer le domaine de production et l'intégration SEO par sous-domaine ou sous-répertoire, selon l'offre disponible.
2. Exclure les pages éditoriales bilingues déjà générées pour éviter une seconde traduction et des variantes dupliquées. Le plus simple est de limiter cette traduction à l'accueil. Vérifier les options réellement disponibles dans le tableau de bord et l'offre.
3. Effectuer les changements DNS demandés par Weglot en préservant la messagerie.
4. Contrôler le contenu HTML, les canoniques et les alternatives de l'accueil traduit avant d'ajouter cette URL au sitemap. Aucune fausse URL française d'accueil n'est déclarée dans le code actuel.

Cette configuration nécessite l'accès au compte Weglot et aux DNS ; elle n'est pas réalisée par le build local.

## Visibilité dans les recherches et les réponses IA

Le fichier robots autorise l'exploration générale, y compris Googlebot, Bingbot et OAI-SearchBot. Vérifier que le pare-feu/CDN ne bloque pas leurs requêtes. L'accès du robot de recherche OpenAI est distinct du choix d'autoriser GPTBot pour l'entraînement ; la règle générale actuelle autorise les deux. Aucune citation ni position n'est garantie par ces règles ou les données structurées.

La priorité éditoriale suivante est une étude de terrain vérifiable : période du pilote, groupements participants autorisés à être cités, cultures, méthode, résultats et limites. Ajouter les biographies validées de l'équipe et les documents publics utiles dès qu'ils sont disponibles. Ne pas présenter les chiffres simulés du tableau de bord comme des résultats.

Obtenir des mentions et liens authentiques depuis les partenaires et programmes pertinents. Un logo sur notre page ne crée pas de lien depuis leur site. Aucun message aux partenaires n'a été envoyé. Éviter les achats massifs de liens, les faux avis et les pages générées en série sans valeur de terrain.

## Références officielles

- Google JavaScript SEO : https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Versions linguistiques : https://developers.google.com/search/docs/specialty/international/localized-versions
- Google et les fonctionnalités IA : https://developers.google.com/search/docs/appearance/ai-features
- Weglot SEO : https://support.weglot.com/article/293-how-does-weglot-manage-the-seo
- Robots OpenAI : https://developers.openai.com/api/docs/bots
- IndexNow : https://www.indexnow.org/documentation
- Publication LWS : https://aide.lws.fr/base/Hebergement-web-mutualise/Publication-de-site-web/Conseils-publier-site-web
