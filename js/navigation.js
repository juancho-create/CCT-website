/**
 * Navigation and UI effects for Cali Cultural Tours
 */

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (hamburger && mobileMenu && closeMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
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
