# Rapport de contrôle — NACRE 2.0.0 AAA

Date : 16 septembre 2026.

## Résultat

**24 tests moteur automatisés réussis, 0 échec.**

(Les tests d’interface jsdom restent disponibles via `npm run test:all`.)

## Changements 2.0.0 validés

| Domaine | Contrôle |
|---------|----------|
| Contenu | Chargement de content.js 2.0.0, 50 events, 14 rooms, 6 endings |
| Agency | Désir / peur / secret / arc présents sur les 4 personnages |
| Pression | Trois flags temporels (rumor, water, custode) activés par evaluate() |
| Objectif | Affiche l’urgence active |
| Campagne | Parcours complets dans les 3 difficultés (combat + apaisement) |
| Fins | Les 6 fins restent atteignables |
| Sauvegardes | Schéma 1 conservé — compatibilité 1.x |
| NG+ | Fins et accomplissements conservés |

## Limites connues (inchangées)

Le rendu visuel final dans un navigateur réel et la qualité audible des voix n’ont pas été revalidés sur appareil physique. Les illustrations restent celles de la 1.1.0.

## Reproduire

```bash
npm test
npm run build
```
