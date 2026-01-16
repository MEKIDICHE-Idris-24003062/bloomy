# 🎨 Wireframe Écrit - Page d'Accueil Bloomy

## Vue d'Ensemble

La page d'accueil est une **landing page immersive** conçue pour présenter le produit de manière spectaculaire et convertir les visiteurs en acheteurs. Elle utilise un **scroll vertical fluide** avec de grandes sections plein écran.

---

## Structure Complète (Top → Bottom)

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (Sticky)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                     SECTION 1: HERO                              │
│                   (100vh - Plein écran)                          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 2: L'ÉCRAN QUI CHANGE TOUT                 │
│                   (Focus sur l'écran tactile)                    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 3: SON IMMERSIF                            │
│                   (Qualité audio)                                │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 4: LIBERTÉ TOTALE                          │
│                   (Autonomie & Sans fil)                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 5: SPÉCIFICATIONS                          │
│                   (Détails techniques)                           │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 6: TÉMOIGNAGES                             │
│                   (Preuves sociales)                             │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│               SECTION 7: CALL TO ACTION FINAL                    │
│                   (Offre + Bouton Acheter)                       │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Détail de Chaque Section

---

### 🔹 HEADER (Navigation Sticky)

**Comportement** : Fixe en haut, transparent au départ, devient opaque avec fond sombre au scroll.

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO BLOOMY]              [🛒 Panier (0)]  [👤 Connexion]     │
└─────────────────────────────────────────────────────────────────┘
```

**Éléments** :
- **Logo Bloomy** (gauche) - Lien vers accueil
- **Panier** (droite) - Icône + badge compteur
- **Connexion** (droite) - Bouton ou avatar si connecté

**Style** :
- Hauteur : 70-80px
- Padding horizontal : 5-10%
- Transition fluide sur le background

---

### 🔹 SECTION 1 : HERO (100vh)

**Objectif** : Captiver immédiatement, présenter le produit comme révolutionnaire.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                                                                  │
│           [VIDÉO/IMAGE PLEIN ÉCRAN DU PRODUIT]                  │
│                                                                  │
│        Écouteurs flottants avec boîtier, effet lumineux,        │
│              fond sombre avec dégradé subtil                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │              BLOOMY SMART CASE                          │    │
│  │                                                          │    │
│  │     L'écran tactile. Sur vos écouteurs.                 │    │
│  │                                                          │    │
│  │    "Le premier boîtier d'écouteurs avec écran           │    │
│  │     tactile intégré. Contrôlez tout, d'un simple        │    │
│  │     toucher."                                            │    │
│  │                                                          │    │
│  │              [ DÉCOUVRIR ]     [ ACHETER - 149€ ]       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│                         ↓ Scroll                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Contenus** :
1. **Média principal** : Vidéo en boucle (ou image HD) montrant le produit sous son meilleur angle, avec effets de lumière
2. **Titre principal** (H1) : "BLOOMY SMART CASE" ou "L'ère de l'écoute intelligente"
3. **Sous-titre accrocheur** : "L'écran tactile. Sur vos écouteurs."
4. **Paragraphe court** : Proposition de valeur unique
5. **CTA double** :
   - Bouton secondaire : "Découvrir" (scroll vers section suivante)
   - Bouton principal : "Acheter - 149€" (lien vers checkout/panier)
6. **Indicateur de scroll** : Flèche animée vers le bas

**Style** :
- Fond : Noir/dégradé sombre (#0A0A0A → #1F1F1F)
- Texte : Blanc pur
- Boutons : Accent violet/bleu avec effet glow
- Animation : Fade in au chargement, parallax léger sur le produit

---

### 🔹 SECTION 2 : L'ÉCRAN QUI CHANGE TOUT

**Objectif** : Mettre en avant l'USP principal - l'écran tactile du boîtier.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌─────────────────────┐    ┌──────────────────────────────┐   │
│  │                     │    │                               │   │
│  │   [IMAGE HD]        │    │  L'écran qui change           │   │
│  │   Gros plan sur     │    │  tout.                        │   │
│  │   l'écran tactile   │    │                               │   │
│  │   du boîtier        │    │  Fini les gestes compliqués   │   │
│  │   allumé            │    │  sur vos oreilles.            │   │
│  │                     │    │                               │   │
│  │   (Animation de     │    │  • Changez de musique         │   │
│  │    l'interface)     │    │  • Réglez le volume           │   │
│  │                     │    │  • Consultez la batterie      │   │
│  │                     │    │  • Activez la réduction       │   │
│  │                     │    │    de bruit                    │   │
│  │                     │    │                               │   │
│  │                     │    │  Tout ça, directement sur     │   │
│  │                     │    │  votre boîtier.               │   │
│  └─────────────────────┘    └──────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : 50/50 (image gauche, texte droite) - Inversé sur mobile (texte au-dessus)

**Contenus** :
1. **Image/Vidéo** : Gros plan haute définition sur l'écran tactile allumé, montrant l'interface
2. **Titre (H2)** : "L'écran qui change tout."
3. **Sous-titre** : "Fini les gestes compliqués sur vos oreilles."
4. **Liste de fonctionnalités** (avec icônes) :
   - 🎵 Changez de musique d'un swipe
   - 🔊 Réglez le volume intuitivement
   - 🔋 Consultez la batterie en un coup d'œil
   - 🔇 Activez/désactivez la réduction de bruit
5. **Phrase de conclusion** : "Tout ça, directement sur votre boîtier."

**Animation** : L'image apparaît avec un léger slide depuis la gauche au scroll.

---

### 🔹 SECTION 3 : SON IMMERSIF

**Objectif** : Rassurer sur la qualité audio - ce n'est pas qu'un gadget.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                        Un son qui vous                          │
│                        transporte.                               │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │            [IMAGE PLEIN LARGEUR]                          │  │
│  │    Écouteur en gros plan, vue éclatée ou personne         │  │
│  │    immergée dans la musique, fond abstrait ondulé         │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│     ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│     │  🎧          │   │  🔊          │   │  🎤          │     │
│     │  Drivers     │   │  Réduction   │   │  4 micros    │     │
│     │  12mm        │   │  de bruit    │   │  HD          │     │
│     │  Hi-Res      │   │  active      │   │              │     │
│     │              │   │  hybride     │   │  Appels      │     │
│     │  Basses      │   │              │   │  cristallins │     │
│     │  profondes   │   │  Isolation   │   │              │     │
│     │  Aigus       │   │  parfaite    │   │              │     │
│     │  cristallins │   │              │   │              │     │
│     └──────────────┘   └──────────────┘   └──────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : Titre centré + Image large + 3 colonnes de features

**Contenus** :
1. **Titre (H2)** : "Un son qui vous transporte."
2. **Image** : Visuel impactant (vue éclatée de l'écouteur ou ambiance)
3. **3 blocs features** (avec icônes) :
   - **Drivers 12mm Hi-Res** : "Basses profondes, aigus cristallins"
   - **Réduction de bruit active hybride** : "Isolation parfaite du monde extérieur"
   - **4 micros HD** : "Appels d'une clarté exceptionnelle"

**Style** : Fond légèrement différent (gris très foncé ou dégradé subtil) pour varier.

---

### 🔹 SECTION 4 : LIBERTÉ TOTALE

**Objectif** : Mettre en avant l'autonomie et l'aspect sans fil/pratique.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────┐    ┌─────────────────────┐   │
│  │                               │    │                     │   │
│  │  Une liberté                  │    │   [IMAGE HD]        │   │
│  │  sans compromis.              │    │                     │   │
│  │                               │    │   Personne en       │   │
│  │  Jusqu'à 50h d'autonomie      │    │   mouvement avec    │   │
│  │  avec le boîtier.             │    │   les écouteurs     │   │
│  │                               │    │   (sport, ville)    │   │
│  │  • 10h d'écoute continue      │    │                     │   │
│  │  • Recharge rapide : 10min    │    │   Mise en           │   │
│  │    = 2h de musique            │    │   situation         │   │
│  │  • Bluetooth 5.3              │    │   lifestyle         │   │
│  │  • Résistance IPX5            │    │                     │   │
│  │                               │    │                     │   │
│  └──────────────────────────────┘    └─────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : 50/50 inversé (texte gauche, image droite)

**Contenus** :
1. **Titre (H2)** : "Une liberté sans compromis."
2. **Accroche** : "Jusqu'à 50h d'autonomie avec le boîtier."
3. **Liste de features** :
   - ⏱️ 10h d'écoute continue
   - ⚡ Recharge rapide : 10min = 2h de musique
   - 📶 Bluetooth 5.3 - Connexion stable
   - 💧 Résistance IPX5 - Pluie et transpiration
4. **Image** : Lifestyle, personne active utilisant les écouteurs

---

### 🔹 SECTION 5 : SPÉCIFICATIONS TECHNIQUES

**Objectif** : Donner les détails techniques pour les acheteurs avertis.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    Conçu dans les moindres                      │
│                    détails.                                      │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │   [IMAGE PRODUIT SUR FOND NEUTRE - VUE 3/4]              │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ AUDIO           │  │ BOÎTIER         │  │ CONNECTIVITÉ   │  │
│  │ ─────────────── │  │ ─────────────── │  │ ────────────── │  │
│  │ Drivers: 12mm   │  │ Écran: 1.4"     │  │ Bluetooth 5.3  │  │
│  │ Réponse: 20Hz - │  │ tactile AMOLED  │  │ Codecs: AAC,   │  │
│  │ 20kHz           │  │ Résolution:     │  │ SBC, LDAC      │  │
│  │ Codecs: AAC,    │  │ 360x360px       │  │ Portée: 15m    │  │
│  │ LDAC, SBC       │  │ Batterie:       │  │ Multipoint:    │  │
│  │ ANC: Hybride    │  │ 500mAh          │  │ 2 appareils    │  │
│  │ Mode            │  │ USB-C           │  │                │  │
│  │ Transparence    │  │ Charge sans fil │  │                │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │ AUTONOMIE       │  │ RÉSISTANCE      │                       │
│  │ ─────────────── │  │ ─────────────── │                       │
│  │ Écouteurs: 10h  │  │ Certification:  │                       │
│  │ Avec boîtier:   │  │ IPX5            │                       │
│  │ 50h             │  │ (écouteurs)     │                       │
│  │ Charge rapide:  │  │                 │                       │
│  │ 10min=2h        │  │ Eau, sueur,     │                       │
│  │                 │  │ poussière       │                       │
│  └─────────────────┘  └─────────────────┘                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : Titre + Image produit + Grille de specs (cards)

**Contenus** : Spécifications organisées par catégorie :
- **Audio** : Drivers, réponse fréquentielle, codecs, ANC
- **Boîtier** : Écran (taille, résolution), batterie, ports
- **Connectivité** : Version Bluetooth, portée, multipoint
- **Autonomie** : Heures d'écoute, charge rapide
- **Résistance** : Certification IPX

**Style** : Cards avec fond légèrement différent, bordures subtiles, icônes pour chaque catégorie.

---

### 🔹 SECTION 6 : TÉMOIGNAGES / PREUVES SOCIALES

**Objectif** : Renforcer la confiance avec des avis clients.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                  Ce qu'ils en disent.                           │
│                                                                  │
│                        ⭐⭐⭐⭐⭐                                │
│                    4.9/5 (2,847 avis)                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │    "L'écran tactile sur le boîtier est un game          │   │
│  │     changer. Je ne reviendrais jamais en arrière."      │   │
│  │                                                          │   │
│  │                    — Marie L., Paris ✓ Achat vérifié     │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │    "Son incroyable, ANC efficace, et ce boîtier...      │   │
│  │     C'est le futur des écouteurs."                       │   │
│  │                                                          │   │
│  │                    — Thomas K., Lyon ✓ Achat vérifié     │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │    "I was skeptical, but these are genuinely the best   │   │
│  │     earbuds I've ever owned. The case screen is genius."│   │
│  │                                                          │   │
│  │                    — Sarah M., New York ✓ Verified       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────┐     │
│  │   Vu dans :  [TechRadar] [The Verge] [01Net] [MKBHD]  │     │
│  └───────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : Titre + Note globale + Témoignages empilés + Logos presse

**Contenus** :
1. **Titre (H2)** : "Ce qu'ils en disent."
2. **Note globale** : Étoiles + moyenne + nombre d'avis
3. **3-4 témoignages** :
   - Citation entre guillemets
   - Prénom, Initiale, Ville
   - Badge "Achat vérifié"
4. **Logos presse/influenceurs** (si applicable) : "Vu dans : [logos]"

**Style** : Fond légèrement contrasté, cards avec citations en italique, effet de profondeur subtil.

---

### 🔹 SECTION 7 : CALL TO ACTION FINAL

**Objectif** : Dernière poussée pour la conversion.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                   [IMAGE PRODUIT GLAMOUR]                       │
│                    Écouteurs + Boîtier                          │
│               sur fond dégradé premium                          │
│                                                                  │
│                                                                  │
│              Prêt à changer votre façon                         │
│              d'écouter ?                                         │
│                                                                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │    🎧  BLOOMY SMART CASE                                │   │
│  │                                                          │   │
│  │    ✓ Écran tactile 1.4"                                 │   │
│  │    ✓ Réduction de bruit active                          │   │
│  │    ✓ 50h d'autonomie totale                             │   │
│  │    ✓ Livraison gratuite                                 │   │
│  │    ✓ Garantie 2 ans                                     │   │
│  │                                                          │   │
│  │    Prix : 149€                                           │   │
│  │        (ou 3x 49,67€ sans frais)                        │   │
│  │                                                          │   │
│  │    Couleur : ● Noir  ○ Blanc  ○ Bleu                    │   │
│  │                                                          │   │
│  │         [ AJOUTER AU PANIER 🛒 ]                        │   │
│  │                                                          │   │
│  │    🔒 Paiement sécurisé | 🚚 Livraison 3-5j | ↩️ Retour 30j │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Layout** : Image + Titre + Récapitulatif offre + CTA

**Contenus** :
1. **Image produit** : Vue glamour du produit complet
2. **Titre (H2)** : "Prêt à changer votre façon d'écouter ?"
3. **Récapitulatif produit** :
   - Nom du produit
   - Liste des bénéfices clés (✓ checkmarks)
   - Prix principal (+ option paiement fractionné si disponible)
   - Sélecteur de couleur
4. **Bouton CTA principal** : "AJOUTER AU PANIER" (très visible, couleur accent)
5. **Badges de réassurance** : Paiement sécurisé, Livraison, Retours

**Style** : 
- Bouton CTA : Grand, couleur accent (#7C3AED), effet hover (glow/scale)
- Badges : Petites icônes + texte discret
- Fond : Dégradé ou image de fond floue

---

### 🔹 FOOTER

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  [LOGO BLOOMY]                                                  │
│                                                                  │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  À propos          Support              Légal                   │
│  ─────────         ─────────            ──────                  │
│  Notre histoire    FAQ                  CGV                     │
│  Contact           Suivi de commande    Confidentialité         │
│                    Retours              Mentions légales        │
│                                                                  │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  Suivez-nous :  [Instagram] [Twitter/X] [TikTok] [YouTube]     │
│                                                                  │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  Newsletter : [Votre email____________] [S'inscrire]            │
│                                                                  │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  Moyens de paiement : [Visa] [MC] [Amex] [ApplePay] [GPay]     │
│                                                                  │
│  © 2026 Bloomy. Tous droits réservés.                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Contenus** :
- Logo
- Liens organisés par catégorie (Colonnes)
- Réseaux sociaux (icônes)
- Newsletter (optionnel)
- Badges moyens de paiement
- Copyright

---

## Récapitulatif des Arguments de Vente (USP)

| Argument | Emplacement | Message Clé |
|----------|-------------|-------------|
| **Écran tactile** | Hero + Section 2 | "Contrôlez tout depuis votre boîtier" |
| **Qualité audio** | Section 3 | "Drivers 12mm, ANC hybride, son Hi-Res" |
| **Autonomie** | Section 4 | "50h avec le boîtier, recharge ultra-rapide" |
| **Design premium** | Toutes sections | Visuels HD, esthétique épurée |
| **Confiance** | Section 6 + CTA | Avis clients, garantie, paiement sécurisé |

---

## Notes d'Implémentation

### Animations Recommandées
- **Hero** : Fade in des textes séquentiellement
- **Sections** : Reveal au scroll (IntersectionObserver)
- **Images** : Léger parallax ou scale subtil
- **Boutons** : Hover avec scale(1.02) et glow
- **Header** : Transition fluide transparent → opaque

### Responsive (Mobile)
- Header : Logo centré, icônes en hamburger ou inline
- Sections 50/50 : Stack vertical (image puis texte)
- CTA : Full width, sticky bottom sur mobile
- Témoignages : Carousel horizontal (swipe)

---

*Document créé le 16 janvier 2026*
*Version 1.0*
