# Guide d'Intégration Stripe - Bloomy

Ce document explique comment configurer et intégrer Stripe pour les paiements sécurisés sur le site Bloomy.

## 🎯 Présentation

L'intégration Stripe se compose de deux parties :
1. **Frontend (Client)** : Stripe.js et Elements pour le formulaire de carte sécurisé
2. **Backend (Serveur)** : API pour créer les PaymentIntents et gérer les webhooks

## 📋 Étapes d'intégration

### 1. Créer un compte Stripe

1. Rendez-vous sur [stripe.com](https://stripe.com)
2. Créez un compte professionnel
3. Complétez la vérification d'identité

### 2. Récupérer les clés API

Dans le [Dashboard Stripe](https://dashboard.stripe.com/apikeys) :

- **Publishable Key** (publique) : `pk_test_xxxxx` ou `pk_live_xxxxx`
- **Secret Key** (secrète) : `sk_test_xxxxx` ou `sk_live_xxxxx`

⚠️ **IMPORTANT** : Ne jamais exposer la Secret Key côté client !

### 3. Configuration Frontend

Modifiez `js/stripe.js` avec votre clé publique :

```javascript
// Remplacez par votre propre clé publique
this.publishableKey = 'pk_live_VOTRE_CLE_PUBLIQUE';
```

### 4. Configuration Backend (Node.js)

Créez un serveur backend pour gérer les paiements :

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')('sk_live_VOTRE_CLE_SECRETE');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Créer un PaymentIntent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, metadata } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // montant en centimes
            currency: currency || 'eur',
            metadata: metadata,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook pour les événements Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = 'whsec_VOTRE_WEBHOOK_SECRET';
    
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Gérer les événements
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Paiement réussi:', paymentIntent.id);
            // Mettre à jour la commande en base de données
            break;
        case 'payment_intent.payment_failed':
            console.log('Paiement échoué');
            break;
    }
    
    res.json({ received: true });
});

app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
```

### 5. Modifier le frontend pour appeler le backend

Dans `js/stripe.js`, remplacez la méthode `createPaymentIntent` :

```javascript
async createPaymentIntent(amount, currency = 'eur', metadata = {}) {
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, metadata })
    });
    
    if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement');
    }
    
    const { clientSecret } = await response.json();
    this.paymentIntent = { clientSecret };
    
    return this.paymentIntent;
}

async processPayment(billingDetails) {
    const { paymentIntent, error } = await this.stripe.confirmCardPayment(
        this.paymentIntent.clientSecret,
        {
            payment_method: {
                card: this.cardElement,
                billing_details: billingDetails
            }
        }
    );
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true, paymentIntent };
}
```

## 🧪 Cartes de Test

Pour tester en mode développement :

| Scénario | Numéro de carte |
|----------|-----------------|
| Succès | 4242 4242 4242 4242 |
| Refusée | 4000 0000 0000 0002 |
| 3D Secure | 4000 0025 0000 3155 |
| Erreur de traitement | 4000 0000 0000 0119 |

- Date d'expiration : N'importe quelle date future
- CVC : N'importe quel code à 3 chiffres
- Code postal : N'importe quel code postal valide

## 🔒 Sécurité

### Bonnes pratiques

1. **HTTPS obligatoire** : Stripe ne fonctionne qu'en HTTPS en production
2. **Clés séparées** : Utilisez les clés test en développement, live en production
3. **Variables d'environnement** : Stockez les clés dans des variables d'environnement
4. **Webhooks** : Validez toujours la signature des webhooks
5. **PCI Compliance** : Utilisez Stripe Elements pour ne jamais manipuler les données de carte

### Variables d'environnement

```bash
# .env (ne jamais commiter ce fichier)
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 📊 Dashboard Stripe

Le [Dashboard Stripe](https://dashboard.stripe.com) permet de :

- Voir les paiements en temps réel
- Gérer les remboursements
- Configurer les webhooks
- Télécharger les rapports financiers
- Gérer les litiges

## 🚀 Passer en Production

1. Activez votre compte Stripe (vérification d'identité)
2. Remplacez les clés test par les clés live
3. Testez avec une vraie carte (un petit montant)
4. Configurez les webhooks de production
5. Activez la détection de fraude (Radar)

## 📞 Support

- [Documentation Stripe](https://stripe.com/docs)
- [API Reference](https://stripe.com/docs/api)
- [Support Stripe](https://support.stripe.com)

---

*Dernière mise à jour : Janvier 2026*
