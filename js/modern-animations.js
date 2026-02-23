import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Modern animations and interactions for CCT Website
// Defer animations to prevent blocking initial render
document.addEventListener('DOMContentLoaded', function () {
    // Defer non-critical animations
    setTimeout(() => {
        initializeAnimations();
    }, 200);
});

function initializeAnimations() {
    // Navbar scroll effect (Premium Solid -> Blur)
    const navbar = document.querySelector('.navbar');
    // Inject unbreakable CSS styles immediately
    const themeFixes = document.createElement('style');
    themeFixes.innerHTML = `
        .navbar.scrolled {
            background-color: var(--pink) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            backdrop-filter: blur(16px) !important;
            box-shadow: 0 2px 20px rgba(233, 30, 140, 0.15) !important;
        }
        .tours-body, .tours-body .container, .tours-grid-container {
            background-color: var(--fondo-oscuro) !important;
        }
        main, body {
            background-color: var(--fondo-negro) !important;
            color: var(--texto-claro) !important;
        }
    `;
    document.head.appendChild(themeFixes);

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) { // Changed to 80px per Error 1
                navbar.classList.add('scrolled');
                navbar.style.setProperty('background-color', 'var(--pink)', 'important');
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.setProperty('background-color', 'var(--pink)', 'important');
            }
        });

        // Initial check on load
        if (window.scrollY <= 80) {
            navbar.style.setProperty('background-color', 'var(--pink)', 'important');
        }
    }

    // GSAP Reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-item');
    revealElements.forEach(el => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.4)', // Spring bounce ease
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Stagger animation for grid items
    const grids = document.querySelectorAll('.tours-grid, .quick-nav, .blog-grid, .info-grid, .activities-grid');
    grids.forEach(grid => {
        const items = Array.from(grid.children);
        gsap.fromTo(items,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(1.4)', // Spring bounce ease
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%'
                }
            }
        );
    });

    // Mobile menu toggle
    const setupMobileMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');

        if (hamburger && mobileMenu) {
            hamburger.onclick = () => {
                const isOpen = mobileMenu.classList.contains('open');
                if (isOpen) {
                    mobileMenu.classList.remove('open');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('open');
                    hamburger.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            };
        }

        // Close menu logic (also tied to links)
        const closeAction = () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeMenu && mobileMenu) {
            closeMenu.onclick = closeAction;
        }

        // Close when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeAction);
        });
    };

    setupMobileMenu();

    // Parallax effect for hero sections
    if (window.innerWidth > 768) {
        document.querySelectorAll('.hero-content, .tours-hero .container, .page-header .container').forEach(el => {
            gsap.to(el, {
                y: () => window.innerHeight * 0.3,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section') || el.closest('header'),
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    // Fade out scroll indicator on scroll down
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            y: 20,
            scrollTrigger: {
                trigger: 'body',
                start: 'top -50px',
                end: 'top -150px',
                scrub: true
            }
        });
    }

    // MAKE FULL TOUR CARDS CLICKABLE (Error 2 Fix)
    const cards = document.querySelectorAll('.tour-card, .quick-card');

    cards.forEach(card => {
        // Find the primary link button inside the card
        const link = card.querySelector('a.btn-pink, a.btn-outline-pink, a');
        if (!link) return;

        const destination = link.getAttribute('href');

        // Add accessibility attributes
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        // Click event
        card.addEventListener('click', (e) => {
            // Prevent double firing if they actually clicked the button itself
            if (e.target.closest('button, a, input') && e.target !== card) {
                return;
            }
            if (destination) {
                window.location.href = destination;
            } else {
                link.click();
            }
        });

        // Keyboard event for accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    console.log('CCT Modern Animations Engine Initialized');
}
