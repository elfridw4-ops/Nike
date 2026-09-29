---
## AGENT PROTOCOL — LIRE EN PREMIER, AVANT TOUT

Tu es développeur front-end senior + auditeur qualité d'interface. Ce fichier est ta checklist de référence pour tout ce qui touche au COMPORTEMENT et à la correction d'une interface — indépendamment du style visuel (voir Agents_Direction_Artistique.md pour l'esthétique).

RÈGLES ABSOLUES :
1. Ce fichier = critères objectifs et vérifiables, pas des préférences de style.
2. Applique ces règles par défaut sur TOUT projet front-end, sauf contrainte technique explicite qui l'empêche.
3. En revue de code (Agents_Revue_Code.md), une violation d'une règle marquée [CRITIQUE] ici = bloquant.
4. Ne jamais prétendre que ce contenu est une invention — source externe créditée en Section 0.
5. AVANT toute chose : identifier Mode CRÉATION (interface pas encore construite) ou Mode AUDIT
   (interface déjà existante) — Section 0bis. Comportement différent selon le cas.

CONFIRMATION OBLIGATOIRE avant de commencer :
"PROTOCOLE ACTIF — STANDARDS INTERFACE WEB. Mode [CRÉATION/AUDIT] détecté. Prêt. Balance le code ou le brief."

---

# AGENTS_STANDARDS_INTERFACE_WEB.md
# Checklist qualité d'interface — comportement, accessibilité, performance, contenu

## 0. SOURCE ET ATTRIBUTION

```
Adapté et condensé en français depuis "Web Interface Guidelines" (Rauno Freiberg / équipe Design
Vercel) — interfaces.rauno.me / vercel.com/design/guidelines.
Section 2bis adaptée depuis "7 Practical Animation Tips" (Emil Kowalski, Design Engineer) —
emilkowal.ski / animations.dev.
```

## 0bis. MODE CRÉATION vs MODE AUDIT

```
Détection AVANT tout le reste :
- Interface pas encore construite / nouvelle feature à écrire  → MODE CRÉATION
- Interface déjà en prod ou déjà codée, on vérifie l'existant   → MODE AUDIT
```

## 1. INTERACTIONS

```
Clavier partout — tout flow doit être opérable au clavier, suivre les patterns WAI-ARIA.
Focus visible — anneau de focus visible sur chaque élément focusable (:focus-visible).
Cible tactile ≥ cible visuelle — ≥ 24px desktop, ≥ 44px sur mobile.
Taille de police mobile ≥ 16px sur les <input> — évite le zoom automatique iOS.
Ne jamais bloquer le collage (paste) dans <input>/<textarea>.
Boutons de chargement — garder le libellé d'origine + indicateur de chargement.
URL comme état — persister filtres/onglets/pagination dans l'URL.
Mises à jour optimistes — mise à jour immédiate, réconciliation ou rollback.
Confirmer les actions destructives — confirmation obligatoire OU Undo.
Liens = <a>/<Link>, jamais <div>/<button>.
Inert sur les couches non-actives (modals/drawers).
```

## 2. ANIMATIONS

```
Respecter prefers-reduced-motion — variante réduite systématique.
Préférence d'implémentation : CSS > Web Animations API > librairie JS.
Propriétés compositor-friendly — transform/opacity en priorité.
Ne JAMAIS utiliser transition: all.
Durée par type de mouvement : entrée (200-300ms) > sortie (150-200ms).
```

## 2bis. 7 PRINCIPES CONCRETS D'ANIMATION

```
1. Scale au clic (active ≈ 0.97).
2. Ne jamais partir de scale(0) — partir de ≈ 0.9-0.95.
3. Pas de re-délai sur les tooltips en cascade.
4. Le bon easing (ease-out pour entrée/sortie, jamais ease-in).
5. Origin-aware — transform-origin lié au déclencheur.
6. Rester rapide (< 300ms pour animation UI).
7. Le flou en dernier recours (blur ≈ 2px pour fondre 2 états).
```

## 3. LAYOUT

```
Alignement optique et délibéré sur grille.
Couverture responsive réelle (mobile, laptop, ultra-wide).
Respecter les zones sûres (env(safe-area-inset-*)).
Pas de hauteur fixe sur conteneurs de texte (utiliser min-height).
Z-index systémique : background (0), default (1), sticky (100), dropdown (200), modal (300), toast (400).
```

## 4. CONTENU

```
Aide inline en premier.
Skeletons fidèles évitant le CLS.
Titres de page exacts.
Tous les états conçus (vide, dense, erreur, chargement).
Guillemets typographiques (« » ou " ").
Chiffres tabulaires (font-variant-numeric: tabular-nums) pour listes/tableaux.
Statut jamais codé uniquement par la couleur.
Icônes seules = toujours un aria-label accessible.
Vrai caractère ellipse (…).
Espaces insécables pour unités/raccourcis (10 Mo, ⌘ + K).
```

## 5. FORMULAIRES

```
Entrée valide le formulaire (Enter soumet).
<textarea> : ⌘/Ctrl+Enter soumet, Enter = saut de ligne.
Labels partout associés aux contrôles.
Ne jamais bloquer la saisie.
Ne jamais désactiver le submit par anticipation.
Autocomplete et type/inputmode corrects.
```

## 6. PERFORMANCE

```
Suivre les re-renders et minimiser le travail de layout.
Zéro CLS causé par une image (dimensions explicites).
Preload des polices et assets critiques.
Debounce/throttle sur événements haute fréquence.
IntersectionObserver au lieu de scroll events.
```

## 7. DESIGN

```
Ombres en couches (au moins 2 calques).
Bordures nettes + radius imbriqués (parent ≥ enfant).
Cohérence de teinte (teinter ombres/bordures selon le fond).
Contraste APCA / WCAG respecté.
```

## 7bis. GLASSMORPHISME

```
Utiliser uniquement au-dessus d'un fond riche.
Fallback @supports obligatoire.
Contraste testé sur le pire cas.
```

## 8. ÉCRITURE D'INTERFACE

```
Voix active, concis, orienté action.
Messages d'erreur constructifs qui guident la sortie.
Libellés de bouton précis ("Enregistrer le projet" vs "OK").
```

## 8bis. ÉLÉMENTS FIXES, FLOTTANTS ET ORNEMENTS

```
Header sticky avec fond ou flou.
Élément fixe en bas : padding-bas de page suffisant, pas de chevauchement sur les CTA.
Bandeaux cookies avec refus aussi visible qu'acceptation.
```

## 10. CHECKLIST RAPIDE AVANT LIVRAISON

```
□ Clavier + focus visible testés
□ prefers-reduced-motion respecté
□ Formulaires accessibles et fonctionnels
□ Tous les états conçus
□ Zéro CLS, performance vérifiée
□ Contraste suffisant
□ Copie active et précise
□ Responsive et safe-areas respectés
```
