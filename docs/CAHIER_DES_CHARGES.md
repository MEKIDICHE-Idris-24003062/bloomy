# 📋 Cahier des Charges - Bloomy E-commerce

## 1. Présentation du Projet

### 1.1 Contexte
Création d'un site e-commerce **mono-produit** pour la marque **Bloomy**, spécialisée dans la vente d'écouteurs sans fil haut de gamme équipés d'un boîtier à écran tactile innovant (Smart Case).

### 1.2 Objectifs
- Créer une plateforme de vente en ligne premium et inspirant confiance
- Offrir une expérience utilisateur fluide et moderne
- Convertir les visiteurs en acheteurs grâce à un parcours optimisé
- Établir Bloomy comme une marque technologique de référence

### 1.3 Cible
- **Géographie** : International (France, USA, Europe, etc.)
- **Démographie** : 18-45 ans, tech-savvy, sensibles au design et à l'innovation
- **Psychographie** : Recherche de qualité, méfiance envers les sites peu professionnels

---

## 2. Identité de Marque

### 2.1 Nom de Marque
**Bloomy** - Évoque l'épanouissement, la floraison technologique, l'innovation qui s'épanouit.

### 2.2 Positionnement
- **Tonalité** : Technologique, premium, fiable, innovant
- **Valeurs** : Innovation, qualité, design, expérience utilisateur

### 2.3 Identité Visuelle (à créer)
- **Logo** : Minimaliste, moderne, reconnaissable
- **Palette de couleurs** :
  - Primaire : Noir profond (#0A0A0A) - Élégance
  - Secondaire : Blanc pur (#FFFFFF) - Pureté
  - Accent : Violet/Bleu électrique (#7C3AED → #4F46E5) - Innovation technologique
  - Touches : Gris anthracite (#1F1F1F) pour les fonds, gris clair (#F5F5F5) pour les contrastes
- **Typographie** :
  - Titres : Inter (Bold/Black) ou SF Pro Display
  - Corps : Inter (Regular/Medium)
- **Style graphique** : Épuré, beaucoup d'espace blanc, grandes images HD, animations subtiles

---

## 3. Spécifications Techniques

### 3.1 Stack Technologique Recommandé
| Composant | Technologie |
|-----------|-------------|
| **Frontend** | Next.js 14+ (React) avec App Router |
| **Styling** | CSS Modules / Vanilla CSS (pas de Tailwind sauf demande) |
| **Backend/API** | Next.js API Routes |
| **Base de données** | PostgreSQL (via Supabase ou PlanetScale) |
| **Authentification** | NextAuth.js / Auth.js |
| **Paiement** | **Stripe** (API complète + Stripe Elements) |
| **Hébergement** | Vercel (optimal pour Next.js) |
| **CDN/Images** | Vercel Image Optimization ou Cloudinary |
| **Emails transactionnels** | Resend ou SendGrid |

### 3.2 Architecture
```
bloomy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Routes authentification
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── reset-password/
│   │   ├── (shop)/             # Routes boutique
│   │   │   ├── page.tsx        # Homepage/Landing
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── account/            # Espace client
│   │   │   ├── orders/
│   │   │   ├── wallet/
│   │   │   └── settings/
│   │   ├── tracking/           # Suivi de commande
│   │   ├── legal/              # Pages légales
│   │   │   ├── cgv/
│   │   │   ├── privacy/
│   │   │   └── contact/
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── ui/                 # Composants réutilisables
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── sections/           # Sections de page
│   ├── lib/                    # Utilitaires et configurations
│   ├── hooks/                  # Custom React hooks
│   └── styles/                 # CSS global et variables
├── public/
│   ├── images/
│   ├── videos/
│   └── fonts/
└── docs/                       # Documentation
```

---

## 4. Fonctionnalités Détaillées

### 4.1 Header (Navigation Principale)
- **Logo Bloomy** (lien vers accueil)
- **Icône Panier** avec badge compteur (nombre d'articles)
- **Icône/Bouton Connexion** :
  - Non connecté : "Se connecter"
  - Connecté : Avatar/Initiales avec menu dropdown
- **Responsive** : Menu hamburger sur mobile

### 4.2 Système d'Authentification

#### 4.2.1 Inscription
- Champs requis : Email, Mot de passe, Confirmation mot de passe
- Validation email (format + unicité)
- Mot de passe : min 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
- Email de confirmation d'inscription
- Possibilité d'inscription via checkout (guest → compte)

#### 4.2.2 Connexion
- Email + Mot de passe
- Option "Se souvenir de moi"
- Lien "Mot de passe oublié"
- Protection anti-bruteforce (rate limiting)

#### 4.2.3 Réinitialisation Mot de Passe
- Saisie de l'email
- Email avec lien sécurisé (token temporaire, expiration 1h)
- Page de création nouveau mot de passe
- Confirmation de changement

### 4.3 Espace Client (Dashboard)

#### 4.3.1 Vue d'ensemble
- Informations personnelles (nom, email)
- Dernières commandes (résumé)
- Accès rapide aux sections

#### 4.3.2 Historique des Commandes
- Liste paginée des commandes
- Pour chaque commande :
  - Numéro de commande
  - Date
  - Statut (En préparation, Expédié, Livré)
  - Montant total
  - Lien vers détail et suivi

#### 4.3.3 Wallet (Moyens de Paiement Sauvegardés)
- Intégration **Stripe Customer Portal** ou custom
- Affichage des cartes sauvegardées (derniers 4 chiffres, expiration, marque)
- Ajout d'une nouvelle carte (via Stripe Elements)
- Suppression d'une carte
- Définir carte par défaut
- **Sécurité** : Aucune donnée sensible stockée côté serveur (tokenisation Stripe)

#### 4.3.4 Paramètres du Compte
- Modifier email
- Modifier mot de passe
- Adresses de livraison (CRUD)
- Préférences de communication
- Supprimer le compte

### 4.4 Page Produit / Landing Page
*(Voir section 6 - Wireframe détaillé)*

### 4.5 Panier

#### 4.5.1 Mini-Panier (Slide-over/Dropdown)
- Aperçu des articles
- Quantité modifiable
- Bouton "Voir le panier"
- Bouton "Commander"

#### 4.5.2 Page Panier Complète
- Liste des articles avec :
  - Image produit
  - Nom et variante (couleur)
  - Prix unitaire
  - Sélecteur de quantité
  - Sous-total
  - Bouton suppression
- Code promo (champ + validation)
- Récapitulatif :
  - Sous-total
  - Réduction (si applicable)
  - Frais de livraison (calculés ou "Calculés à l'étape suivante")
  - **Total TTC**
- Bouton "Passer la commande" (CTA principal)

### 4.6 Checkout (Tunnel de Commande)

#### 4.6.1 Étape 1 - Informations
- **Client non connecté** :
  - Option : Continuer en tant qu'invité OU Se connecter
  - Formulaire : Email, Prénom, Nom
- **Client connecté** :
  - Informations pré-remplies

#### 4.6.2 Étape 2 - Livraison
- Adresse de livraison (formulaire ou sélection si connecté)
- Champs : Adresse, Complément, Code postal, Ville, Pays
- Validation internationale des adresses
- Options de livraison avec tarifs :
  - Standard (5-7 jours)
  - Express (2-3 jours)
  - etc.

#### 4.6.3 Étape 3 - Paiement
- **Stripe Elements** intégré :
  - Carte bancaire (Visa, Mastercard, Amex, etc.)
  - Apple Pay / Google Pay (si supporté)
- Si connecté avec carte sauvegardée :
  - Sélection de la carte existante
  - Option "Utiliser une autre carte"
- Checkbox : "Sauvegarder cette carte pour mes prochains achats" (si connecté)
- Récapitulatif commande visible
- Checkbox acceptation CGV (obligatoire)
- Bouton "Payer XX,XX €"

#### 4.6.4 Confirmation de Commande
- Page de remerciement
- Numéro de commande
- Récapitulatif
- Email de confirmation envoyé
- Lien vers suivi de commande

### 4.7 Suivi de Commande

#### 4.7.1 Page Publique (sans connexion)
- Champ : Numéro de commande + Email
- Bouton "Suivre ma commande"
- Affichage :
  - Statut actuel (timeline visuelle)
  - Numéro de tracking (si expédié)
  - Lien vers transporteur
  - Dates estimées

#### 4.7.2 Via Espace Client
- Accès direct depuis l'historique des commandes
- Même informations que ci-dessus

### 4.8 Pages Légales

#### 4.8.1 Conditions Générales de Vente (CGV)
- Identité du vendeur
- Prix et modalités de paiement
- Livraison
- Droit de rétractation (14 jours UE)
- Garanties
- Responsabilité
- Litiges

#### 4.8.2 Politique de Confidentialité
- Données collectées
- Finalités
- Durée de conservation
- Droits des utilisateurs (RGPD)
- Cookies
- Contact DPO

#### 4.8.3 Page Contact
- Formulaire de contact (Nom, Email, Sujet, Message)
- Email de support
- FAQ intégrée (accordéon)

### 4.9 Footer
- Logo Bloomy
- Liens légaux (CGV, Confidentialité, Contact)
- Réseaux sociaux (icônes)
- Newsletter (optionnel)
- Moyens de paiement acceptés (badges)
- Copyright

---

## 5. Exigences Non-Fonctionnelles

### 5.1 Performance
- **Temps de chargement** : < 3 secondes (First Contentful Paint)
- **Score Lighthouse** : > 90 (Performance, Accessibility, SEO)
- Optimisation des images (WebP, lazy loading)
- Code splitting automatique (Next.js)

### 5.2 Sécurité
- HTTPS obligatoire
- Protection CSRF
- Validation côté serveur de toutes les entrées
- Authentification sécurisée (bcrypt, JWT httpOnly)
- Conformité PCI-DSS via Stripe (pas de stockage de données bancaires)
- Rate limiting sur les endpoints sensibles
- Headers de sécurité (CSP, HSTS, etc.)

### 5.3 Accessibilité
- Conformité WCAG 2.1 AA
- Navigation au clavier
- Contraste suffisant
- Attributs ARIA appropriés
- Textes alternatifs pour les images

### 5.4 SEO
- Meta tags optimisés (title, description, Open Graph)
- Données structurées (Schema.org - Product, Organization)
- Sitemap XML
- Robots.txt
- URLs propres et sémantiques

### 5.5 Responsive Design
- Mobile-first approach
- Breakpoints :
  - Mobile : < 768px
  - Tablette : 768px - 1024px
  - Desktop : > 1024px
- Touch-friendly sur mobile

### 5.6 Internationalisation (i18n)
- Multi-langue (FR, EN minimum)
- Multi-devise (EUR, USD)
- Adaptation automatique selon géolocalisation (optionnel phase 2)

---

## 6. Contraintes et Interdits

### ❌ À NE PAS FAIRE
- **Pas de grilles de carrés/slides** qui s'enchaînent (type template générique)
- **Pas de publicités tierces** (aucune bannière pub externe)
- **Pas de modèle d'abonnement** (vente unique seulement)
- **Pas d'aspect "dropshipping bas de gamme"** (photos stock génériques, design pauvre)
- **Pas de pop-ups intrusifs** (sauf cookie consent légal et discret)

### ✅ À PRIVILÉGIER
- Grandes images haute définition plein écran
- Navigation fluide par scroll vertical
- Animations subtiles et élégantes
- Espacement généreux (white space)
- Typographie lisible et moderne
- Preuves de confiance (avis, garanties, badges sécurité)

---

## 7. Planning Prévisionnel

| Phase | Description | Durée estimée |
|-------|-------------|---------------|
| **Phase 1** | Design UI/UX (maquettes Figma) | 1-2 semaines |
| **Phase 2** | Setup projet + Landing page | 1 semaine |
| **Phase 3** | Authentification + Espace client | 1 semaine |
| **Phase 4** | Panier + Checkout + Stripe | 1-2 semaines |
| **Phase 5** | Suivi commande + Pages légales | 3-4 jours |
| **Phase 6** | Tests + Optimisations + Déploiement | 1 semaine |

**Durée totale estimée** : 5-7 semaines

---

## 8. Livrables Attendus

1. ✅ Cahier des charges détaillé (ce document)
2. 🔲 Maquettes UI/UX (Figma)
3. 🔲 Identité visuelle complète (logo, charte graphique)
4. 🔲 Site web fonctionnel (code source)
5. 🔲 Documentation technique
6. 🔲 Guide d'utilisation back-office (si applicable)

---

## 9. Notes pour le Développeur

### ⚠️ Point Important - API de Paiement

**Ne pas utiliser "Adobe"** pour les paiements. Le prestataire recommandé est **Stripe** pour les raisons suivantes :

- ✅ Reconnaissance internationale
- ✅ Conformité PCI-DSS native
- ✅ Support Apple Pay / Google Pay
- ✅ Gestion des abonnements et paiements uniques
- ✅ Customer Portal pour la gestion des moyens de paiement
- ✅ Webhooks fiables pour le suivi des transactions
- ✅ Documentation excellente
- ✅ SDK disponible pour toutes les plateformes

**Alternative acceptable** : Shopify Payments (si migration vers Shopify envisagée)

---

*Document rédigé le 16 janvier 2026*
*Version 1.0*
