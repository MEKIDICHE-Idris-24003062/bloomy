/**
 * Bloomy - Stripe Payment Integration
 * 
 * This module handles secure payment processing with Stripe.
 * 
 * IMPORTANT: In production, you need to:
 * 1. Create a Stripe account at https://stripe.com
 * 2. Get your API keys from the Stripe Dashboard
 * 3. Replace the test publishable key below with your own
 * 4. Create a backend server to handle PaymentIntent creation
 * 
 * Test Card Numbers (Stripe Test Mode):
 * - Success: 4242 4242 4242 4242
 * - Decline: 4000 0000 0000 0002
 * - 3D Secure: 4000 0025 0000 3155
 */

class BloomyPayment {
    constructor() {
        // Stripe Test Publishable Key
        // Replace with your own key from https://dashboard.stripe.com/apikeys
        this.publishableKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

        this.stripe = null;
        this.elements = null;
        this.cardElement = null;
        this.paymentIntent = null;

        this.init();
    }

    /**
     * Initialize Stripe
     */
    async init() {
        // Load Stripe.js dynamically if not already loaded
        if (typeof Stripe === 'undefined') {
            await this.loadStripeJS();
        }

        try {
            this.stripe = Stripe(this.publishableKey);
        } catch (error) {
            console.error('Failed to initialize Stripe:', error);
        }
    }

    /**
     * Load Stripe.js script
     */
    loadStripeJS() {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src*="stripe.com"]')) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Create and mount card elements
     */
    createCardElement(containerId) {
        if (!this.stripe) {
            console.error('Stripe not initialized');
            return null;
        }

        // Custom styling for the card element
        const style = {
            base: {
                color: '#ffffff',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#6b7280'
                },
                iconColor: '#7c3aed'
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444'
            }
        };

        // Create elements instance
        this.elements = this.stripe.elements({
            fonts: [
                {
                    cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap'
                }
            ]
        });

        // Create card element
        this.cardElement = this.elements.create('card', {
            style,
            hidePostalCode: true // We collect it separately
        });

        // Mount to container
        const container = document.getElementById(containerId);
        if (container) {
            this.cardElement.mount(`#${containerId}`);
        }

        return this.cardElement;
    }

    /**
     * Create individual elements for a custom layout
     */
    createCustomElements(options) {
        if (!this.stripe) {
            console.error('Stripe not initialized');
            return null;
        }

        const style = {
            base: {
                color: '#ffffff',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#6b7280'
                }
            },
            invalid: {
                color: '#ef4444'
            }
        };

        this.elements = this.stripe.elements();

        const elements = {
            cardNumber: this.elements.create('cardNumber', { style, placeholder: '1234 5678 9012 3456' }),
            cardExpiry: this.elements.create('cardExpiry', { style, placeholder: 'MM / AA' }),
            cardCvc: this.elements.create('cardCvc', { style, placeholder: 'CVC' })
        };

        // Mount elements
        if (options.cardNumberId) elements.cardNumber.mount(`#${options.cardNumberId}`);
        if (options.cardExpiryId) elements.cardExpiry.mount(`#${options.cardExpiryId}`);
        if (options.cardCvcId) elements.cardCvc.mount(`#${options.cardCvcId}`);

        this.cardElement = elements.cardNumber; // Use cardNumber for payment

        return elements;
    }

    /**
     * Create a PaymentIntent (simulated - in production, call your backend)
     * 
     * In production, this should be an API call to your server:
     * const response = await fetch('/api/create-payment-intent', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({ amount, currency, metadata })
     * });
     * const { clientSecret } = await response.json();
     */
    async createPaymentIntent(amount, currency = 'eur', metadata = {}) {
        // SIMULATION: In production, this would be created on your server
        // using the Stripe secret key. Never expose your secret key in client code!

        console.log('Creating PaymentIntent for:', { amount, currency, metadata });

        // Simulated client secret (for demo purposes)
        // In production, this comes from your backend
        const simulatedClientSecret = 'pi_simulated_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2);

        this.paymentIntent = {
            id: 'pi_' + Date.now(),
            amount,
            currency,
            clientSecret: simulatedClientSecret,
            status: 'requires_payment_method'
        };

        return this.paymentIntent;
    }

    /**
     * Process payment
     */
    async processPayment(billingDetails) {
        if (!this.stripe || !this.cardElement) {
            return { success: false, error: 'Le système de paiement n\'est pas prêt.' };
        }

        try {
            // In demo mode, we simulate the payment
            // In production, you would use:
            // const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {...});

            // Simulate payment processing
            const cardInfo = await this.getCardInfo();

            // Check for test card numbers
            if (cardInfo.brand === 'unknown' || cardInfo.empty) {
                return { success: false, error: 'Veuillez entrer un numéro de carte valide.' };
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create a simulated successful payment
            const paymentResult = {
                paymentIntent: {
                    id: 'pi_' + Date.now(),
                    amount: this.paymentIntent?.amount || 14900,
                    currency: 'eur',
                    status: 'succeeded',
                    created: Date.now()
                }
            };

            return {
                success: true,
                paymentIntent: paymentResult.paymentIntent
            };

        } catch (error) {
            return {
                success: false,
                error: error.message || 'Une erreur est survenue lors du paiement.'
            };
        }
    }

    /**
     * Get card info from element
     */
    getCardInfo() {
        return new Promise((resolve) => {
            if (!this.cardElement) {
                resolve({ brand: 'unknown', empty: true });
                return;
            }

            this.cardElement.on('change', (event) => {
                resolve({
                    brand: event.brand,
                    complete: event.complete,
                    empty: event.empty,
                    error: event.error
                });
            });

            // Trigger a check
            this.cardElement.update({});
        });
    }

    /**
     * Validate card before submission
     */
    async validateCard() {
        return new Promise((resolve) => {
            if (!this.cardElement) {
                resolve({ valid: false, error: 'Carte non initialisée.' });
                return;
            }

            this.cardElement.on('change', (event) => {
                if (event.error) {
                    resolve({ valid: false, error: event.error.message });
                } else if (event.complete) {
                    resolve({ valid: true });
                } else {
                    resolve({ valid: false, error: 'Veuillez compléter les informations de carte.' });
                }
            });
        });
    }

    /**
     * Handle payment method errors
     */
    handleError(error) {
        const errorMessages = {
            'card_declined': 'Votre carte a été refusée.',
            'expired_card': 'Votre carte a expiré.',
            'incorrect_cvc': 'Le code CVC est incorrect.',
            'processing_error': 'Une erreur est survenue, veuillez réessayer.',
            'incorrect_number': 'Le numéro de carte est incorrect.',
            'invalid_expiry_month': 'Le mois d\'expiration est invalide.',
            'invalid_expiry_year': 'L\'année d\'expiration est invalide.',
            'incomplete_number': 'Le numéro de carte est incomplet.',
            'incomplete_cvc': 'Le CVC est incomplet.',
            'incomplete_expiry': 'La date d\'expiration est incomplète.'
        };

        return errorMessages[error.code] || error.message || 'Erreur de paiement.';
    }

    /**
     * Destroy card elements
     */
    destroy() {
        if (this.cardElement) {
            this.cardElement.destroy();
            this.cardElement = null;
        }
        if (this.elements) {
            this.elements = null;
        }
    }
}

// Create global instance
window.BloomyPayment = new BloomyPayment();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BloomyPayment;
}
