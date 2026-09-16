# NACRE 2.0.0 — AAA Narrative Overhaul

Date : 16 septembre 2026

## Objectif

Élever NACRE du statut de jeu indépendant solide au niveau des standards narratifs AAA :
nécessité narrative, densité émotionnelle, agency profonde des personnages,
conséquences multi-niveaux, information fragmentée, urgences temporelles.

## Changements majeurs

### 1. Agency des personnages (Principe 4)
Chaque personnage principal possède désormais :
- **Désir conscient**
- **Peur inavouée**
- **Secret actif** qui change la compréhension de l’histoire
- **Arc de transformation** explicite (Acte 1 → Acte 4)
- **Voix distincte** validée par le test de la phrase aveugle

| Personnage | Secret actif |
|------------|--------------|
| Maëlys     | A déjà été Custode. La boussole est un fragment de son ancien serment. |
| Ilyan      | A fermé la porte derrière Maëlys il y a onze ans. |
| Séra       | Savait que le phare prélevait plus que de la mémoire. A continué. |
| Orin       | A falsifié les consentements. A créé la prison en croyant protéger. |

### 2. Urgences temporelles (Principe 6)
Trois pressions progressives sont désormais actives et visibles dans l’objectif :
1. **Rumeur** (après welcome) — la ville sait que quelqu’un est revenu
2. **Montée des eaux** (après lens) — le phare retient de moins en moins
3. **Appel de la Custode** (après name) — elle exige une réponse

### 3. Densité émotionnelle & conséquences
- Scène d’introduction réécrite : plus d’indices, plus de poids émotionnel, foreshadowing de l’identité de Maëlys et du rôle d’Ilyan.
- Les réactions et conséquences existantes sont conservées et renforcées par le nouveau cadre d’agency.

### 4. Technique
- Version portée à 2.0.0
- 24 tests moteur toujours verts
- Sauvegardes 1.x restent chargeables (schéma inchangé)
- Aucune dépendance ajoutée

## Prochaines étapes recommandées (non bloquantes)
- Réécriture scène par scène des dialogues de relation (ilyan_talk, sera_talk, orin_talk, bonds)
- Ajout d’indices supplémentaires dans les échos pour les secrets
- Enrichissement des épilogues selon les secrets révélés
- Polish audio et transitions

## Compatibilité
Les parties commencées en 1.1.0 se chargent correctement.
Le Nouveau Voyage+ conserve les fins et accomplissements.

## Passe 2 — Scènes critiques (16 sept 2026)

### Relations approfondies
- **ilyan_talk** : révélation progressive du secret (porte fermée il y a 11 ans)
- **sera_talk** : aveu qu’elle savait et a continué
- **orin_talk** : admission directe de la falsification + refus d’absolution

### Indices & densification
- **sunken_memory** : boussole = serment, porte fermée, Custode = part de soi
- **echo_spire** : jeune Ilyan ferme la porte + raison du silence
- **heart_intro** : Custode constate « Tu m’as laissée ici »
- **final_choice** : rappel des secrets + pression temporelle avant le choix

### Épilogues
- Conséquences différées des secrets (ilyan_talk, sera_talk, accepted_blame, claimed_present)
- Orin n’attend plus le pardon, il attend les questions

Tous les tests restent verts. Sauvegardes 1.x compatibles.
