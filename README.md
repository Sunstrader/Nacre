# NACRE — Les voix de l’abîme

**Version 2.0.0 · AAA Narrative Overhaul · Une aventure indépendante complète en français.**

Une ville engloutie vous reconnaît. Vous ne vous souvenez plus d’elle. Explorez ses lieux et leurs échos, retrouvez les organes du phare, accompagnez ceux qui y vivent et choisissez ce qui mérite de rester.


## Version 2.0.0 — AAA Narrative Overhaul

Cette version élève le jeu aux standards narratifs AAA :

- **Agency profonde** des quatre personnages principaux (désir, peur, secret, arc)
- **Urgences temporelles** visibles (rumeur → montée des eaux → appel de la Custode)
- **Densité émotionnelle** renforcée dès la scène d’ouverture
- **Secrets actifs** qui recontextualisent l’histoire
- Tous les tests automatisés restent verts
- Sauvegardes 1.x compatibles

Détails dans `docs/AAA-UPGRADE.md`.

## Jouer immédiatement

1. Décompressez toute l’archive.
2. Ouvrez **JOUER-NACRE.html** dans un navigateur récent sur ordinateur.
3. Choisissez **Commencer une traversée**, puis **Aventure** pour la difficulté normale.

Le fichier **JOUER-NACRE.html** contient le code et toutes les illustrations. Il peut être copié seul. Aucun compte, serveur, téléchargement complémentaire ni clé API n’est nécessaire pour le jeu. Les lanceurs Windows, macOS et Linux ouvrent ce même fichier.

L’interface comporte des dispositions pour téléphone et tablette. L’ouverture directe d’un HTML téléchargé dépend cependant du navigateur et du gestionnaire de fichiers mobiles : certains en montrent seulement un aperçu inactif. Une publication statique des sources permettrait un accès mobile plus simple ; **aucune publication en ligne n’a été effectuée**.

## Ce qui est livré

- Quatre chapitres jouables et leurs épilogues.
- 14 lieux accessibles depuis une carte, avec retours libres dans les zones ouvertes.
- 50 scènes dialoguées, 74 options narratives, réactions propres aux choix majeurs et variantes liées à l’ordre des rencontres.
- Exploration de deux états du monde : le présent et les souvenirs cachés dans l’écho.
- 8 fils de quête, dont l’histoire principale et l’atlas des six souvenirs.
- 5 énigmes : sceaux, canaux, cloches, pressions et astrolabe.
- 6 confrontations au tour par tour, toutes résolubles par l’apaisement.
- 3 compagnons, 3 compétences tactiques et 3 relations possibles, amicales ou amoureuses.
- Collecte, échanges, 5 recettes, consommables et 2 équipements permanents.
- 6 fins complètes, avec épilogues adaptés aux quêtes et aux liens.
- Nouveau Voyage+, galerie et 14 accomplissements persistants.
- Sauvegarde automatique, 3 emplacements manuels, traversée précédente, import et export JSON.
- 16 décors, 7 personnages mis en scène en deux poses, 4 portraits, 4 illustrations adverses et une couverture originale, réunis dans 9 fichiers PNG.
- Effets sonores locaux, narration optionnelle, taille de texte, réduction des mouvements, contraste renforcé et commandes clavier.

C’est une aventure d’exploration par repères et dialogues, avec des combats tactiques. Ce n’est pas un monde ouvert 3D ni une production de la taille d’un AAA de grand studio. La durée réelle n’a pas été mesurée auprès de joueurs ; aucun nombre d’heures n’est garanti.

## Musique et voix

**Aucune musique n’est incluse**, conformément à la demande. Dans Réglages → Vos musiques, sélectionnez vos fichiers audio. Ils sont lus en boucle, dans l’ordre choisi, uniquement sur votre appareil. Il faut les sélectionner à nouveau à chaque session.

La lecture vocale utilise la synthèse française disponible sur l’appareil. **Il n’y a pas de pack de doublage studio préenregistré.** Qualité et disponibilité varient selon le système ; certaines voix système peuvent nécessiter une connexion. La lecture est désactivée initialement. L’aperçu s’arrête immédiatement avec « Arrêter » ou à la fermeture de la fenêtre. Les autres sons baissent à 25 % durant la parole, sans être coupés.

## Commandes essentielles

| Commande | Effet |
| --- | --- |
| Clic / toucher sur un repère | Examiner, parler, récupérer, résoudre ou affronter |
| Liste Interactions | Les mêmes actions, accessibles sans viser le décor |
| E | Activer ou quitter l’écho |
| M | Carte et déplacements |
| J | Quêtes et historique |
| I | Inventaire |
| C | Compagnons |
| Échap | Fermer une fenêtre ou ouvrir la pause |
| Tab, Entrée | Navigation des commandes au clavier |

Les combats et les énigmes n’imposent aucun réflexe. Le repos au camp est gratuit et illimité. Après un échec, la partie continue au refuge ; les consommables dépensés restent dépensés.

## Sauvegardes

La progression reste dans le navigateur, sous les clés **nacre.v1.***. Aucune sauvegarde d’Elenya n’est lue ou modifiée. Les sauvegardes d’Elenya ne sont pas importables dans ce nouveau jeu.

Exportez un JSON avant de déplacer le HTML, vider les données du navigateur ou changer d’appareil. En ouverture locale, un changement de chemin du fichier peut modifier l’emplacement des sauvegardes. En navigation privée ou si le stockage est refusé, utilisez l’export manuel.

Commencer une nouvelle traversée garde l’ancienne dans **Traversée précédente** ; les trois emplacements manuels sont conservés. Un nouvel import ou chargement remplace la progression active après en avoir gardé une trace précédente. Conservez des exports pour archiver plusieurs traversées.

## Modifier le jeu

Les sources ne sont pas minifiées. Aucun outil de compilation n’est nécessaire pour éditer puis ouvrir `index.html` avec ses dossiers `src` et `assets`.

| Fichier | Rôle |
| --- | --- |
| `src/content.js` | Scénario, lieux, personnages, objets, quêtes, énigmes et fins |
| `src/engine.js` | État de partie, règles, combats, progression et validation des sauvegardes |
| `src/app.js` | Interface, interactions, import/export et préférences |
| `src/audio.js` | Effets, lecture vocale et musiques locales |
| `src/style.css` | Direction graphique et dispositions adaptatives |
| `assets/` | Illustrations intégrées, sans dépendance à un hébergeur |
| `tools/build.cjs` | Reconstruit le fichier HTML autonome |
| `tools/serve.cjs` | Serveur local de développement facultatif |
| `tests/` | Tests du moteur et tests d’intégration DOM |
| `docs/` | Architecture, solution, prompts des images et rapport de contrôle |

Avec Node.js 18 ou plus récent :

```bash
npm test
npm run build
npm start
```

`npm test`, `build` et `start` n’exigent aucune installation de dépendance. `npm start` ouvre un serveur à l’adresse indiquée dans le terminal. Arrêt : Ctrl+C.

Pour les tests d’intégration DOM supplémentaires :

```bash
npm install
npm run test:all
```

`jsdom` sert uniquement aux tests. Il n’est jamais chargé par le jeu.

## Vérifications et limites

**33 tests automatisés réussis** : parcours complets dans les trois difficultés, combat et apaisement, parcours principal sans annexes, six fins, énigmes, réactions distinctes, sauvegarde au milieu d’une conséquence, NG+, navigation de l’interface simulée et interruption vocale.

Le navigateur de contrôle a refusé les pages locales. **Le rendu visuel final dans un navigateur réel, l’affichage sur un appareil mobile et la qualité audible des voix n’ont donc pas été validés.** Les tests DOM ne les remplacent pas. Détails dans `docs/RAPPORT-TESTS.md`.

Les illustrations ont été inspectées séparément après génération. L’interface a été structurée pour les petits écrans, les interactions tactiles et le clavier. Aucun service tiers, paiement, compte, télémétrie ou appel d’IA n’est utilisé pendant le jeu.
