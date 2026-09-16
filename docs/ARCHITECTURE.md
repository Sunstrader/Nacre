# Architecture de NACRE 1.1.0

## Choix de réalisation

Jeu de rôle narratif en HTML/CSS/JavaScript, sans dépendance d’exécution. Un HTML autonome embarque illustrations, styles, contenu et moteur. Le même jeu existe en sources séparées pour rester facilement modifiable. Le livrable est un jeu indépendant à fin, avec des objectifs, des risques, des ressources, une progression et des conclusions ; l’étiquette AAA n’est pas revendiquée.

Le monde est composé de lieux reliés. Les conditions de progression ouvrent les destinations de la carte. Le joueur peut voyager librement entre les destinations ouvertes, sans coût caché. Dans chaque lieu, des repères donnent accès aux dialogues, aux mécanismes, aux collectes et aux confrontations. L’écho révèle un ensemble supplémentaire de repères.

## État et sauvegarde

`Game.s` contient toute la progression d’une traversée : lieu, état de l’écho, jauges, expérience, drapeaux, inventaire, liens, dialogue, page et éventuelle réaction au choix, état de combat, positions de l’énigme et fin atteinte.

`Game.meta` conserve les fins, accomplissements et décors découverts entre les traversées. Le NG+ repart d’un nouvel état narratif ; il conserve cette collection et accorde quatre matériaux supplémentaires.

Format d’export : `{ app: "nacre", schema: 1, exportedAt, state, meta }`. Validation avant mutation du jeu. Les états importés sont copiés, les valeurs numériques bornées et les références structurelles vérifiées. Les textes issus d’une sauvegarde sont échappés avant affichage. Aucun `eval` de texte importé, aucune URL externe dans les sauvegardes.

Stockage navigateur : `nacre.v1.auto`, `nacre.v1.previous`, `nacre.v1.slot1..3`, `nacre.v1.meta`, `nacre.v1.settings`, `nacre.v1.tutorial`. Les données et sauvegardes d’autres jeux ne sont pas consultées.

## Progression principale

Port → Lanternes → Archives / lentille → Écluse → Turbine / cœur → Pont → Quartier englouti / nom → Flèche / astrolabe → Cœur / confrontation → décision finale.

Les chemins optionnels sont la jetée, la crypte, le jardin, les rencontres au camp et les retours au quartier. L’évacuation et le registre révélé ouvrent une fin collective. Trois autres fins restent disponibles sans compléter les annexes. Les romances ne sont nécessaires à aucune fin principale.

## Confrontations

Chaque ennemi possède un cycle déterministe d’intentions visibles. Le joueur agit, puis l’intention annoncée est exécutée. Aucun tirage aléatoire caché ne décide du succès.

- Frapper : dégâts physiques, armure appliquée, +1 concentration.
- Se protéger : réduction de dégâts, +2 concentration, bonus de détermination plafonné à 3.
- Esquiver : coûte 1 concentration, annule la frappe adverse du tour.
- Résonner : coûte 2 concentration, traverse l’armure, augmente la résonance.
- Apaiser : coûte 1 concentration, avance une issue pacifique.
- Compagnon : assistance déterminée par le partenaire actif, recharge de 3 tours.
- Objet : soin, concentration ou dégâts à travers l’armure ; consomme le tour.

Les victoires pacifiques accordent les mêmes récompenses de progression. Les ressources d’une confrontation déjà gagnée ne peuvent pas être obtenues à nouveau. Échec ou repli ramène au refuge sans bloquer l’histoire.

## Relations et factions

Les relations évoluent surtout via les conversations et quêtes. À partir de 4 points de confiance, une conversation de lien s’ouvre au camp. Le joueur choisit une relation amoureuse ou amicale. Les personnages sont adultes ; l’accord est explicite. Une seule romance est possible par traversée, les autres amitiés restent ouvertes.

La confiance des Libres peut ouvrir une négociation au pont. Les orientations envers les Veilleurs et les Libres sont conservées et visibles. La détermination renforce la garde ; la résonance ouvre la fin de la couronne.

## Audio

Effets de courte durée via Web Audio, aucune piste musicale générée. Musiques personnelles via URL d’objet, sans téléversement. Lecture vocale découpée en phrases et protégée par un compteur d’annulation pour qu’un ancien callback ne reprenne pas après arrêt. Musique et effets atténués à 25 % pendant la voix. Aucun abonnement ni appel d’API dans le jeu.

La qualité de la synthèse est celle de l’appareil, pas celle d’un doublage fourni. Le jeu reste jouable sans audio.

## Visuels

Neuf PNG originaux créés avec l’outil intégré image_gen : couverture, quatre atlas de quatre décors, atlas de quatre portraits, deux atlas de personnages en deux poses et atlas de quatre adversaires. Ils sont utilisés directement, sans dépendance réseau. Les nouveaux plans privilégient les tiers et la profondeur. Les sprites alternent respiration et réaction par transitions CSS ; les mouvements et particules restent désactivables. Aucun modèle 3D ni vidéo n’est livré.

Prompts et chemins dans `art-prompts.json`, `enemy-art-prompt.txt` et `ASSETS.json`.

## Extension

Ajouter les éléments dans `content.js`, puis leurs références dans les lieux. Chaque effet de choix est une donnée structurée : drapeaux, inventaire, relations, expérience et journal. Garder les identifiants existants pour préserver les sauvegardes. Pour une modification incompatible de la structure, ajouter une migration explicite et changer le schéma ; ne jamais effacer silencieusement les anciennes parties.
