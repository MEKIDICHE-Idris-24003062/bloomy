/**
 * Bloomy - Authentication & User Database System
 * Uses localStorage for client-side persistence
 * 
 * NOTE: In production, this should be replaced with a real backend API
 * (Node.js + MongoDB/PostgreSQL, PHP + MySQL, etc.)
 */

class BloomyAuth {
    constructor() {
        this.USERS_KEY = 'bloomy_users';
        this.SESSION_KEY = 'bloomy_session';
        this.ORDERS_KEY = 'bloomy_orders';
        this.init();
    }

    // Initialize the database
    init() {
        if (!localStorage.getItem(this.USERS_KEY)) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.ORDERS_KEY)) {
            localStorage.setItem(this.ORDERS_KEY, JSON.stringify([]));
        }
    }

    // =====================================================
    // USER MANAGEMENT
    // =====================================================

    /**
     * Get all users from the database
     */
    getUsers() {
        return JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
    }

    /**
     * Save users to the database
     */
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    /**
     * Find a user by email
     */
    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    /**
     * Find a user by ID
     */
    findUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    /**
     * Generate a unique user ID
     */
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Hash a password (simple hash for demo - use bcrypt in production)
     */
    hashPassword(password) {
        // Simple hash for demo purposes
        // In production, use bcrypt on the server side
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hash_' + Math.abs(hash).toString(16) + '_' + password.length;
    }

    /**
     * Verify password
     */
    verifyPassword(password, hash) {
        return this.hashPassword(password) === hash;
    }

    // =====================================================
    // REGISTRATION
    // =====================================================

    /**
     * Register a new user
     */
    register(userData) {
        const { email, password, firstName, lastName } = userData;

        // Validation
        if (!email || !password || !firstName || !lastName) {
            return { success: false, error: 'Tous les champs sont requis.' };
        }

        if (!this.isValidEmail(email)) {
            return { success: false, error: 'Email invalide.' };
        }

        if (password.length < 8) {
            return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' };
        }

        if (!/[A-Z]/.test(password)) {
            return { success: false, error: 'Le mot de passe doit contenir au moins une majuscule.' };
        }

        if (!/[0-9]/.test(password)) {
            return { success: false, error: 'Le mot de passe doit contenir au moins un chiffre.' };
        }

        // Check if user already exists
        if (this.findUserByEmail(email)) {
            return { success: false, error: 'Un compte existe déjà avec cet email.' };
        }

        // Create new user
        const newUser = {
            id: this.generateUserId(),
            email: email.toLowerCase(),
            password: this.hashPassword(password),
            firstName,
            lastName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addresses: [],
            savedCards: [],
            preferences: {
                newsletter: false,
                language: 'fr'
            }
        };

        // Save user
        const users = this.getUsers();
        users.push(newUser);
        this.saveUsers(users);

        // Auto login after registration
        this.createSession(newUser);

        return {
            success: true,
            message: 'Compte créé avec succès !',
            user: this.sanitizeUser(newUser)
        };
    }

    // =====================================================
    // LOGIN / LOGOUT
    // =====================================================

    /**
     * Login a user
     */
    login(email, password, rememberMe = false) {
        if (!email || !password) {
            return { success: false, error: 'Email et mot de passe requis.' };
        }

        const user = this.findUserByEmail(email);

        if (!user) {
            return { success: false, error: 'Email ou mot de passe incorrect.' };
        }

        if (!this.verifyPassword(password, user.password)) {
            return { success: false, error: 'Email ou mot de passe incorrect.' };
        }

        // Create session
        this.createSession(user, rememberMe);

        return {
            success: true,
            message: 'Connexion réussie !',
            user: this.sanitizeUser(user)
        };
    }

    /**
     * Logout the current user
     */
    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.SESSION_KEY);
        return { success: true, message: 'Déconnexion réussie.' };
    }

    /**
     * Create a session for a user
     */
    createSession(user, persistent = false) {
        const session = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        };

        const storage = persistent ? localStorage : sessionStorage;
        storage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }

    /**
     * Get current session
     */
    getSession() {
        let session = sessionStorage.getItem(this.SESSION_KEY);
        if (!session) {
            session = localStorage.getItem(this.SESSION_KEY);
        }

        if (!session) return null;

        const parsed = JSON.parse(session);

        // Check if session is expired
        if (new Date(parsed.expiresAt) < new Date()) {
            this.logout();
            return null;
        }

        return parsed;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.getSession() !== null;
    }

    /**
     * Get current logged in user
     */
    getCurrentUser() {
        const session = this.getSession();
        if (!session) return null;

        const user = this.findUserById(session.userId);
        return user ? this.sanitizeUser(user) : null;
    }

    // =====================================================
    // PASSWORD RESET
    // =====================================================

    /**
     * Request password reset (simulated)
     */
    requestPasswordReset(email) {
        const user = this.findUserByEmail(email);

        if (!user) {
            // Don't reveal if email exists for security
            return {
                success: true,
                message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.'
            };
        }

        // Generate reset token
        const resetToken = 'reset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);

        // Store reset token (in production, this would be stored server-side with expiration)
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex].resetToken = resetToken;
        users[userIndex].resetTokenExpires = new Date(Date.now() + 3600000).toISOString(); // 1 hour
        this.saveUsers(users);

        // In production, send email here
        console.log('Reset token for', email, ':', resetToken);

        return {
            success: true,
            message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
            // For demo purposes only - remove in production
            _demoToken: resetToken
        };
    }

    /**
     * Reset password with token
     */
    resetPassword(token, newPassword) {
        const users = this.getUsers();
        const user = users.find(u => u.resetToken === token);

        if (!user) {
            return { success: false, error: 'Lien de réinitialisation invalide.' };
        }

        if (new Date(user.resetTokenExpires) < new Date()) {
            return { success: false, error: 'Le lien de réinitialisation a expiré.' };
        }

        if (newPassword.length < 8) {
            return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' };
        }

        // Update password
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex].password = this.hashPassword(newPassword);
        users[userIndex].resetToken = null;
        users[userIndex].resetTokenExpires = null;
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Mot de passe mis à jour avec succès !' };
    }

    // =====================================================
    // PROFILE MANAGEMENT
    // =====================================================

    /**
     * Update user profile
     */
    updateProfile(updates) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);

        if (userIndex === -1) {
            return { success: false, error: 'Utilisateur non trouvé.' };
        }

        // Allowed updates
        const allowedFields = ['firstName', 'lastName', 'phone', 'preferences'];

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                users[userIndex][field] = updates[field];
            }
        }

        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        // Update session
        this.createSession(users[userIndex], !!localStorage.getItem(this.SESSION_KEY));

        return {
            success: true,
            message: 'Profil mis à jour !',
            user: this.sanitizeUser(users[userIndex])
        };
    }

    /**
     * Change password
     */
    changePassword(currentPassword, newPassword) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);
        const user = users[userIndex];

        if (!this.verifyPassword(currentPassword, user.password)) {
            return { success: false, error: 'Mot de passe actuel incorrect.' };
        }

        if (newPassword.length < 8) {
            return { success: false, error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' };
        }

        users[userIndex].password = this.hashPassword(newPassword);
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Mot de passe modifié avec succès !' };
    }

    /**
     * Change email
     */
    changeEmail(newEmail, password) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        if (!this.isValidEmail(newEmail)) {
            return { success: false, error: 'Email invalide.' };
        }

        if (this.findUserByEmail(newEmail)) {
            return { success: false, error: 'Cet email est déjà utilisé.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);
        const user = users[userIndex];

        if (!this.verifyPassword(password, user.password)) {
            return { success: false, error: 'Mot de passe incorrect.' };
        }

        users[userIndex].email = newEmail.toLowerCase();
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        // Update session
        this.createSession(users[userIndex], !!localStorage.getItem(this.SESSION_KEY));

        return { success: true, message: 'Email modifié avec succès !' };
    }

    // =====================================================
    // ADDRESS MANAGEMENT
    // =====================================================

    /**
     * Add an address
     */
    addAddress(address) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);

        const newAddress = {
            id: 'addr_' + Date.now(),
            ...address,
            isDefault: users[userIndex].addresses.length === 0,
            createdAt: new Date().toISOString()
        };

        users[userIndex].addresses.push(newAddress);
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Adresse ajoutée !', address: newAddress };
    }

    /**
     * Update an address
     */
    updateAddress(addressId, updates) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);
        const addrIndex = users[userIndex].addresses.findIndex(a => a.id === addressId);

        if (addrIndex === -1) {
            return { success: false, error: 'Adresse non trouvée.' };
        }

        users[userIndex].addresses[addrIndex] = {
            ...users[userIndex].addresses[addrIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Adresse mise à jour !' };
    }

    /**
     * Delete an address
     */
    deleteAddress(addressId) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);

        users[userIndex].addresses = users[userIndex].addresses.filter(a => a.id !== addressId);
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Adresse supprimée !' };
    }

    /**
     * Set default address
     */
    setDefaultAddress(addressId) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === session.userId);

        users[userIndex].addresses = users[userIndex].addresses.map(a => ({
            ...a,
            isDefault: a.id === addressId
        }));
        users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers(users);

        return { success: true, message: 'Adresse par défaut mise à jour !' };
    }

    // =====================================================
    // ORDERS
    // =====================================================

    /**
     * Get all orders for current user
     */
    getOrders() {
        const session = this.getSession();
        if (!session) return [];

        const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
        return orders.filter(o => o.userId === session.userId).sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    /**
     * Create a new order
     */
    createOrder(orderData) {
        const session = this.getSession();

        const order = {
            id: 'BLM-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
            userId: session ? session.userId : null,
            email: orderData.email,
            items: orderData.items,
            shipping: orderData.shipping,
            billing: orderData.billing,
            total: orderData.total,
            status: 'pending',
            statusHistory: [
                { status: 'pending', date: new Date().toISOString(), message: 'Commande reçue' }
            ],
            trackingNumber: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
        orders.push(order);
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));

        return { success: true, order };
    }

    /**
     * Get order by ID
     */
    getOrderById(orderId) {
        const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
        return orders.find(o => o.id === orderId);
    }

    /**
     * Get order by ID and email (for guest tracking)
     */
    getOrderByIdAndEmail(orderId, email) {
        const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
        return orders.find(o => o.id === orderId && o.email.toLowerCase() === email.toLowerCase());
    }

    // =====================================================
    // UTILITIES
    // =====================================================

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Remove sensitive data from user object
     */
    sanitizeUser(user) {
        const { password, resetToken, resetTokenExpires, ...safeUser } = user;
        return safeUser;
    }

    /**
     * Delete account
     */
    deleteAccount(password) {
        const session = this.getSession();
        if (!session) {
            return { success: false, error: 'Non connecté.' };
        }

        const users = this.getUsers();
        const user = users.find(u => u.id === session.userId);

        if (!this.verifyPassword(password, user.password)) {
            return { success: false, error: 'Mot de passe incorrect.' };
        }

        // Remove user
        const filteredUsers = users.filter(u => u.id !== session.userId);
        this.saveUsers(filteredUsers);

        // Logout
        this.logout();

        return { success: true, message: 'Compte supprimé.' };
    }
}

// Create global instance
window.BloomyAuth = new BloomyAuth();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BloomyAuth;
}
