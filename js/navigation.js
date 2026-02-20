/**
 * Navigation and UI effects for Cali Cultural Tours
 */

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
let navOverlay = document.getElementById('navOverlay');

if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.id = 'navOverlay';
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
}

if (hamburger && mobileMenu && closeMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        navOverlay?.classList.add('show');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navOverlay?.classList.remove('show');
    });

    navOverlay?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navOverlay.classList.remove('show');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            navOverlay?.classList.remove('show');
        }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            navOverlay?.classList.remove('show');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
