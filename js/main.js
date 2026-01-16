/**
 * Bloomy E-commerce - Main JavaScript
 * Premium interactions and cart functionality
 */

// =====================================================
// DOM Elements
// =====================================================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartFooter = document.getElementById('cart-footer');
const cartTotal = document.getElementById('cart-total');
const addToCartBtn = document.getElementById('add-to-cart');
const colorButtons = document.querySelectorAll('.cta__color');
const toast = document.getElementById('toast');

// =====================================================
// State
// =====================================================
let cart = JSON.parse(localStorage.getItem('bloomy_cart')) || [];
let selectedColor = 'white';

const colorNames = {
    black: 'Noir',
    white: 'Blanc',
    blue: 'Bleu Nuit'
};

const PRODUCT = {
    id: 'bloomy-smart-case',
    name: 'Bloomy Smart Case',
    price: 16.99,
    currency: '€'
};

// =====================================================
// Header Scroll Effect
// =====================================================
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll(); // Initial check

// =====================================================
// Mobile Menu
// =====================================================
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// =====================================================
// Cart Sidebar
// =====================================================
function openCart() {
    cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);

// Close cart when clicking overlay
cartSidebar.querySelector('.cart-sidebar__overlay').addEventListener('click', closeCart);

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
        closeCart();
    }
});

// =====================================================
// Cart Functions
// =====================================================
function saveCart() {
    localStorage.setItem('bloomy_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-sidebar__empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            const imageSrc = item.image || (item.color === 'black' ? 'images/hero-product-black.png' : 'images/hero-product.png');
            return `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item__image">
                    <img src="${imageSrc}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-md);">
                </div>
                <div class="cart-item__info">
                    <div class="cart-item__name">${item.name}</div>
                    <div class="cart-item__color">${colorNames[item.color] || item.color} - Qté: ${item.quantity}</div>
                    <div class="cart-item__bottom">
                        <span class="cart-item__price">${item.price}${PRODUCT.currency}</span>
                        <button class="cart-item__remove" onclick="removeFromCart(${index})">Supprimer</button>
                    </div>
                </div>
            </div>
        `}).join('');

        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total}${PRODUCT.currency}`;
        cartFooter.style.display = 'block';
    }
}

function addToCart(color) {
    // Check if item with same color already exists
    const existingIndex = cart.findIndex(item => item.color === color);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: PRODUCT.id,
            name: PRODUCT.name,
            price: PRODUCT.price,
            color: color,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast();
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

// Make removeFromCart available globally
window.removeFromCart = removeFromCart;

// =====================================================
// Color Selection
// =====================================================
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.dataset.color;
    });
});

// =====================================================
// Add to Cart Button
// =====================================================
addToCartBtn.addEventListener('click', () => {
    addToCart(selectedColor);
});

// =====================================================
// Toast Notification
// =====================================================
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =====================================================
// Smooth Scroll for Anchor Links
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// Intersection Observer for Animations
// =====================================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .feature-card, .specs__card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// =====================================================
// Initialize
// =====================================================
function init() {
    // Fix existing cart prices to new price
    cart = cart.map(item => {
        if (item.id === PRODUCT.id) {
            item.price = PRODUCT.price;
        }
        return item;
    });
    saveCart();

    updateCartUI();

    // Add staggered animation delay to grid items
    document.querySelectorAll('.feature-full__grid .feature-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.specs__grid .specs__card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.reviews__grid .review-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
}

// Run initialization
document.addEventListener('DOMContentLoaded', init);

// =====================================================
// Console Welcome Message
// =====================================================
console.log('%c🎧 Bloomy Smart Case', 'font-size: 24px; font-weight: bold; color: #7c3aed;');
console.log('%cL\'innovation à portée d\'oreille.', 'font-size: 14px; color: #a0a0a0;');
