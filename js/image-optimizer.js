/**
 * Image Optimization and Management System
 * Handles responsive images, lazy loading, and WebP conversion
 */

class ImageOptimizer {
    constructor() {
        this.imageMap = this.createImageMap();
        this.init();
    }

    createImageMap() {
        return {
            // Tour hero images mapping
            'salsa-tour-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/Salsa/IMG_20240309_183355743.jpg',
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/Salsa/IMG_20250815_135423093_HDR_AE.jpg'
            ],
            'market-tour-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/alamedaMarket/IMG20230308144708.jpg',
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/alamedaMarket/IMG_20231029_150247177.jpg'
            ],
            'coffee-farm-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/coffeeFarm/IMG_20241125_121016683.jpg',
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/coffeeFarm/IMG_20241125_123333766.jpg'
            ],
            'chocotour-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/chocolate/IMG_20250727_143817302_HDR_AE.jpg',
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/chocolate/IMG_20250727_145235777_HDR_AE.jpg'
            ],
            'hummingbirds-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/hummingbird/' // Will add when images are available
            ],
            'cristo-rey-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/cristoRey/' // Will add when images are available
            ],
            'waterfalls-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/pance/' // Will add when images are available
            ],
            'whale-watching-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/whales/' // Will add when images are available
            ],
            'coffee-tasting-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/coffeTasting/' // Will add when images are available
            ],
            'street-food-hero': [
                'c:/Users/crxre/Downloads/CapturasCCT/Pictures/streedFood/' // Will add when images are available
            ]
        };
    }

    init() {
        this.setupResponsiveImages();
        this.setupLazyLoading();
        this.setupErrorHandling();
        this.optimizeExistingImages();
    }

    setupResponsiveImages() {
        // Add responsive image support
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.createResponsiveImage(img);
        });
    }

    createResponsiveImage(img) {
        const src = img.dataset.src || img.src;
        const imageKey = this.extractImageKey(src);
        
        if (this.imageMap[imageKey]) {
            // Create picture element for responsive images
            const picture = document.createElement('picture');
            
            // Add WebP source
            const webpSource = document.createElement('source');
            webpSource.type = 'image/webp';
            webpSource.srcset = this.getWebPPath(src);
            picture.appendChild(webpSource);
            
            // Add original image as fallback
            const fallbackImg = img.cloneNode();
            fallbackImg.src = src;
            fallbackImg.loading = 'lazy';
            picture.appendChild(fallbackImg);
            
            // Replace original img with picture
            img.parentNode.replaceChild(picture, img);
        }
    }

    extractImageKey(src) {
        // Extract key from image path (e.g., 'salsa-tour-hero' from 'images/tours/salsa-tour-hero.jpg')
        const matches = src.match(/\/([^\/]+)-hero\./);
        return matches ? matches[1] : null;
    }

    getWebPPath(originalPath) {
        // Convert to WebP path (would need actual conversion server-side)
        return originalPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
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

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const tempImg = new Image();
            
            tempImg.onload = () => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                resolve();
            };
            
            tempImg.onerror = () => {
                img.classList.add('error');
                reject(new Error('Image failed to load'));
            };
            
            tempImg.src = img.dataset.src;
        });
    }

    setupErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);
    }

    handleImageError(img) {
        img.classList.add('image-error');
        
        // Try to reload once
        if (!img.dataset.retried) {
            img.dataset.retried = 'true';
            setTimeout(() => {
                img.src = img.src + '?retry=' + Date.now();
            }, 1000);
        } else {
            // Show placeholder if retry fails
            this.showPlaceholder(img);
        }
    }

    showPlaceholder(img) {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBFNEVFIi8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIxNS40NjQgMTIwIDIyOCAxMzIuNTM2IDIyOCAxNDhDMjI4IDE2My40NjQgMjE1LjQ2NCAxNzYgMjAwIDE3NkMxODQuNTM2IDE3NiAxNzIgMTYzLjQ2NCAxNzIgMTQ4QzE3MiAxMzIuNTM2IDE4NC41MzYgMTIwIDIwMCAxMjBaIiBmaWxsPSIjRkYxNDkzIi8+CjxwYXRoIGQ9Ik0xNjAgMTgwSDE4MFYxOTBIMTYwVjE4MFoiIGZpbGw9IiNGRjE0OTMiLz4KPHA+PHNwYW4gZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2Ij5JbWFnZSBOb3QgQXZhaWxhYmxlPC9zcGFuPjwvcD4KPHNjcmlwdD4Kd2luZG93LmNvbnNvbGUubG9nKCdJTUFHRSBFUlJPUjonLCAnaW1nLnNyYyk7Cjwvc2NyaXB0Pgo8L3N2Zz4=';
        img.alt = 'Image not available';
    }

    optimizeExistingImages() {
        // Add loading="lazy" to images that don't have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });

        // Add proper decoding
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });

        // Add fade-in effect for loaded images
        const style = document.createElement('style');
        style.textContent = `
            img {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            img.loaded {
                opacity: 1;
            }
            img.error {
                opacity: 0.5;
                filter: grayscale(100%);
            }
        `;
        document.head.appendChild(style);
    }

    // Method to update image sources with new optimized paths
    updateTourImages() {
        const tourPages = document.querySelectorAll('[class*="tour-hero--"]');
        
        tourPages.forEach(element => {
            const tourClass = Array.from(element.classList).find(cls => cls.startsWith('tour-hero--'));
            if (tourClass) {
                const tourKey = tourClass.replace('tour-hero--', '');
                const images = this.imageMap[`${tourKey}-hero`];
                
                if (images && images.length > 0) {
                    // Update background image with new optimized path
                    const optimizedPath = this.getOptimizedPath(images[0]);
                    element.style.backgroundImage = element.style.backgroundImage.replace(
                        /url\(['"]?([^'"]+)['"]?\)/,
                        `url('${optimizedPath}')`
                    );
                }
            }
        });
    }

    getOptimizedPath(originalPath) {
        // For now, return the original path
        // In production, this would return optimized/compressed versions
        return originalPath;
    }
}

// Initialize image optimizer
document.addEventListener('DOMContentLoaded', () => {
    // Defer image optimizer to prevent blocking initial render
    setTimeout(() => {
        window.imageOptimizer = new ImageOptimizer();
    }, 150);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}
