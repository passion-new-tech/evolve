<<<<<<< HEAD
# TD2 - Plateforme de Gestion Digitale - V3 REACT (EN COURS DE DEV)
![TD2 Banner](src/assets/logo-light-theme.svg)

## 📋 Aperçu

TD2 est une plateforme complète de gestion destinée a la transformation digitale des petites,moyenne et grandes entreprises en offrant entre autre une interface moderne et intuitive pour la gestion des utilisateurs, des présences, des candidatures, des formulaires dynamiques, des anciens étudiants (alumni), des appels d'offres, et bien plus encore. Développée avec React, Vite et Tailwind CSS et Boosted, TD2 propose une expérience utilisateur optimale, responsive et accessible.

## ✨ Fonctionnalités Principales

- 📊 Tableau de bord avec visualisation des données
- 👥 Gestion complète des utilisateurs
- 📝 Suivi des présences et absences
- 📋 Gestion des candidatures
- 📝 Gestion de formulaires dynamiques
- 👨‍🎓 Gestion des anciens étudiants (Alumni)
- 📢 Gestion des appels d'offres
- 🎓 Intégration avec un LMS (Learning Management System)
- 📱 Interface responsive et accessible

## 🚀 Technologies Utilisées

- **Framework** : React 18 + Vite
- **UI/UX** : Tailwind CSS, SurveyJS Creator
- **Langage** : TypeScript
- **Styling** : Orange Boosted,Tailwind CSS, SCSS modules
- **Visualisation** : Recharts, Lucid-charts
- **Gestion d'état** : React Context API
- **API** : Axios, Backend Node.js/Express ou Supabase REST
- **Authentification** : (à venir)

## 🛠️ Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://gitlab.com/oda-c7/nodedc/-/tree/dep/
   cd Nodedc
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Lancer l'environnement de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Ouvrir dans le navigateur**
   
   L'application sera disponible à l'adresse [http://localhost:4000](http://localhost:4000)

## 📂 Structure du Projet

```
src/
├── app/                    # Dossier principal de l'application (pages, layout, etc.)
│   ├── api/                
│   ├── components/         # Composants partagés (UI, formulaires, tables, navigation...)
│   ├── context/            # Contextes React (auth, thème, etc.)
│   ├── hooks/              # Hooks personnalisés
│   ├── styles/             # Fichiers de style globaux (Tailwind, SCSS...)
|   |── services            # Routes API 
│   ├── types/              # Définitions de types TypeScript
│   └── pages/              # Pages de l'application (Dashboard, Utilisateurs, Formulaires, etc.)
├── public/                 # Fichiers statiques (icônes, images, manifest...)
└── tests/                  # Tests unitaires et d'intégration
```

## 🎨 Design System

L'application utilise Tailwind CSS et Boosted pour un design moderne, accessible et responsive. Un gestionnaire de formulaires est intégré pour la conception de formulaires avancés. L'interface respecte les normes d'accessibilité WCAG 2.1.

## 📊 Fonctionnalités Détails

### Tableau de Bord
- Visualisation des statistiques clés
- Graphiques interactifs
- Accès rapide aux fonctionnalités principales

### Gestion des Utilisateurs
- Création et gestion des comptes
- Rôles et permissions
- Profils personnalisables

### Présences & Absences
- Marquage des présences
- Suivi des retards
- Génération de rapports

### Gestion des Candidatures
- Dépôt de candidature en ligne
- Suivi de l'état des candidatures
- Évaluation des candidats

### Gestion des Formulaires Dynamiques
- Création, édition et suppression de formulaires dynamiques (SurveyJS)
- Sauvegarde des schémas de formulaire en base de données (PostgreSQL/Supabase)
- Visualisation des réponses (à venir)

### Alumni
- Annuaire des anciens étudiants
- Mise en relation
- Suivi de carrière

### Appels d'Offres
- Publication d'offres
- Soumission des candidatures
- Gestion des soumissions

### LMS (Learning Management System)
- Accès aux cours en ligne
- Suivi de la progression
- Ressources pédagogiques

=======
# NodeDC



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/oda-c7/nodedc.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/oda-c7/nodedc/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
>>>>>>> cbd8de4d9042f5c2b664aae791458595fe0c0769
