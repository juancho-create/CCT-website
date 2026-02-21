import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Modern animations and interactions for CCT Website
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // GSAP Reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-item');
    revealElements.forEach(el => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
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
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
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

    console.log('CCT Modern Animations Engine Initialized');
});
