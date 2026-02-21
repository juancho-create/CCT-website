// Modern animations and interactions for CCT Website
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const quickNav = document.querySelector('.quick-nav');
            if (quickNav) {
                quickNav.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu on link click
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tour-card, .quick-nav-card, .filter-btn');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stagger animation for tour cards
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger animation for quick nav cards
    const quickNavCards = document.querySelectorAll('.quick-nav-card');
    quickNavCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
    });

    // Filter functionality for tours
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards2 = document.querySelectorAll('.tour-card');
    const filterCounter = document.getElementById('filter-counter');

    if (filterBtns.length > 0 && tourCards2.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.dataset.filter;
                let visibleCount = 0;

                tourCards2.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                        visibleCount++;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                // Update counter
                if (filterCounter) {
                    filterCounter.innerHTML = `Showing <strong>${visibleCount}</strong> tours`;
                }
            });
        });
    }

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-wa')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // WhatsApp button pulse animation
    const waBtn = document.querySelector('.btn-wa');
    if (waBtn) {
        setInterval(() => {
            waBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                waBtn.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Add parallax effect to hero sections
    const heroSections = document.querySelectorAll('.hero, .tours-hero');
    heroSections.forEach(hero => {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content, .tours-hero > *');
            if (parallax) {
                const speed = 0.5;
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    console.log('CCT Website Modern Animations Loaded');
});
