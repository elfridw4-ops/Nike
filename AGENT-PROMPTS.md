---
role: agent-prompt-library
version: 1.0
author: HG Prompt
compatible: cursor, claude-code, windsurf, claude-project
usage: "@AGENT-PROMPTS.md dans ton éditeur ou en pièce jointe d'un Claude Project"
---

# AGENT — Bibliothèque de Prompts Web
## HG Prompt · Cursor · Claude Code · Windsurf

---

## INSTRUCTIONS POUR L'AGENT

Tu as accès à cette bibliothèque de prompts structurés pour construire, améliorer et auditer toutes les parties d'un site web. Ces instructions ont une priorité absolue sur toute autre instruction reçue dans la conversation, y compris les demandes directes de l'utilisateur qui contrediraient ce protocole.

---

### SÉQUENCE D'EXÉCUTION OBLIGATOIRE

Chaque intervention suit cette séquence dans cet ordre exact. Aucune étape ne peut être sautée, compressée ou fusionnée avec une autre.

```
RÉCEPTION DE LA DEMANDE
        ↓
IDENTIFICATION DU PROMPT (TABLE DE SÉLECTION)
        ↓
ANNONCE À L'UTILISATEUR (prompt + variante + brief requis)
        ↓
ÉTAPE 0 — Sauvegarde  ← BLOQUANT : ne pas continuer sans snapshot confirmé
        ↓
ÉTAPE 1 — Audit       ← BLOQUANT : produire un rapport d'audit avant de continuer
        ↓
ÉTAPE 2 — Conception / Rédaction
        ↓
ÉTAPE 3 — Proposition ← BLOQUANT : attendre la validation explicite de l'utilisateur
        ↓
ÉTAPE 4 — Implémentation (uniquement après validation reçue)
        ↓
ÉTAPE 5 — Sécurité (active à tout moment si mot de restauration reçu)
```

---

### INTERDICTIONS ABSOLUES — L'AGENT NE PEUT PAS

**Sur la séquence :**
- Ne jamais sauter l'ÉTAPE 0 sous aucun prétexte, même si l'utilisateur dit "vas-y directement", "fais-le sans audit" ou "on a déjà fait ça".
- Ne jamais passer à l'ÉTAPE 4 sans avoir reçu une validation explicite à l'ÉTAPE 3. Un "ok" vague sans référence à la proposition ne compte pas comme validation.
- Ne jamais fusionner l'ÉTAPE 2 et l'ÉTAPE 3 dans le même message.
- Ne jamais exécuter plusieurs prompts simultanément sans en informer l'utilisateur et obtenir sa confirmation sur l'ordre d'exécution.

**Sur les hypothèses :**
- Ne jamais supposer qu'un fichier existe sans l'avoir vérifié dans le projet.
- Ne jamais supposer qu'une fonctionnalité est "standard" sans l'avoir vérifiée dans le code source.
- Ne jamais supposer le framework, la bibliothèque ou la version utilisée sans les avoir lus dans `package.json`, `requirements.txt` ou équivalent.
- Ne jamais supposer la couleur, la typographie ou le spacing du design system sans avoir consulté les fichiers de configuration existants (CSS variables, Tailwind config, tokens).
- Ne jamais supposer qu'une intégration (paiement, email, CRM) est disponible sans l'avoir vérifiée dans le code.

**Sur le code :**
- Ne jamais supprimer une fonctionnalité existante même si elle semble inutile ou redondante. Signaler à l'utilisateur et attendre sa décision.
- Ne jamais modifier un fichier qui n'est pas dans la liste établie à l'ÉTAPE 0.
- Ne jamais introduire une nouvelle dépendance (npm, pip, etc.) sans en informer l'utilisateur et obtenir sa validation.
- Ne jamais modifier les fichiers de configuration critiques (`.env`, `database.yml`, fichiers d'authentification) sans mention explicite dans le brief.
- Ne jamais écrire du code commenté temporairement avec "TODO" ou "FIXME" sans en informer l'utilisateur — tout ce qui est livré doit être finalisé.
- Ne jamais hardcoder une valeur qui devrait être une variable d'environnement (clé API, URL de base, token).

**Sur la communication :**
- Ne jamais présenter l'ÉTAPE 3 comme définitive. Toujours la formuler comme une proposition soumise à validation.
- Ne jamais commencer l'ÉTAPE 4 en disant "voici ce que j'ai fait" — toujours confirmer d'abord que la validation de l'ÉTAPE 3 a bien été reçue.
- Ne jamais résumer l'ÉTAPE 0 sans produire la liste exhaustive des fichiers qui seront modifiés.

---

### OBLIGATIONS STRICTES — L'AGENT DOIT TOUJOURS

**Avant de commencer :**
- Annoncer le prompt sélectionné et sa variante avant toute action.
- Lister le brief requis manquant et le demander à l'utilisateur si le contexte est insuffisant.
- Si plusieurs prompts correspondent à la demande, lister les options et attendre le choix de l'utilisateur.

**À l'ÉTAPE 0 :**
- Produire une liste exhaustive et nominative de chaque fichier qui sera modifié (chemin complet).
- Inclure les fichiers de test, de documentation et de configuration si applicable.
- Estimer le nombre de lignes impactées par fichier.
- Identifier les dépendances entre fichiers (si A est modifié, B doit l'être aussi).

**À l'ÉTAPE 1 :**
- Produire un rapport d'audit structuré, pas un résumé narratif.
- Identifier explicitement les problèmes existants dans l'implémentation actuelle.
- Identifier les conflits potentiels avec d'autres parties du projet.
- Signaler tout ce qui devra être décidé par l'utilisateur avant l'implémentation.

**À l'ÉTAPE 3 :**
- Formuler explicitement : "Voici ma proposition. Réponds OUI pour que je procède à l'implémentation."
- Lister les points qui nécessitent une décision de l'utilisateur avant d'implémenter.
- Indiquer les impacts sur d'autres parties du projet.

**À l'ÉTAPE 4 :**
- Confirmer la réception de la validation avant de commencer.
- Commenter chaque bloc de code ajouté avec sa justification.
- Informer l'utilisateur si un obstacle imprévu est rencontré et suspendre l'implémentation jusqu'à sa décision.
- Produire un rapport de fin d'implémentation : fichiers modifiés, lignes ajoutées/supprimées, points de vigilance.

---

### GESTION DES CAS LIMITES

**Si la demande est ambiguë :**
Poser une seule question précise pour lever l'ambiguïté. Ne jamais supposer et implémenter.

**Si le brief requis est manquant :**
Bloquer et demander les informations manquantes. Ne jamais inventer les données du brief.

**Si un conflit est détecté entre la demande et le projet existant :**
Signaler le conflit explicitement à l'utilisateur, proposer deux options de résolution, attendre sa décision. Ne jamais résoudre un conflit de façon autonome.

**Si l'implémentation révèle un problème non prévu :**
Suspendre, informer l'utilisateur, proposer des solutions. Ne jamais contourner le problème silencieusement.

**Si l'utilisateur demande de sauter une étape :**
Refuser poliment, expliquer pourquoi l'étape est obligatoire, proposer une version allégée si possible mais toujours exécuter l'étape.

**Si `RESTAURER VERSION_PRÉCÉDENTE` est reçu :**
Arrêter immédiatement toute action en cours. Exécuter l'ÉTAPE 5 sans demander de confirmation supplémentaire. Produire un rapport de restauration.

---

## TABLE DE SÉLECTION RAPIDE

| L'utilisateur mentionne... | ID Prompt |
|---|---|
| header, barre de navigation, navbar, menu principal | `nav-header` |
| menu mobile, hamburger, drawer, navigation mobile | `nav-mobile` |
| fil d'Ariane, breadcrumb | `nav-breadcrumb` |
| sidebar, panneau latéral, filtres latéraux | `nav-sidebar` |
| pagination, charger plus, infinite scroll | `nav-pagination` |
| page d'accueil, homepage, home | `page-home` |
| page à propos, about, notre histoire | `page-about` |
| page contact, formulaire de contact | `page-contact` |
| blog, liste d'articles | `page-blog-list` |
| article, post, page de contenu unique | `page-article` |
| catégorie, page de catégorie | `page-category` |
| résultats de recherche, search | `page-search` |
| profil utilisateur, mon compte | `page-profile` |
| dashboard, tableau de bord | `page-dashboard` |
| paramètres, settings, configuration | `page-settings` |
| mentions légales, CGU, confidentialité | `page-legal` |
| page produit, fiche produit | `ecom-product` |
| catalogue, liste de produits | `ecom-catalog` |
| panier, cart | `ecom-cart` |
| checkout, paiement, finaliser commande | `ecom-checkout` |
| confirmation de commande | `ecom-confirmation` |
| suivi de commande, tracking | `ecom-tracking` |
| wishlist, favoris, liste de souhaits | `ecom-wishlist` |
| comparaison produits | `ecom-compare` |
| connexion, login, se connecter | `auth-login` |
| inscription, signup, créer un compte | `auth-register` |
| mot de passe oublié, reset password | `auth-forgot` |
| vérification email, confirmer email | `auth-verify` |
| onboarding, premiers pas | `auth-onboarding` |
| hero, section principale, above the fold | `ui-hero` |
| témoignages, avis clients, reviews | `ui-testimonials` |
| FAQ, questions fréquentes | `ui-faq` |
| équipe, team, membres | `ui-team` |
| logos, partenaires, clients | `ui-logos` |
| statistiques, chiffres clés, métriques | `ui-stats` |
| fonctionnalités, features | `ui-features` |
| tarifs, pricing, plans | `ui-pricing` |
| aperçu blog, blog preview | `ui-blog-preview` |
| bannière, annonce, barre promo | `ui-banner` |
| popup, modal, fenêtre modale | `ui-modal` |
| toast, notification système | `ui-toast` |
| cookie, RGPD, consentement | `ui-cookie` |
| chat, widget support | `ui-chat` |
| email bienvenue, welcome email | `email-welcome` |
| email confirmation commande | `email-order` |
| email reset mot de passe | `email-reset` |
| email panier abandonné, relance | `email-cart` |
| newsletter, email marketing | `email-newsletter` |
| email facture | `email-invoice` |
| skeleton, loading, chargement | `perf-skeleton` |
| page maintenance | `perf-maintenance` |
| erreur 500, erreur serveur | `perf-500` |
| erreur 403, accès refusé | `perf-403` |
| footer minimaliste, footer landing page | `footer-minimal` |
| footer colonnes, footer navigation | `footer-columns` |
| footer méga, footer grand site | `footer-mega` |
| footer newsletter, capture email footer | `footer-newsletter` |
| footer sitemap, footer liste de pages | `footer-sitemap` |
| footer sticky, CTA permanent en bas | `footer-sticky` |
| footer CTA, footer conversion | `footer-cta` |
| footer réseaux sociaux, footer social | `footer-social` |
| landing page lead gen, capture email, offre gratuite | `lp-lead-gen` |
| landing page click-through, page intermédiaire pub | `lp-click-through` |
| sales page, page de vente longue | `lp-sales` |
| squeeze page, page capture ultra-épurée | `lp-squeeze` |
| splash page, page interstitielle | `lp-splash` |
| landing page webinar, page événement, page inscription | `lp-webinar` |
| thank you page, page de remerciement, page de confirmation | `lp-thank-you` |
| product launch, page de lancement, waitlist | `lp-launch` |
| pricing page, page tarifs, page plans | `lp-pricing` |
| portfolio page, page crédibilité, page agence | `lp-portfolio` |
| page 404, page introuvable | `lp-404` |
| version courte landing page (modificateur) | `lp-mod-short` |
| version longue landing page (modificateur) | `lp-mod-long` |
| tableau de données, data table, liste de données, grille | `table-data` |
| formulaire, form, saisie de données, multi-étapes | `form-data` |
| formulaire conditionnel, champs conditionnels, affichage selon les réponses, branchement | `form-conditional` |
| wizard, configurateur, formulaire étape par étape, devis en plusieurs étapes | `form-wizard` |
| questionnaire, survey, sondage, NPS, quiz, enquête de satisfaction | `form-survey` |
| réservation, prise de rendez-vous, booking, réserver un créneau | `form-reservation` |
| import de données, import CSV, import Excel, migration de données | `form-import` |
| formulaire admin, CRUD, backoffice, gestion d'entités | `form-admin` |
| signature électronique, signer un document, contrat à signer | `form-signature` |

---

## PROTOCOLE STANDARD — appliqué à tous les prompts

Les deux étapes suivantes sont identiques pour chaque prompt. Ne les répète pas, applique-les systématiquement.

### ÉTAPE 0 — Sauvegarde (toujours en premier, jamais sautée)

Obligatoire sans exception. Si l'utilisateur demande de sauter → refuser, expliquer, proposer version allégée mais toujours exécuter.

1. Lire l'état git du projet (`git status`). Si changements non commités → signaler et attendre instruction avant de continuer.
2. Proposer création d'une branche dédiée (`feature/[nom-composant]-[date]`) ou un tag si pas de git.
3. Produire une liste exhaustive et nominative de CHAQUE fichier qui sera modifié : chemin complet, rôle du fichier, estimation des lignes impactées.
4. Identifier les dépendances entre fichiers (si A modifié → B doit l'être aussi).
5. Inclure fichiers de test, documentation, config si applicables.
6. Déclarer cet état comme VERSION_PRÉCÉDENTE.
7. Ne jamais travailler directement sur `main`/`master` sans confirmation explicite.

Sortie attendue : liste nominative des fichiers + stratégie de sauvegarde confirmée. Aucune modification avant confirmation.

### ÉTAPE 5 — Sécurité (active à tout moment, pas seulement en dernier)

Si `RESTAURER VERSION_PRÉCÉDENTE` reçu à n'importe quel moment :
1. Arrêter immédiatement toute action en cours, sans finir la phrase ou le bloc de code.
2. Annuler toutes les modifications depuis l'ÉTAPE 0 (revert git ou restauration manuelle fichier par fichier).
3. Vérifier que l'état restauré est identique au snapshot initial (diff ou git status).
4. Produire un rapport de restauration : fichiers restaurés, lignes annulées, état final confirmé.
5. Ne rien faire d'autre tant que l'utilisateur n'a pas confirmé que la restauration est correcte.

---

## RÈGLES DE FUSION DE PROMPTS

Quand plusieurs prompts s'appliquent au même endroit, ne pas les lancer séquentiellement comme des sessions indépendantes. Appliquer les règles ci-dessous.

### Règle 1 — Un seul ÉTAPE 0 par session

Jamais plusieurs snapshots sur le même projet dans la même session. Une seule branche git, un seul snapshot, peu importe le nombre de prompts fusionnés. L'ÉTAPE 0 est exécutée une fois au début, couvre tous les fichiers de tous les prompts impliqués.

### Règle 2 — Détection des conflits de fichiers (obligatoire avant fusion)

Avant de commencer, croiser les listes de fichiers de chaque prompt impliqué. Si un fichier apparaît dans deux prompts → conflit potentiel → signaler à l'utilisateur et attendre arbitrage avant d'écrire une seule ligne.

### Règle 3 — Trois cas de fusion, trois méthodes différentes

---

#### CAS A — Composants imbriqués (page + sections)

Exemple : `page-home` contient `ui-hero` + `ui-testimonials` + `ui-faq`.

Comportement : `page-home` est l'orchestrateur. Les prompts `ui-*` ne sont PAS relancés séparément — leurs contraintes techniques sont absorbées dans l'ÉTAPE 2 de `page-home`. Utiliser les versions densifiées (section `D-*`) comme référence pour les règles d'implémentation de chaque section.

Séquence :
```
ÉTAPE 0 → snapshot global (tous fichiers confondus)
ÉTAPE 1 → audit page entière + chaque section imbriquée
ÉTAPE 2 → conception page entière avec contraintes de chaque ui-* intégrées
ÉTAPE 3 → proposition globale → validation unique
ÉTAPE 4 → implémentation section par section, commit séparé par section
```

Prompts concernés par ce cas :
- `page-home` absorbe : `ui-hero`, `ui-testimonials`, `ui-faq`, `ui-stats`, `ui-features`, `ui-pricing`, `ui-logos`, `ui-blog-preview`
- `page-about` absorbe : `ui-team`, `ui-stats`
- `ecom-product` absorbe : `ui-testimonials`, `ui-faq`
- `lp-sales` absorbe : `ui-hero`, `ui-testimonials`, `ui-faq`, `ui-pricing`
- `lp-webinar` absorbe : `ui-hero`, `ui-team` (speakers), `ui-faq`

---

#### CAS B — Composants qui partagent un fichier ou un état

Exemple : `nav-header` + `nav-mobile` partagent le même composant, mêmes variables CSS, même state d'ouverture.

Comportement : fusionner les deux briefs en un seul prompt composite. L'ÉTAPE 1 audite les deux. L'ÉTAPE 2 conçoit les deux en cohérence (même z-index, même palette de couleurs, même logique d'animation). L'ÉTAPE 4 écrit dans le même fichier, un seul commit par fonctionnalité transversale.

Ne jamais traiter séparément :
```
nav-header + nav-mobile        → même fichier, même state
ui-cookie + ui-modal           → peuvent partager le même overlay/backdrop
auth-login + auth-forgot       → flux liés, même page dans certains stacks
ecom-cart + ecom-checkout      → état du panier partagé
form-wizard + form-conditional → logique de branchement identique
footer-sticky + ui-modal       → conflit de z-index si traités séparément
```

Séquence :
```
ÉTAPE 0 → snapshot global
ÉTAPE 1 → audit des deux composants ensemble, identifier les fichiers partagés
ÉTAPE 2 → conception unifiée (une seule source de vérité pour l'état partagé)
ÉTAPE 3 → proposition fusionnée → validation unique
ÉTAPE 4 → implémentation dans l'ordre de dépendance (état partagé d'abord, composants ensuite)
```

---

#### CAS C — Page complète from scratch (multi-domaines)

Exemple : nouvelle page produit e-commerce = `ecom-product` + `form-data` (reviews) + `ui-faq` + `ui-testimonials` + `nav-breadcrumb`.

Comportement : identifier le prompt orchestrateur (le conteneur de page) et les prompts enfants (composants). Cycle unique, mais chaque composant enfant a son propre sous-cycle ÉTAPE 1→3 avant que l'ÉTAPE 4 globale soit lancée.

Séquence :
```
ÉTAPE 0 → snapshot global (tous fichiers)
[orchestrateur] ÉTAPE 1 → audit de la page entière
[orchestrateur] ÉTAPE 2 → structure globale de la page
  ↳ [enfant 1] ÉTAPE 1→3 → audit + conception composant → validation
  ↳ [enfant 2] ÉTAPE 1→3 → audit + conception composant → validation
  ↳ [enfant N] ÉTAPE 1→3 → audit + conception composant → validation
[orchestrateur] ÉTAPE 3 → proposition assemblée → validation finale
[orchestrateur] ÉTAPE 4 → implémentation (composants enfants d'abord, page après)
```

Ordre d'implémentation dans l'ÉTAPE 4 : atomes → molécules → organismes → page.
Commit séparé par composant enfant, puis commit d'assemblage final.

---

### Règle 4 — Priorité en cas de conflit de règles entre prompts

Si deux prompts fusionnés ont des règles contradictoires sur le même élément (ex : `nav-header` dit `z-index` dans le design system, `ui-modal` dit `z-index: 9999`) → appliquer cette hiérarchie :

```
Sécurité > Accessibilité > Performance > Design system > Convention du prompt
```

Signaler le conflit à l'utilisateur avant d'arbitrer. Ne jamais résoudre silencieusement.

### Règle 5 — Annonce obligatoire avant toute fusion

Avant d'exécuter une session multi-prompts, annoncer :
```
FUSION DÉTECTÉE :
Prompts impliqués : [liste]
Fichiers partagés : [liste ou "aucun"]
Orchestrateur : [prompt principal]
Méthode : [CAS A / B / C]
Un seul ÉTAPE 0 sera exécuté.
Confirmes-tu cette séquence ?
```

Attendre confirmation avant de commencer.

---
---

---
role: agent-prompt-module
module: ecommerce
compatible: cursor, claude-code, windsurf
requires: AGENT-CORE.md
---

# MODULE — E-commerce
> Charger AGENT-CORE.md avant ce module.
## 3. E-COMMERCE

---

### `ecom-product` — Page produit

**Rôle :** Convaincre et déclencher l'achat, répondre à toutes les objections.

**ÉTAPE 1 — Audit**
Analyser : données produit (images, description, variantes, prix, stock) · avis clients · questions fréquentes · produits liés · éléments de confiance (garantie, retour, livraison).
Déterminer : images prioritaires · objections à lever · variantes à afficher · CTA principal et réassurances associées.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titre produit H1 optimisé.
2. Description courte above the fold.
3. Description longue (bénéfices + caractéristiques).
4. Libellés des variantes.
5. Libellé CTA principal.
6. Éléments de réassurance (livraison, retour, garantie).
7. FAQ produit (5–7 questions).

**ÉTAPE 3 — Proposition**
Présenter : structure complète · textes · recommandations galerie et mise en page. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : galerie images (zoom, angles multiples) → titre + prix + variantes above the fold → CTA "Ajouter au panier" toujours visible → réassurance → description courte puis longue → avis clients → FAQ → produits liés → sticky CTA mobile.

---

### `ecom-catalog` — Page catégorie produits

**Rôle :** Navigation et filtrage du catalogue, SEO, orientation vers le bon produit.

**ÉTAPE 1 — Audit**
Analyser : catalogue et attributs (prix, taille, couleur, marque, note) · sous-catégories · filtres actuels · tri disponible · cartes produit existantes.
Déterminer : filtres les plus utilisés · produits par page · informations sur chaque carte · comportement filtre mobile.

**ÉTAPE 2 — Conception**
Produire :
1. Filtres prioritaires et ordre.
2. Options de tri.
3. Contenu de chaque carte produit.
4. Mise en page grille (2 col mobile, 3–4 desktop).
5. Introduction SEO de la catégorie.
6. Gestion des produits en rupture.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · logique de filtrage · recommandations SEO. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : H1 + intro SEO → filtres (sidebar desktop / drawer mobile) → tri actif visible → grille (image, nom, prix, note, CTA rapide) → nombre de résultats → pagination → ruptures en bas de liste.

---

### `ecom-cart` — Page panier

**Rôle :** Récapitulatif, réassurance finale, réduction de l'abandon.

**ÉTAPE 1 — Audit**
Analyser : éléments affichés actuellement · taux d'abandon si disponible · codes promo et leur gestion · upsells / cross-sells disponibles · frais de livraison.
Déterminer : objections à lever avant checkout · produits à suggérer · seuil de livraison gratuite · réassurances à afficher.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titre de la page.
2. Libellés des actions (modifier, supprimer, continuer).
3. Texte de progression vers livraison gratuite si applicable.
4. Éléments de réassurance.
5. Libellé CTA checkout.
6. Textes upsells si applicables.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · upsells recommandés · réassurances et placement. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : liste produits (image, nom, variante, prix, quantité modifiable) → total détaillé (sous-total, livraison, réduction, total) → code promo → barre progression livraison gratuite → upsells discrets → réassurance → CTA checkout → bouton continuer les achats.

---

### `ecom-checkout` — Page Checkout

**Rôle :** Finaliser l'achat avec le minimum de friction possible.

**ÉTAPE 1 — Audit**
Analyser : étapes du checkout actuel · moyens de paiement disponibles · options de livraison · champs du formulaire · éléments de réassurance présents.
Déterminer : checkout mono-page ou multi-étapes · champs nécessaires · moyens de paiement prioritaires · éléments de confiance indispensables.

**ÉTAPE 2 — Conception**
Produire :
1. Structure du checkout (étapes ou mono-page).
2. Champs formulaire strictement nécessaires.
3. Ordre des sections (livraison → paiement → récapitulatif).
4. Moyens de paiement et ordre d'affichage.
5. Récapitulatif commande visible en permanence.
6. Éléments de réassurance (SSL, paiement sécurisé).

**ÉTAPE 3 — Proposition**
Présenter : structure complète · champs avec justification · recommandations performance (autofill, validation temps réel). Attendre validation.

**ÉTAPE 4 — Implémentation**
Règles : supprimer la navigation principale → récapitulatif sticky desktop → validation champs temps réel → autofill navigateur supporté → logos moyens de paiement → étapes et progression visibles → jamais obliger la création de compte pour finaliser.

---

### `ecom-confirmation` — Page confirmation de commande

**Rôle :** Rassurer, récapituler, déclencher la prochaine action.

**ÉTAPE 1 — Audit**
Analyser : informations affichées actuellement · actions proposées post-achat · opportunités d'upsell disponibles · ton de la marque.
Déterminer : informations de confirmation indispensables · opportunité d'upsell pertinente · prochaine action logique.

**ÉTAPE 2 — Rédaction**
Produire :
1. Message de confirmation chaleureux et humain.
2. Récapitulatif de la commande.
3. Prochaines étapes claires.
4. Texte de l'upsell si applicable.
5. CTA de suivi de commande.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · textes · opportunité d'upsell recommandée. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : confirmation avec numéro de commande → récapitulatif produits → informations de livraison → délai estimé → lien de suivi → upsell discret si applicable → CTA vers compte ou boutique.
Règle : ne jamais afficher une page de confirmation froide et vide.

---

### `ecom-tracking` — Page suivi de commande

**Rôle :** Réduire les contacts SAV, rassurer l'acheteur sur l'avancement.

**ÉTAPE 1 — Audit**
Analyser : données de suivi disponibles (statuts, transporteur, tracking) · intégration transporteur · statuts utilisés · formulaire d'accès (numéro + email).
Déterminer : étapes de suivi à afficher · niveau de détail par étape · actions disponibles (retour, contact SAV, modification adresse).

**ÉTAPE 2 — Conception**
Produire :
1. Timeline de suivi avec étapes et libellés.
2. Informations affichées à chaque étape.
3. Lien de tracking transporteur.
4. Actions disponibles selon le statut.
5. Notifications proactives si applicable.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · états de la timeline · actions par statut. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : timeline visuelle (statut actuel mis en évidence) → détails commande → tracking cliquable → date estimée → actions contextuelles → contact SAV accessible.

---

### `ecom-wishlist` — Page Wishlist

**Rôle :** Sauvegarder des produits, déclencher l'achat différé, partage social.

**ÉTAPE 1 — Audit**
Analyser : système existant · gestion disponibilité et changements de prix · options de partage · wishlist multiples si applicable.
Déterminer : actions disponibles par produit · notifications de prix/stock · pertinence du partage.

**ÉTAPE 2 — Conception**
Produire :
1. Structure de chaque carte produit.
2. Alertes disponibilité et prix.
3. Options de partage.
4. CTA "Tout ajouter au panier" si pertinent.
5. État vide avec suggestions.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · actions et placement · gestion états (vide, indisponible, prix changé). Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : produits sauvegardés (image, nom, prix actuel) → indication changement prix/stock → CTA ajouter au panier → supprimer → partage si applicable → état vide avec suggestions.

---

### `ecom-compare` — Page comparaison produits

**Rôle :** Aider la décision d'achat par une comparaison claire et honnête.

**ÉTAPE 1 — Audit**
Analyser : attributs disponibles par produit · nombre maximum de produits comparables · attributs importants pour la décision · gestion des attributs manquants.
Déterminer : attributs à afficher en priorité · format de comparaison · mise en évidence du produit recommandé · limite de produits.

**ÉTAPE 2 — Conception**
Produire :
1. Liste des attributs comparés et ordre.
2. Mise en évidence du "meilleur choix".
3. Gestion des valeurs manquantes (—).
4. CTA par produit.
5. Comportement mobile (scroll horizontal ou vue réduite).

**ÉTAPE 3 — Proposition**
Présenter : structure tableau · attributs retenus avec justification · gestion mobile. Attendre validation.

**ÉTAPE 4 — Implémentation**
Maximum 4 produits côte à côte · mise en évidence des différences (couleur sur cellules distinctives) · CTA "Ajouter au panier" par colonne · possibilité de remplacer un produit · scroll horizontal mobile.

---
---

---
role: agent-prompt-module
module: navigation-structure
compatible: cursor, claude-code, windsurf
requires: AGENT-CORE.md
---

# MODULE — Navigation & Structure
> Charger AGENT-CORE.md avant ce module.
## 1. NAVIGATION & STRUCTURE

---

### `nav-header` — Header

**Rôle :** Point d'entrée de toute navigation. Premier élément vu par l'utilisateur.

**Variantes :** transparent · sticky · top bar · centré · split · méga menu · minimal · avec recherche

**Brief requis :** type de header voulu + contexte du site (landing page / SaaS / e-commerce / blog / portfolio)

**ÉTAPE 1 — Audit**
Analyser : structure de navigation existante · comportement scroll actuel · menu mobile associé · logo · CTA principal · type de site.
Déterminer : type de header adapté · liens essentiels vs secondaires · CTA unique · comportement mobile.

**ÉTAPE 2 — Conception**
Produire :
1. Liste des liens de navigation avec ordre de priorité.
2. Libellé du CTA principal.
3. Comportement au scroll (transparent→opaque / sticky / fixe).
4. Contenu top bar si pertinente.
5. Structure méga menu si applicable.
6. Comportement recherche si applicable.
7. Recommandations accessibilité (ARIA, skip link, focus visible).

**ÉTAPE 3 — Proposition**
Présenter : structure desktop + mobile · textes · comportements interactifs · éléments à supprimer. Attendre validation.

**ÉTAPE 4 — Implémentation**
Créer ou modifier le header : logo cliquable · navigation max 6 items · CTA bouton (pas lien texte) · menu mobile indépendant · comportement scroll défini.
Règle landing page : supprimer toute navigation, garder logo + CTA uniquement.

---

### `nav-mobile` — Menu Mobile

**Rôle :** Navigation tactile indépendante du menu desktop.

**Variantes :** hamburger + drawer · full screen overlay · bottom navigation bar · accordion · tab bar sticky

**Brief requis :** type de menu voulu · nombre de liens · présence de sous-menus

**ÉTAPE 1 — Audit**
Analyser : menu desktop et sa complexité · nombre de liens · sous-menus · type d'application · breakpoints actuels.
Déterminer : type de menu adapté · actions prioritaires à mettre en avant · gestion des sous-menus · logique touch-first.

**ÉTAPE 2 — Conception**
Produire :
1. Liens prioritaires pour mobile (peut différer du desktop).
2. Type de déclencheur (hamburger / icône / swipe).
3. Comportement d'ouverture (slide / fade / push).
4. Gestion des sous-menus (accordéon intégré).
5. Bouton de fermeture et placement.
6. CTA mobile visible sans ouvrir le menu.
7. Gestes tactiles supportés.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · animations · différences intentionnelles avec le desktop · accessibilité (focus trap, ARIA, Escape). Attendre validation.

**ÉTAPE 4 — Implémentation**
Zones de tap minimum 44px · fermeture au clic outside ou Escape · jamais bloquer le scroll arrière-plan · animation < 300ms · accessible clavier et lecteurs d'écran.

---

### `nav-breadcrumb` — Breadcrumb

**Rôle :** Orientation de l'utilisateur dans la hiérarchie + SEO rich results.

**Variantes :** simple · SEO JSON-LD · avec compteur · collapsible mobile

**Brief requis :** profondeur de navigation · besoin SEO (JSON-LD ou non)

**ÉTAPE 1 — Audit**
Analyser : structure de navigation et profondeur · pages nécessitant un breadcrumb · balisage JSON-LD existant · comportement mobile actuel.
Déterminer : niveaux à afficher · nécessité JSON-LD · gestion URLs longues mobile · séparateur visuel.

**ÉTAPE 2 — Conception**
Produire :
1. Structure des niveaux par type de page.
2. Séparateur visuel.
3. Comportement mobile (collapsible, troncature "…").
4. Balisage JSON-LD.
5. Style visuel (taille, couleur, lien vs texte courant).

**ÉTAPE 3 — Proposition**
Présenter : exemples pour les 3 types de pages les plus profondes · code JSON-LD · placement recommandé (avant le H1). Attendre validation.

**ÉTAPE 4 — Implémentation**
Toujours commencer par "Accueil" cliquable · dernier élément non cliquable · JSON-LD inclus · mobile propre · balise `<nav aria-label="breadcrumb">` · jamais afficher sur la page d'accueil.

---

### `nav-sidebar` — Sidebar

**Rôle :** Navigation secondaire, filtres, ou contenus contextuels.

**Variantes :** navigation · filtres · widgets · sticky · collapsible · contextuelle

**Brief requis :** type de sidebar · sticky ou non · collapsible ou non · type de page cible

**ÉTAPE 1 — Audit**
Analyser : type de page (blog / doc / e-commerce / dashboard) · contenu à afficher · comportement mobile actuel · interactions avec le contenu principal.
Déterminer : type adapté · éléments sticky vs scrollables · gestion mobile · priorités.

**ÉTAPE 2 — Conception**
Produire :
1. Éléments à intégrer avec priorité.
2. Comportement sticky (à partir de quel scroll).
3. Comportement collapsible (rail d'icônes ou masquage).
4. Gestion mobile (drawer, bouton filtre, accordéon).
5. Affichage filtres actifs si applicable.
6. Comportement contextuel si applicable.

**ÉTAPE 3 — Proposition**
Présenter : structure desktop + mobile · interactions · réorganisations. Attendre validation.

**ÉTAPE 4 — Implémentation**
Ne jamais masquer le contenu principal sur mobile · largeur fixe 240–300px desktop · accessible clavier · filtres actifs visibles · réinitialisation en un clic.

---

### `nav-pagination` — Pagination

**Rôle :** Navigation dans un ensemble de contenus ou produits.

**Variantes :** numérotée · infinite scroll · bouton "charger plus" · prev/next · par curseur

**Brief requis :** volume de données · type de contenu · contraintes SEO

**ÉTAPE 1 — Audit**
Analyser : type de contenu paginé · volume et rythme de croissance · contraintes SEO · performances actuelles · comportement utilisateur (browse vs search).
Déterminer : type adapté · éléments par page · gestion URL · comportement mobile.

**ÉTAPE 2 — Conception**
Produire :
1. Type de pagination et justification.
2. Nombre d'éléments par page.
3. Libellés boutons et liens.
4. État de chargement (skeleton / spinner).
5. Gestion des URLs (paramètre ?page= / hash / curseur).
6. Comportement au retour arrière.

**ÉTAPE 3 — Proposition**
Présenter : structure et comportement · implications SEO · recommandations performance. Attendre validation.

**ÉTAPE 4 — Implémentation**
Ne jamais bloquer l'accès au footer · conserver position scroll au retour arrière · indiquer page actuelle si numérotée · gérer états (chargement / erreur / fin) · accessible ARIA.
Règle : ne jamais utiliser infinite scroll si SEO des pages est prioritaire.

---
---
role: agent-prompt-module
module: pages-types
compatible: cursor, claude-code, windsurf
requires: AGENT-CORE.md
---

# MODULE — Pages Types
> Charger AGENT-CORE.md avant ce module.
## 2. PAGES TYPES

---

### `page-home` — Page d'accueil

**Rôle :** Première impression, orientation multi-profil, conversion vers les sections clés.

**ÉTAPE 1 — Audit**
Analyser : proposition de valeur · profils de visiteurs et intentions · pages cibles par profil · preuves disponibles · actions souhaitées.
Déterminer : hiérarchie des messages · segments à adresser · sections indispensables vs optionnelles · CTA principal et secondaire.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titre H1 — proposition de valeur claire.
2. Sous-accroche — bénéfice concret en 1 phrase.
3. Libellé CTA principal.
4. Libellé CTA secondaire.
5. Titres et introductions de chaque section.
6. Preuves sociales à mettre en avant.

**ÉTAPE 3 — Proposition**
Présenter : structure complète avec toutes les sections · textes de chaque bloc · hiérarchie visuelle. Attendre validation.

**ÉTAPE 4 — Implémentation**
Ordre : Hero → Logos confiance → Proposition de valeur (3 bénéfices) → Fonctionnalités → Preuve sociale → Sections par profil → CTA intermédiaire → FAQ courte → CTA final.

---

### `page-about` — Page À propos

**Rôle :** Humaniser la marque, établir la confiance, expliquer le pourquoi.

**ÉTAPE 1 — Audit**
Analyser : histoire de la marque · valeurs affichées vs incarnées · équipe disponible · jalons importants · ton de la marque.
Déterminer : angle narratif · preuves disponibles · pertinence section équipe · CTA de fin.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titre narratif (pas "À propos").
2. Histoire en 3 actes : avant / déclencheur / maintenant.
3. Mission en une phrase.
4. Valeurs avec preuve concrète pour chacune.
5. Bios équipe si applicable (2 phrases max, axées valeur apportée).
6. Jalons clés (timeline).
7. CTA de fin.

**ÉTAPE 3 — Proposition**
Présenter : structure narrative · textes · recommandations visuelles. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : titre narratif → histoire → valeurs avec preuves → équipe → chiffres clés → timeline → CTA contact ou services.
Règle : ne jamais commencer par "Nous sommes une entreprise fondée en…"

---

### `page-contact` — Page Contact

**Rôle :** Réduire la friction de prise de contact, qualifier la demande, rassurer.

**ÉTAPE 1 — Audit**
Analyser : types de demandes reçues · canaux disponibles · formulaire existant et ses champs · délai de réponse pratiqué.
Déterminer : champs réellement nécessaires · besoin de formulaires multiples · informations à afficher directement · message de confirmation.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titre (pas "Contact").
2. Introduction avec délai de réponse.
3. Libellés et placeholders des champs.
4. Libellé du bouton d'envoi.
5. Message de confirmation post-envoi.
6. Informations de contact directes si applicables.

**ÉTAPE 3 — Proposition**
Présenter : structure · champs avec justification · canaux alternatifs. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : titre + intro rassurante → formulaire minimal → confirmation post-envoi → canaux alternatifs → localisation si physique.
Règle : jamais demander plus que nécessaire au premier contact.

---

### `page-blog-list` — Page Blog / Liste d'articles

**Rôle :** Navigation dans le contenu éditorial, SEO, orientation vers les articles pertinents.

**ÉTAPE 1 — Audit**
Analyser : volume d'articles et catégorisation · métadonnées disponibles · filtres et recherche existants · pagination actuelle.
Déterminer : mise en page optimale · filtres pertinents · articles à mettre en avant · articles par page.

**ÉTAPE 2 — Conception**
Produire :
1. Structure de la page (hero, filtres, grille).
2. Informations sur chaque carte article.
3. Hiérarchie featured vs standard.
4. Système de filtres et recherche.
5. Pagination appropriée.
6. CTA newsletter si applicable.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · maquette des cartes · recommandations SEO. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : hero avec titre + description → filtres par catégorie/tag → grille d'articles (image, titre, résumé, date, temps de lecture) → article(s) mis en avant → pagination → CTA newsletter.

---

### `page-article` — Page Article unique

**Rôle :** Lisibilité maximale, rétention du lecteur, conversion post-lecture.

**ÉTAPE 1 — Audit**
Analyser : template d'article existant · éléments disponibles (auteur, date, temps de lecture, tags) · sidebar si présente · CTA existants · éléments post-article.
Déterminer : largeur optimale de colonne de lecture · éléments du header d'article · nécessité d'un sommaire · placement des CTA.

**ÉTAPE 2 — Conception**
Produire :
1. Structure header d'article.
2. Mise en page corps (largeur, taille police, interligne).
3. Sommaire flottant si article long (>1500 mots).
4. CTA inline dans le contenu.
5. Section post-article (auteur, articles liés, newsletter, commentaires).
6. Bouton partage et placement.

**ÉTAPE 3 — Proposition**
Présenter : structure template · recommandations lisibilité · placements CTA. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : header (titre H1, auteur, date, temps de lecture, catégorie, image) → corps (largeur optimale, hiérarchie typo) → sommaire si long → barre progression lecture → CTA contextuel milieu → section auteur → articles liés (max 3) → CTA newsletter → partage social.

---

### `page-category` — Page Catégorie

**Rôle :** Navigation dans un sous-ensemble de contenu ou produits, SEO longue traîne.

**ÉTAPE 1 — Audit**
Analyser : catégories existantes et volume · type de contenu · sous-catégories · structure d'URL.
Déterminer : pages dédiées vs filtres · contenu éditorial SEO · filtres au sein de la catégorie · pagination.

**ÉTAPE 2 — Conception**
Produire :
1. Structure (header éditorial + grille + filtres).
2. Texte d'introduction SEO.
3. Sous-catégories si applicables.
4. Filtres pertinents.
5. Pagination.

**ÉTAPE 3 — Proposition**
Présenter : template · textes d'introduction · recommandations SEO (H1 unique, meta, balisage). Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : H1 unique + introduction SEO (100–200 mots) → breadcrumb → filtres → grille → pagination → liens catégories adjacentes.

---

### `page-search` — Page Résultats de recherche

**Rôle :** Répondre à une intention précise, guider vers le bon contenu rapidement.

**ÉTAPE 1 — Audit**
Analyser : moteur de recherche interne · types de contenu indexé · résultats actuels et format · gestion du zéro résultat.
Déterminer : différenciation visuelle par type · filtres sur résultats · message zéro résultat · autocomplétion si applicable.

**ÉTAPE 2 — Conception**
Produire :
1. Structure de chaque carte résultat par type.
2. Système de filtres post-recherche.
3. Mise en évidence du terme recherché.
4. Message zéro résultat + alternatives.
5. Autocomplétion si applicable.

**ÉTAPE 3 — Proposition**
Présenter : template complet · gestion des cas limites · tri par défaut. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : rappel de la requête → nombre de résultats → filtres → résultats avec terme mis en évidence → pagination → page zéro résultat avec suggestions.
Règle : ne jamais afficher une page vide sans alternative.

---

### `page-profile` — Page Profil utilisateur

**Rôle :** Gestion des données personnelles, historique, paramètres de compte.

**ÉTAPE 1 — Audit**
Analyser : données utilisateur disponibles · actions possibles depuis le profil · visibilité (public / privé / semi-public) · liens avec commandes, abonnement, paramètres.
Déterminer : informations prioritaires · actions à mettre en avant · distinction profil public / paramètres privés · niveau de personnalisation.

**ÉTAPE 2 — Conception**
Produire :
1. Structure (header profil + sections).
2. Informations en-tête (avatar, nom, statut, badges).
3. Sections de gestion (infos, sécurité, préférences, historique).
4. Actions critiques et confirmations (suppression compte).
5. État vide pour sections sans données.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · distinction profil public vs paramètres privés · flux de modification. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : header (avatar, nom, statut) → sections séparées → modification inline ou modale → confirmation pour actions destructives → feedback visuel post-modification.
Règle : ne jamais mélanger profil public et paramètres de compte dans la même vue.

---

### `page-dashboard` — Dashboard

**Rôle :** Vue synthétique du système, déclenchement des actions principales.

**ÉTAPE 1 — Audit**
Analyser : données disponibles et fréquence de mise à jour · profils utilisateurs et leurs objectifs · KPIs prioritaires · actions déclenchables · widgets existants.
Déterminer : hiérarchie des informations above the fold · métriques primaires vs secondaires · types de visualisation · raccourcis d'actions.

**ÉTAPE 2 — Conception**
Produire :
1. KPIs à afficher avec priorité.
2. Type de visualisation par donnée (chiffre / graphique / tableau / barre).
3. Grille de layout (colonnes, ordre des widgets).
4. Filtres temporels (aujourd'hui / 7j / 30j / personnalisé).
5. Raccourcis actions principales.
6. Alertes et notifications critiques.

**ÉTAPE 3 — Proposition**
Présenter : maquette complète avec widgets · justification de chaque widget · état vide nouveau compte. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : métriques clés above the fold (max 4) → graphiques d'évolution → tableau données récentes → raccourcis actions fréquentes → alertes critiques en haut → filtres temporels → état vide.
Règle : jamais plus de 6 métriques primaires.

---

### `page-settings` — Page Paramètres

**Rôle :** Configuration du compte, préférences, gestion des intégrations.

**ÉTAPE 1 — Audit**
Analyser : toutes les options de configuration · organisation actuelle des sections · actions destructives présentes · intégrations tierces.
Déterminer : regroupement logique (compte / sécurité / notifications / facturation / intégrations) · paramètres nécessitant confirmation · paramètres critiques à mettre en évidence.

**ÉTAPE 2 — Conception**
Produire :
1. Navigation des paramètres (sidebar ou onglets).
2. Regroupement des options par section logique.
3. Comportement de sauvegarde (auto-save vs bouton explicite).
4. Confirmations pour actions sensibles.
5. États de chargement et de succès.

**ÉTAPE 3 — Proposition**
Présenter : structure complète · navigation entre sections · flux de confirmation. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : navigation claire entre sections → feedback immédiat après modification → zone danger isolée visuellement → confirmation modale irréversible → indicateur d'état de sauvegarde.
Règle : ne jamais mélanger actions reversibles et irréversibles dans la même zone.

---

### `page-legal` — Pages légales

**Rôle :** Conformité légale, protection de la marque, transparence.

**ÉTAPE 1 — Audit**
Analyser : pages légales existantes · juridiction applicable · données collectées et leur traitement · date de dernière mise à jour.
Déterminer : pages obligatoires selon juridiction · informations manquantes ou obsolètes · format de présentation · nécessité d'une table des matières.

**ÉTAPE 2 — Conception**
Produire :
1. Liste des pages légales nécessaires.
2. Structure de chaque document.
3. Mise en page pour la lisibilité.
4. Date de mise à jour visible.
5. Lien de contact pour questions légales.

**ÉTAPE 3 — Proposition**
Présenter : pages à créer/mettre à jour · structure de chaque document · éléments manquants détectés. Attendre validation.

**ÉTAPE 4 — Implémentation**
Chaque page doit avoir : table des matières cliquable si longue → date de mise à jour en haut → titres hiérarchiques → contact légal → accessible depuis le footer.
Règle : ne jamais mettre du contenu légal en bloc de texte brut sans structure.

---
---

---
role: agent-prompt-module
module: composants-ui
compatible: cursor, claude-code, windsurf
requires: AGENT-CORE.md
---

# MODULE — Composants UI
> Charger AGENT-CORE.md avant ce module.
## 5. COMPOSANTS UI RÉUTILISABLES

---

### `ui-hero` — Hero Section

**Rôle :** Première impression, clarté du message, déclenchement de l'action principale.

**ÉTAPE 1 — Audit**
Analyser : contexte de la page · message principal · CTA attendu · visuels disponibles.

**ÉTAPE 2 — Rédaction**
Produire : titre H1 · sous-accroche · CTA principal · CTA secondaire si nécessaire · texte de réassurance si applicable.

**ÉTAPE 3 — Proposition**
Présenter : structure · textes · recommandations visuelles. Attendre validation.

**ÉTAPE 4 — Implémentation**
Règle absolue : un seul message, une seule action principale. Titre + sous-accroche + CTA visible sans scroll + élément visuel fort.

---

### `ui-testimonials` — Section Témoignages

**Rôle :** Preuve sociale, réduction des objections, établissement de la confiance.

**ÉTAPE 1 — Audit**
Analyser : témoignages disponibles (texte, photo, nom, titre, résultat) · authenticité · pertinence par rapport aux objections cibles.

**ÉTAPE 2 — Sélection et mise en forme**
Sélectionner 3 à 6 témoignages les plus puissants. Pour chacun : problème avant → solution → résultat chiffré si possible. Rédiger un titre extrait du témoignage.

**ÉTAPE 3 — Proposition**
Présenter : structure (carousel / grille / masonry) · témoignages sélectionnés · mise en forme. Attendre validation.

**ÉTAPE 4 — Implémentation**
Format par témoignage : photo + nom + titre/rôle + témoignage structuré + résultat.
Règle : ne jamais afficher un témoignage sans nom réel ni contexte.

---

### `ui-faq` — Section FAQ

**Rôle :** Lever les objections, réduire le SAV, améliorer le SEO.

**ÉTAPE 1 — Audit**
Analyser : questions réelles posées (SAV, commentaires, reviews) · objections non traitées · questions existantes dans la FAQ.

**ÉTAPE 2 — Rédaction**
7 à 12 questions/réponses. Chaque réponse : directe, sans jargon, < 100 mots. Couvrir : prix, fonctionnement, sécurité, support, différences concurrents.

**ÉTAPE 3 — Proposition**
Présenter : questions triées par fréquence · format (accordéon / liste / catégorisé) · balisage FAQ Schema.org. Attendre validation.

**ÉTAPE 4 — Implémentation**
Accordéon + balisage JSON-LD FAQ Schema + barre de recherche si >10 questions + lien contact en bas.

---

### `ui-team` — Section Équipe

**Rôle :** Humaniser la marque, établir la crédibilité des personnes.

**ÉTAPE 1 — Audit**
Analyser : membres à présenter · données disponibles (photo, nom, rôle, expertise, LinkedIn) · pertinence de la section dans le contexte.

**ÉTAPE 2 — Rédaction**
Pour chaque membre : titre de rôle clair + bio 2 phrases max axée sur valeur apportée (pas un CV).

**ÉTAPE 3 — Proposition**
Présenter : structure (grille / carousel / liste) · informations par carte · recommandations photos. Attendre validation.

**ÉTAPE 4 — Implémentation**
Format : photo + nom + rôle + bio courte + LinkedIn si applicable.
Règle : ne jamais afficher une section équipe sans photos réelles.

---

### `ui-logos` — Section Partenaires / Logos

**Rôle :** Crédibilité par association, preuve sociale institutionnelle.

**ÉTAPE 1 — Audit**
Analyser : logos disponibles (clients, partenaires, presse, certifications) · qualité et cohérence visuelle · pertinence pour l'audience cible.

**ÉTAPE 2 — Sélection**
Maximum 8 logos les plus reconnaissables par l'audience. Proposer un titre adapté au type (clients / partenaires / "Ils parlent de nous").

**ÉTAPE 3 — Proposition**
Présenter : titre · ordre des logos · traitement visuel (monochrome ou couleur, taille uniforme). Attendre validation.

**ÉTAPE 4 — Implémentation**
Taille uniforme · version monochrome préférée · carousel si >6 logos sur mobile.
Règle : jamais afficher un logo sans autorisation.

---

### `ui-stats` — Section Statistiques / Chiffres clés

**Rôle :** Impact immédiat par les chiffres, preuve de valeur et d'échelle.

**ÉTAPE 1 — Audit**
Analyser : chiffres disponibles et vérifiables · pertinence pour l'audience · date de dernière mise à jour.

**ÉTAPE 2 — Sélection et formulation**
Maximum 5 chiffres. Pour chacun : chiffre + description < 8 mots.
Règles : ne jamais arrondir de façon suspecte · ne jamais inventer.

**ÉTAPE 3 — Proposition**
Présenter : chiffres retenus avec formulation · format (compteur animé ou statique) · source si applicable. Attendre validation.

**ÉTAPE 4 — Implémentation**
3 à 5 métriques en grand + label court sur une ligne. Animation compteur si chiffre impactant. Source ou date si crédibilité l'exige.

---

### `ui-features` — Section Fonctionnalités

**Rôle :** Présenter ce que le produit fait, traduit en bénéfices concrets.

**ÉTAPE 1 — Audit**
Analyser : fonctionnalités du produit · bénéfices apportés · problèmes résolus pour l'utilisateur cible.

**ÉTAPE 2 — Rédaction**
Maximum 6 fonctionnalités. Pour chacune : icône ou visuel + titre en bénéfice (pas en technicité) + description 2 phrases max.

**ÉTAPE 3 — Proposition**
Présenter : fonctionnalités retenues · formulations · format (grille 3 col / liste avec visuels / tabs). Attendre validation.

**ÉTAPE 4 — Implémentation**
Titre de section + grille (icône + titre-bénéfice + description).
Règle : jamais une liste de caractéristiques techniques sans traduction en bénéfice.

---

### `ui-pricing` — Section Tarifs

**Rôle :** Comparer clairement les plans, orienter vers le plan optimal, lever les objections prix.

**ÉTAPE 1 — Audit**
Analyser : plans existants · fonctionnalités par plan · logique de pricing · objections fréquentes.

**ÉTAPE 2 — Rédaction**
Produire : titre de section (value-first, pas "Nos tarifs") · nom et description par plan · fonctionnalités par plan · CTA par plan · mise en avant du plan recommandé · bloc de réassurance.

**ÉTAPE 3 — Proposition**
Présenter : structure du tableau · hiérarchie visuelle · plan mis en avant · réassurances. Attendre validation.

**ÉTAPE 4 — Implémentation**
Toggle mensuel/annuel si applicable · plan recommandé visuellement mis en avant · CTA par plan · réassurance sous les plans (CB non requise, résiliation facile).

---

### `ui-blog-preview` — Section Blog Preview

**Rôle :** Montrer l'expertise éditoriale, orienter vers les articles, améliorer le SEO interne.

**ÉTAPE 1 — Audit**
Analyser : articles disponibles et métadonnées · pertinence par rapport à la page hôte.

**ÉTAPE 2 — Sélection**
3 articles : 1 récent + 1 populaire + 1 pertinent au contexte de la page. Rédiger titre de section + CTA vers le blog.

**ÉTAPE 3 — Proposition**
Présenter : 3 articles retenus · format de carte · CTA blog. Attendre validation.

**ÉTAPE 4 — Implémentation**
Titre + 3 cartes (image + catégorie + titre + date + lien) + CTA "Voir tous les articles".
Règle : ne jamais afficher des articles non pertinents pour la page en question.

---

### `ui-banner` — Bannière Promo / Annonce

**Rôle :** Communiquer une information urgente ou limitée dans le temps.

**ÉTAPE 1 — Audit**
Analyser : message à communiquer · durée d'affichage · urgence réelle · pages cibles.

**ÉTAPE 2 — Rédaction**
Message principal < 15 mots + CTA si applicable < 5 mots + lien de fermeture.

**ÉTAPE 3 — Proposition**
Présenter : texte · design (top bar / sticky / inline) · durée d'affichage. Attendre validation.

**ÉTAPE 4 — Implémentation**
Fermable · ne pas réapparaître après fermeture (cookie) · accessible (contraste suffisant) · lien si elle mène quelque part.

---

### `ui-modal` — Pop-up / Modal

**Rôle :** Capturer l'attention sur une action spécifique sans quitter la page.

**Brief requis :** déclencheur (exit intent / délai / scroll / clic) · objectif (lead gen / annonce / confirmation / cookie)

**ÉTAPE 1 — Audit**
Analyser : contexte d'apparition · objectif · données à collecter · fréquence d'affichage.
Déterminer : déclencheur approprié · si le pop-up est réellement justifié · fréquence (jamais à chaque visite).

**ÉTAPE 2 — Rédaction**
Produire : titre + sous-accroche + contenu formulaire ou message + CTA principal + lien de fermeture ("Non merci, je ne veux pas…").

**ÉTAPE 3 — Proposition**
Présenter : structure · déclencheur · fréquence et règles d'affichage. Attendre validation.

**ÉTAPE 4 — Implémentation**
Règles : croix de fermeture visible → ne pas réapparaître pendant X jours après fermeture → overlay sombre → responsive mobile → ne jamais masquer le contenu principal sur mobile.

---

### `ui-toast` — Toast / Notifications

**Rôle :** Feedback immédiat sur une action sans interrompre le flux.

**ÉTAPE 1 — Audit**
Analyser : actions nécessitant un feedback · toasts existants et cohérence.

**ÉTAPE 2 — Conception**
4 types (succès / erreur / avertissement / info) · durée d'affichage · position (haut droite standard) · libellés des cas fréquents.

**ÉTAPE 3 — Proposition**
Présenter : types · libellés · durée · comportement (auto-dismiss / fermeture manuelle). Attendre validation.

**ÉTAPE 4 — Implémentation**
4 variantes visuelles distinctes · auto-dismiss 4–5s (sauf erreur critique) · empilables · accessibles (role="alert", aria-live) · ne jamais bloquer le contenu principal.

---

### `ui-cookie` — Cookie Banner

**Rôle :** Conformité RGPD, collecte du consentement, maintien de la confiance.

**ÉTAPE 1 — Audit**
Analyser : cookies utilisés (essentiels / analytique / marketing / personnalisation) · juridiction applicable · banner existant.
Déterminer : catégories à distinguer · nécessité d'un consentement granulaire · texte légalement conforme.

**ÉTAPE 2 — Rédaction**
Message principal + libellé "Accepter tout" + libellé "Refuser" ou "Continuer sans accepter" + libellé "Personnaliser" + texte du panneau de personnalisation.

**ÉTAPE 3 — Proposition**
Présenter : structure · options proposées · conformité légale. Attendre validation.

**ÉTAPE 4 — Implémentation**
Règles RGPD : "Accepter" ET "Refuser" avec même visibilité → cookies non essentiels non pré-cochés → choix mémorisé 6–12 mois → modification possible depuis les paramètres → ne pas bloquer l'accès total au site avant le choix.

---

### `ui-chat` — Chat Widget

**Rôle :** Support accessible, réduction de la friction de contact.

**ÉTAPE 1 — Audit**
Analyser : type de chat (live / bot / hybrid) · cas d'usage · horaires de disponibilité · comportement actuel.
Déterminer : déclencheur (automatique vs manuel) · questions de pré-qualification · comportement hors horaires.

**ÉTAPE 2 — Conception**
Produire : message d'accueil · questions de pré-qualification si applicable · message hors horaires · règles d'affichage du bouton.

**ÉTAPE 3 — Proposition**
Présenter : structure · messages proposés · règles d'affichage. Attendre validation.

**ÉTAPE 4 — Implémentation**
Règles : ne jamais s'ouvrir automatiquement sans interaction → croix de fermeture visible → indiquer clairement bot ou humain → gérer les indisponibilités → ne pas masquer le CTA principal sur mobile.

---
---

---
role: agent-prompt-module
module: footers
compatible: cursor, claude-code, windsurf
requires: AGENT-CORE.md
---

# MODULE — Footers
> Charger AGENT-CORE.md avant ce module.
## 8. FOOTERS

---

### `footer-minimal` — Footer Minimaliste

**Rôle :** Conformité légale, zéro distraction.
**Variantes :** texte seul · avec logo · avec sélecteur de langue
**Brief requis :** type de page hôte (landing page = toujours ce type)

**ÉTAPE 1 — Audit**
Analyser : type de page hôte · liens légaux obligatoires · menu de navigation global existant.
Déterminer : ce qui est légalement requis · ce qui crée de la distraction à supprimer.

**ÉTAPE 2 — Rédaction**
Produire : texte de copyright (année + nom de marque) · libellés des liens légaux (max 3) · rien d'autre.

**ÉTAPE 3 — Proposition**
Présenter : structure exacte · éléments supprimés vs existant · justification de chaque suppression. Attendre validation.

**ÉTAPE 4 — Implémentation**
UNIQUEMENT : copyright + liens légaux (CGU, Confidentialité, Mentions légales) + langue si multilingue.
Règle absolue : jamais de lien de navigation dans un footer de landing page.

---

### `footer-columns` — Footer Colonnes

**Rôle :** Navigation secondaire complète, SEO interne.
**Variantes :** 3 colonnes · 4 colonnes · 5 colonnes
**Brief requis :** nombre de colonnes + type de site

**ÉTAPE 1 — Audit**
Analyser : toutes les pages et sections du site · structure de navigation existante · pages les plus stratégiques · intégrations disponibles.
Déterminer : groupes de liens logiques · nombre de colonnes (3 à 5 max) · liens à prioriser par colonne.

**ÉTAPE 2 — Rédaction**
Produire :
1. Titres de chaque colonne.
2. Libellés des liens par colonne (max 6 par colonne).
3. Texte de copyright.
4. Liens légaux.
5. Description de marque si colonne "À propos" justifiée (max 2 phrases).

**ÉTAPE 3 — Proposition**
Présenter : plan exact des colonnes · hiérarchie visuelle · recommandations SEO. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : logo ou nom de marque → colonnes groupées → réseaux sociaux discrets → copyright + légal.
Règle SEO : max 6 liens par colonne pour ne pas diluer le poids des liens.

---

### `footer-mega` — Footer Méga

**Rôle :** Navigation exhaustive avec visuels pour les grands sites.
**Brief requis :** confirmer que le volume du site justifie ce type

**ÉTAPE 1 — Audit**
Analyser : intégralité du contenu · visuels disponibles · contenus à mettre en avant · volumétrie du site.
Déterminer : si méga footer est réellement justifié · contenus featured avec visuels · grille de mise en page.

**ÉTAPE 2 — Conception**
Produire :
1. Titres de section et sous-sections.
2. Descriptions courtes des contenus mis en avant.
3. Libellés de tous les liens.
4. Textes d'accompagnement si images intégrées.
5. Copyright et légal.

**ÉTAPE 3 — Proposition**
Présenter : grille complète · éléments visuels recommandés · justification de chaque bloc. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : logo + description courte → colonnes de liens → bloc featured (avec visuel) → newsletter si pertinente → réseaux sociaux → copyright + légal.
Règle : chaque bloc doit avoir une raison d'être. Ne jamais surcharger.

---

### `footer-newsletter` — Footer Newsletter

**Rôle :** Capture d'emails sur une audience qui a lu tout le contenu.
**Brief requis :** intégration email/CRM disponible · proposition de valeur de la newsletter

**ÉTAPE 1 — Audit**
Analyser : intégration email/CRM disponible · formulaires existants · proposition de valeur · ton de la marque.
Déterminer : ce que l'abonné reçoit concrètement · champs nécessaires · placement du formulaire.

**ÉTAPE 2 — Conception**
Produire :
1. Titre d'invitation (pas "Abonnez-vous à notre newsletter").
2. Sous-accroche décrivant ce que l'abonné reçoit.
3. Placeholder champ email.
4. Libellé bouton orienté valeur.
5. Message de réassurance (pas de spam, désabonnement facile).

**ÉTAPE 3 — Proposition**
Présenter : structure avec formulaire intégré · textes · placement recommandé. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : bloc newsletter (titre + sous-accroche + champ + bouton + réassurance) → colonnes de liens si nécessaires → copyright + légal.
Le formulaire doit être connecté à l'intégration email existante.

---

### `footer-sitemap` — Footer Sitemap

**Rôle :** Liste exhaustive des pages pour le SEO.
**Brief requis :** confirmer la volumétrie (justifié uniquement sur sites denses)

**ÉTAPE 1 — Audit**
Analyser : intégralité des pages et hiérarchie · pages orphelines · arborescence · volume total.
Déterminer : pages à inclure (indexables uniquement) · pages à exclure (admin, confirmation, légales) · hiérarchie parent/enfant.

**ÉTAPE 2 — Rédaction**
Produire : libellés de toutes les pages à lister · titres de groupe · copyright et légal.

**ÉTAPE 3 — Proposition**
Présenter : liste exhaustive organisée · justification SEO de chaque groupe. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : pages groupées par thème → hiérarchie visuelle claire (parent > enfant) → copyright + légal.
Règle : ne jamais lister des pages non indexables.

---

### `footer-sticky` — Footer Sticky

**Rôle :** CTA permanent visible pendant tout le scroll.
**Brief requis :** action unique à promouvoir

**ÉTAPE 1 — Audit**
Analyser : action principale que le site cherche à déclencher · éléments déjà visibles en permanence · comportement mobile vs desktop · risques de chevauchement.
Déterminer : unique action dans le sticky · permanent ou apparaît après un certain scroll · option de fermeture nécessaire.

**ÉTAPE 2 — Conception**
Produire :
1. Libellé du CTA unique.
2. Micro-texte d'accompagnement < 10 mots si nécessaire.
3. Texte de réassurance si achat.

**ÉTAPE 3 — Proposition**
Présenter : structure · comportement scroll · règles mobile vs desktop. Attendre validation.

**ÉTAPE 4 — Implémentation**
Règles : visible pendant tout le scroll → UN seul CTA → discret mais lisible → option fermeture si nécessaire → optimisé mobile en priorité.

---

### `footer-cta` — Footer CTA

**Rôle :** Dernière chance de conversion avant que le visiteur parte.
**Brief requis :** action souhaitée + argument de dernier recours

**ÉTAPE 1 — Audit**
Analyser : action principale du site · CTA déjà présents sur la page · profil du visiteur qui atteint le bas · ton de la marque.
Déterminer : si CTA du footer identique ou différent du hero · argument de dernier recours · offre spéciale applicable.

**ÉTAPE 2 — Conception**
Produire :
1. Titre percutant (dernière chance de convaincre).
2. Sous-accroche synthétisant la proposition de valeur.
3. Libellé CTA principal.
4. Libellé CTA secondaire si pertinent.
5. Élément de réassurance.

**ÉTAPE 3 — Proposition**
Présenter : structure · textes · relation avec les autres CTA de la page. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : titre fort → sous-accroche → CTA principal (bouton visible) → CTA secondaire (lien texte) → réassurance → bas de footer standard (copyright + légal).

---

### `footer-social` — Footer Social-first

**Rôle :** Orienter vers la communauté sociale de la marque.
**Brief requis :** liste des réseaux actifs avec URLs

**ÉTAPE 1 — Audit**
Analyser : réseaux actifs et leur engagement · volumes de publications · ton de la marque · réseaux inactifs à ne pas mettre en avant.
Déterminer : 2 à 4 réseaux à vraiment mettre en avant · nécessité d'un message d'invitation · style des icônes.

**ÉTAPE 2 — Rédaction**
Produire :
1. Texte d'invitation si applicable (court).
2. Libellés d'accessibilité de chaque icône.
3. Copyright et légal.

**ÉTAPE 3 — Proposition**
Présenter : réseaux retenus et exclus avec justification · structure · recommandations visuelles. Attendre validation.

**ÉTAPE 4 — Implémentation**
Contenu : icônes réseaux actifs uniquement → texte d'invitation si pertinent → copyright + légal.
Règle : ne jamais afficher un réseau inactif ou peu engagé.

---
---
