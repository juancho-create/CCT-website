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

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-item, .tour-card, .quick-nav-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for grid items
    const grids = document.querySelectorAll('.tours-grid, .quick-nav, .blog-grid, .info-grid, .activities-grid');
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Mobile menu toggle (already handled in template-engine, but as fallback)
    const setupMobileMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');

        if (hamburger && mobileMenu) {
            hamburger.onclick = () => {
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
            };
        }

        if (closeMenu && mobileMenu) {
            closeMenu.onclick = () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            };
        }
    };

    // Parallax effect for hero sections
    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.hero-content, .tours-hero .container, .page-header .container').forEach(el => {
            const speed = 0.4;
            el.style.transform = `translateY(${scrolled * speed}px)`;
            el.style.opacity = 1 - (scrolled / 500);
        });
    };

    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }

    console.log('CCT Modern Animations Engine Initialized');
});
