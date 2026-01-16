/**
 * Bloomy Dashboard JavaScript
 */

// Check authentication
if (!BloomyAuth.isLoggedIn()) {
    window.location.href = 'account.html';
}

// Get current user
const user = BloomyAuth.getCurrentUser();

// DOM Elements
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const welcomeName = document.getElementById('welcome-name');
const logoutBtn = document.getElementById('logout-btn');
const navLinks = document.querySelectorAll('.dashboard__nav-link');
const sections = document.querySelectorAll('.dashboard__section');

// Stats
const statOrders = document.getElementById('stat-orders');
const statAddresses = document.getElementById('stat-addresses');

// Forms
const profileForm = document.getElementById('profile-form');
const passwordForm = document.getElementById('password-form');
const addressForm = document.getElementById('address-form');
const deleteForm = document.getElementById('delete-form');

// Modals
const addressModal = document.getElementById('address-modal');
const deleteModal = document.getElementById('delete-modal');

// =====================================================
// Initialize
// =====================================================
function init() {
    if (!user) {
        window.location.href = 'account.html';
        return;
    }

    // Set user info
    const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
    userAvatar.textContent = initials;
    userName.textContent = `${user.firstName} ${user.lastName}`;
    userEmail.textContent = user.email;
    welcomeName.textContent = user.firstName;

    // Set form values
    document.getElementById('settings-firstname').value = user.firstName;
    document.getElementById('settings-lastname').value = user.lastName;
    document.getElementById('settings-email').value = user.email;

    // Update stats
    updateStats();

    // Load initial section from hash
    const hash = window.location.hash.slice(1) || 'overview';
    showSection(hash);

    // Load data
    loadOrders();
    loadAddresses();
}

function updateStats() {
    const orders = BloomyAuth.getOrders();
    statOrders.textContent = orders.length;
    statAddresses.textContent = user.addresses ? user.addresses.length : 0;
}

// =====================================================
// Navigation
// =====================================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        window.location.hash = section;
        showSection(section);
    });
});

function showSection(sectionName) {
    // Update nav
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionName);
    });

    // Update sections
    sections.forEach(section => {
        section.classList.toggle('active', section.id === `section-${sectionName}`);
    });
}

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'overview';
    showSection(hash);
});

// =====================================================
// Logout
// =====================================================
logoutBtn.addEventListener('click', () => {
    BloomyAuth.logout();
    window.location.href = 'account.html';
});

// =====================================================
// Orders
// =====================================================
function loadOrders() {
    const orders = BloomyAuth.getOrders();
    const ordersContainer = document.getElementById('orders-list');
    const recentOrdersContainer = document.getElementById('recent-orders');

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <p>Vous n'avez pas encore passé de commande</p>
                <a href="index.html#buy" class="btn btn--primary">Commander maintenant</a>
            </div>
        `;
        recentOrdersContainer.innerHTML = ordersContainer.innerHTML;
        return;
    }

    const ordersHTML = orders.map(order => createOrderCard(order)).join('');
    ordersContainer.innerHTML = ordersHTML;

    // Show only last 3 orders in overview
    const recentOrdersHTML = orders.slice(0, 3).map(order => createOrderCard(order)).join('');
    recentOrdersContainer.innerHTML = recentOrdersHTML;
}

function createOrderCard(order) {
    const statusLabels = {
        pending: 'En attente',
        processing: 'En préparation',
        shipped: 'Expédié',
        delivered: 'Livré',
        cancelled: 'Annulé'
    };

    const statusClasses = {
        pending: 'pending',
        processing: 'processing',
        shipped: 'shipped',
        delivered: 'delivered',
        cancelled: 'cancelled'
    };

    const date = new Date(order.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `
        <div class="order-card">
            <div class="order-card__header">
                <div>
                    <span class="order-card__number">${order.id}</span>
                    <span class="order-card__date">${date}</span>
                </div>
                <span class="order-card__status order-card__status--${statusClasses[order.status]}">
                    ${statusLabels[order.status]}
                </span>
            </div>
            <div class="order-card__content">
                <div class="order-card__items">
                    ${order.items.map(item => `
                        <div class="order-card__item">
                            <div class="order-card__image"></div>
                            <div class="order-card__details">
                                <span class="order-card__product">${item.name}</span>
                                <span class="order-card__variant">${item.color} × ${item.quantity}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-card__footer">
                    <span class="order-card__total">Total: ${order.total}€</span>
                    <a href="tracking.html?order=${order.id}" class="btn btn--ghost btn--small">Suivre la commande</a>
                </div>
            </div>
        </div>
    `;
}

// =====================================================
// Addresses
// =====================================================
function loadAddresses() {
    const addresses = user.addresses || [];
    const addressesContainer = document.getElementById('addresses-list');

    if (addresses.length === 0) {
        addressesContainer.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <p>Aucune adresse enregistrée</p>
            </div>
        `;
        return;
    }

    addressesContainer.innerHTML = addresses.map(addr => `
        <div class="address-card ${addr.isDefault ? 'address-card--default' : ''}">
            ${addr.isDefault ? '<span class="address-card__badge">Par défaut</span>' : ''}
            <div class="address-card__content">
                <strong>${addr.label}</strong>
                <p>${addr.firstName} ${addr.lastName}</p>
                <p>${addr.street}</p>
                ${addr.street2 ? `<p>${addr.street2}</p>` : ''}
                <p>${addr.postal} ${addr.city}</p>
                <p>${addr.country}</p>
                ${addr.phone ? `<p>${addr.phone}</p>` : ''}
            </div>
            <div class="address-card__actions">
                ${!addr.isDefault ? `
                    <button class="btn btn--ghost btn--small" onclick="setDefaultAddress('${addr.id}')">
                        Définir par défaut
                    </button>
                ` : ''}
                <button class="btn btn--ghost btn--small btn--danger" onclick="deleteAddress('${addr.id}')">
                    Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

// Add address modal
document.getElementById('add-address-btn').addEventListener('click', () => {
    addressModal.classList.add('active');
});

document.getElementById('close-address-modal').addEventListener('click', () => {
    addressModal.classList.remove('active');
});

document.getElementById('cancel-address').addEventListener('click', () => {
    addressModal.classList.remove('active');
});

addressModal.querySelector('.modal__overlay').addEventListener('click', () => {
    addressModal.classList.remove('active');
});

// Add address form
addressForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const result = BloomyAuth.addAddress({
        label: document.getElementById('addr-label').value,
        firstName: document.getElementById('addr-firstname').value,
        lastName: document.getElementById('addr-lastname').value,
        street: document.getElementById('addr-street').value,
        street2: document.getElementById('addr-street2').value,
        postal: document.getElementById('addr-postal').value,
        city: document.getElementById('addr-city').value,
        country: document.getElementById('addr-country').value,
        phone: document.getElementById('addr-phone').value
    });

    if (result.success) {
        addressModal.classList.remove('active');
        addressForm.reset();
        // Refresh user data
        window.location.reload();
    }
});

// Delete address
window.deleteAddress = function (addressId) {
    if (confirm('Supprimer cette adresse ?')) {
        BloomyAuth.deleteAddress(addressId);
        window.location.reload();
    }
};

// Set default address
window.setDefaultAddress = function (addressId) {
    BloomyAuth.setDefaultAddress(addressId);
    window.location.reload();
};

// =====================================================
// Settings
// =====================================================
const settingsError = document.getElementById('settings-error');
const settingsErrorMessage = document.getElementById('settings-error-message');
const settingsSuccess = document.getElementById('settings-success');
const settingsSuccessMessage = document.getElementById('settings-success-message');

function showSettingsError(message) {
    settingsErrorMessage.textContent = message;
    settingsError.style.display = 'flex';
    settingsSuccess.style.display = 'none';
}

function showSettingsSuccess(message) {
    settingsSuccessMessage.textContent = message;
    settingsSuccess.style.display = 'flex';
    settingsError.style.display = 'none';
}

// Update profile
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const result = BloomyAuth.updateProfile({
        firstName: document.getElementById('settings-firstname').value,
        lastName: document.getElementById('settings-lastname').value
    });

    if (result.success) {
        showSettingsSuccess(result.message);
        // Update UI
        userName.textContent = `${result.user.firstName} ${result.user.lastName}`;
        welcomeName.textContent = result.user.firstName;
        userAvatar.textContent = (result.user.firstName[0] + result.user.lastName[0]).toUpperCase();
    } else {
        showSettingsError(result.error);
    }
});

// Change password
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        showSettingsError('Les mots de passe ne correspondent pas.');
        return;
    }

    const result = BloomyAuth.changePassword(
        document.getElementById('current-password').value,
        newPassword
    );

    if (result.success) {
        showSettingsSuccess(result.message);
        passwordForm.reset();
    } else {
        showSettingsError(result.error);
    }
});

// =====================================================
// Delete Account
// =====================================================
document.getElementById('delete-account-btn').addEventListener('click', () => {
    deleteModal.classList.add('active');
});

document.getElementById('close-delete-modal').addEventListener('click', () => {
    deleteModal.classList.remove('active');
});

document.getElementById('cancel-delete').addEventListener('click', () => {
    deleteModal.classList.remove('active');
});

deleteModal.querySelector('.modal__overlay').addEventListener('click', () => {
    deleteModal.classList.remove('active');
});

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const result = BloomyAuth.deleteAccount(
        document.getElementById('delete-password').value
    );

    if (result.success) {
        window.location.href = 'account.html';
    } else {
        alert(result.error);
    }
});

// Initialize
init();
