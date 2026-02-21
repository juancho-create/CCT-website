/**
 * Unified Animation System for Cali Cultural Tours
 * Consolidates all animation functionality with performance optimizations
 */

class CCTAnimations {
    constructor() {
        this.observers = new Map();
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.setupRevealAnimations();
        this.setupScrollEffects();
        this.setupButtonAnimations();
        this.setupTourCardAnimations();
        this.setupNavigationEffects();
        this.setupParallaxEffects();
        this.isInitialized = true;
        console.log('CCT Animation System Initialized');
    }

    setupRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active', 'animate-in');
                    
                    // Stagger animation for grid items
                    if (entry.target.classList.contains('tour-card') || 
                        entry.target.classList.contains('quick-nav-card') ||
                        entry.target.classList.contains('blog-card')) {
                        
                        const grid = entry.target.closest('.tours-grid, .quick-nav, .blog-grid');
                        if (grid) {
                            const items = Array.from(grid.children);
                            const index = items.indexOf(entry.target);
                            entry.target.style.transitionDelay = `${index * 0.1}s`;
                        }
                    }
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal, .tour-card, .quick-nav-card, .blog-card, .activity-card');
        revealElements.forEach(el => revealObserver.observe(el));
        
        this.observers.set('reveal', revealObserver);
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollEffects = () => {
            const currentScrollY = window.scrollY;
            
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // Scroll arrow visibility
            const scrollArrow = document.querySelector('.scroll-arrow');
            if (scrollArrow) {
                if (currentScrollY > 200) {
                    scrollArrow.style.opacity = '0';
                    scrollArrow.style.pointerEvents = 'none';
                } else {
                    scrollArrow.style.opacity = '1';
                    scrollArrow.style.pointerEvents = 'auto';
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupButtonAnimations() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });

            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupTourCardAnimations() {
        document.querySelectorAll('.tour-card').forEach(card => {
            const img = card.querySelector('.tour-card-img img');
            
            card.addEventListener('mouseenter', () => {
                if (img) {
                    img.style.transform = 'scale(1.08)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });

            // Add subtle lift animation on hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    setupNavigationEffects() {
        // Mobile menu animations
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
                
                // Animate menu items
                const menuItems = mobileMenu.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.4s ease ${index * 0.1}s both`;
                });
            });
        }

        if (closeMenu && mobileMenu) {
            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll arrow functionality
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            scrollArrow.addEventListener('click', () => {
                const quickNav = document.querySelector('.quick-nav');
                if (quickNav) {
                    quickNav.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    setupParallaxEffects() {
        if (window.innerWidth <= 768) return; // Disable on mobile

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero content
            document.querySelectorAll('.hero-content, .tours-hero .container, .page-header .container').forEach(el => {
                const speed = 0.4;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
                el.style.opacity = 1 - (scrolled / 800);
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Utility method to animate elements manually
    animateElement(element, animation = 'fadeIn') {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            element.classList.add('animate-in', 'active');
            element.style.animation = `${animation} 0.6s ease both`;
        }
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.isInitialized = false;
    }
}

// Add CSS for button ripple effect
const rippleStyles = `
.btn {
    position: relative;
    overflow: hidden;
}

.btn-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Initialize animation system
window.cctAnimations = new CCTAnimations();

// Make it globally accessible
window.CCTAnimations = CCTAnimations;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CCTAnimations;
}
