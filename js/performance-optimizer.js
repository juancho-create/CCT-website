/**
 * Performance Optimization System for CCT Website
 * Handles lazy loading, resource optimization, and performance monitoring
 */

class PerformanceOptimizer {
    constructor() {
        this.criticalImages = [
            'images/home-hero.jpg',
            'images/logo.jpg',
            'images/tours/salsa-tour-hero.jpg',
            'images/tours/market-tour-hero.jpg',
            'images/tours/coffee-farm-hero.jpg',
            'images/tours/chocotour-hero.jpg'
        ];
        
        this.init();
    }

    init() {
        this.preloadCriticalResources();
        this.setupResourceHints();
        this.optimizeFontLoading();
        this.setupPerformanceMonitoring();
        this.optimizeImages();
        this.setupServiceWorker();
    }

    preloadCriticalResources() {
        // Preload critical images
        this.criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Preload critical CSS
        const criticalCSS = [
            'css/variables.css',
            'css/base.css',
            'css/components.css',
            'css/animations.css'
        ];

        criticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    setupResourceHints() {
        // DNS prefetch for external domains
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com',
            'https://wa.me'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Preconnect for fonts
        const preconnectDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    optimizeFontLoading() {
        // Create font display swap
        const fontDisplayCSS = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
            }
            @font-face {
                font-family: 'Playfair Display';
                font-display: swap;
            }
        `;

        const style = document.createElement('style');
        style.textContent = fontDisplayCSS;
        document.head.appendChild(style);

        // Load fonts asynchronously
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontLink.media = 'print';
        fontLink.onload = function() {
            this.media = 'all';
        };
        document.head.appendChild(fontLink);
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                
                // Send to analytics if needed
                if (lastEntry.startTime > 2500) {
                    console.warn('LCP is slow, consider optimizing hero images');
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                });
                console.log('CLS:', clsScore);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Page load timing
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                const domTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                
                console.log(`Page Load: ${loadTime}ms, DOM Ready: ${domTime}ms`);
                
                // Show performance badge in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    this.showPerformanceBadge(loadTime);
                }
            }, 0);
        });
    }

    showPerformanceBadge(loadTime) {
        const badge = document.createElement('div');
        badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: ${loadTime < 2000 ? '#4CAF50' : loadTime < 3000 ? '#FF9800' : '#F44336'};
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 10000;
            font-family: monospace;
        `;
        badge.textContent = `${loadTime}ms`;
        document.body.appendChild(badge);

        setTimeout(() => badge.remove(), 5000);
    }

    optimizeImages() {
        // Add loading="lazy" to all images that don't have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });

        // Add decoding="async" for better performance
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });

        // Add fade-in animation for images
        const imageStyle = document.createElement('style');
        imageStyle.textContent = `
            img {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            img.loaded {
                opacity: 1;
            }
            img.error {
                opacity: 0.7;
                filter: grayscale(100%);
            }
        `;
        document.head.appendChild(imageStyle);

        // Monitor image loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.onload = () => img.classList.add('loaded');
                    img.onerror = () => img.classList.add('error');
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupServiceWorker() {
        // Register service worker for caching (if available)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }

    // Optimize critical rendering path
    optimizeCriticalRenderingPath() {
        // Inline critical CSS for above-the-fold content
        const criticalCSS = `
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                margin: 0;
                padding: 0;
            }
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #FF1493;
                z-index: 1000;
            }
            .hero {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(255, 20, 147, 0.85), rgba(139, 0, 70, 0.95));
            }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}
