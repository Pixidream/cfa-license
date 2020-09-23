<div align="center">
  <img src="./resources/assets/book.png" height="128" />
  <br />
  <h1>CFA License</h1>
  <blockquote>
  <p>Course repository for License at CFA INSTA</p>
  </blockquote>
  <br />
  <br />
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" />
  <img src="https://forthebadge.com/images/badges/contains-technical-debt.svg" />
  <img src="https://forthebadge.com/images/badges/for-you.svg" />
  <img src="https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg" />
  <img src="https://forthebadge.com/images/badges/winter-is-coming.svg" />
</div>

# Comment ça marche ?
Commencez par installer GIT sur votre ordinateur (sur windows il vous faudra peu-être l'ajouter au PATH dans vos variables d'environnement)

Ensuite, Clonez le projet dans un dossier de votre choix.
Si le nom de dossier "cfa-license" vous convient, lancez la commande suivante dans le dossier dans le quel vous voulez avoir les cours:  
```sql
git clone https://github.com/Pixidream/cfa-license.git
```
Si le nom de dossier "cfa-license" ne vous convient pas, alors lancez la commande suivante :  
```sql
git clone https://github.com/Pixidream/cfa-license.git /path/du/dossier/mon-dossier
```
Cela aura pour effet de cloner le repository dans le dossier "mon-dossier".  

# Mise à jour des données
```diff
- WARNING: Ne modifiez pas directement les documents dans le repo. Faites une copie dans un dossier exterieur à celui-ci. Vous aurez une erreur pour mettre à jour les données dans le cas contraire.
```

Pour mettre à jour les données depuis le repo, il vous suffit d'ouvrir le terminal dans le repo, et de lancer la commande suivante:
```sql
git pull origin master
```

### Comment je sais que les données sont à jour ?
Sur le discord de la classe, dans le channel #cfa-insta-course-repo un bot envoie un message à chaque modification, voussavez donc en temps réel quand votre repository local doit être mis à jour !

# Notes supplémentaires
Les cours et exercices sont ceux que je (françois) publie sur le repo, ils ne sont pas forcément juste, si jamais vous voyez une erreur, ou voulez ajouter du contenu au repo, n'hésitez pas si vous ne savez pas manipuler git, à me faire un message discord.

Si vous savez manipuler git, il vous faudra alors suivre les étapes suivantes:
- Créer une branche avec pour nom le sujet de la modification (ex: ex1-c#)
- Faire vos modifications dans cette branche
- faire un commit avec en message, une explication de ce qu'apporte votre commit au repo (ex: ajout de l'exercice 1 en c#)
- faire une Pull request vers la branche master. La pull request devra être approuvé avant d'être merge dans master.

# Meta
Auteur: François Lavigne Marbach <developer@studiopixidream.com>  
Maintainer: [  
	- François Lavigne Marbach <developer@studiopixidream.com>  
]  

