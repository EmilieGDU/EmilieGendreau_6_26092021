# Parcours Développeur Web - OpenClassrooms #

## Projet n°6 - Construire une API sécurisée ##

### Scénario ###
Piiquante, la marque de condiments à base de piment, veut développer une application web de critique des sauces piquantes appelée "Hot Takes".  
Bien que la responsable produit de Piiquante veuille à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une *"galerie de sauces"* permettant aux utilisateurs de télécharger leurs sauces piquantes favorites et de liker ou disliker les sauces que d'autres partagent.

### Mission ###
Chargée de la partie **back-end** du site, ma mission consiste à construire l'**API sécurisée** de l'application.  
Le front-end a été développé au préalable, à l'aide d'Angular, et a été précompilé après des tests internes.

### Compétences évaluées ###
- Implémenter un modèle logique de données, conformément à la règlementation ;
- Stocker des données de manière sécurisée ;
- Mettre en oeuvre des opérations CRUD de manière sécurisée.

### Architecture générale du dossier ###
Le dossier de l'application est scindé en **deux dossiers** distincts :   
- le dossier *frontend*, dont le contenu a été fourni par OpenClassrooms, et cloné depuis <https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6> ; 
- le dossier *backend*.

### Lancement de l'application ###
#### Côté frontend ####
1. Ouvrir un premier terminal dans le dossier de travail ;
2. Se positionner dans le dossier frontend avec la commande `cd frontend` ;
3. Exécuter la commande `npm install` pour installer les dépendances ;
4. Exécuter la commande `npm start` pour lancer à la fois le serveur local et le navigateur.
#### Côté backend ####
1. Dans le dossier backend, renommer le fichier .env-deploy en .env, l'ouvrir et renseigner vos identifiants de connexion à MongoDB ;
2. Ouvrir un second terminal dans le dossier de travail ;
3. Se positionner dans le dossier backend avec la commande `cd backend` ;
4. Exécuter la commande `npm install` pour installer les dépendances ;
5. Exécuter la commande `nodemon server` pour faire tourner l'API, en prenant soin d'exécuter le back-end sur <http://localhost:3000> uniquement.