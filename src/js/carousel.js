/**
 * Carousel Component for Cali Cultural Tours
 * Premium agency-level carousel with smooth animations
 */

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = element.querySelector('.carousel-button--next');
        this.prevButton = element.querySelector('.carousel-button--prev');
        this.dotsNav = element.querySelector('.carousel-nav');
        this.dots = Array.from(this.dotsNav?.children || []);

        this.currentIndex = 0;
        this.slideWidth = 0;
        this.autoPlayTimer = null;
        this.progressTimer = null;
        this.isHovering = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        // Create progress bar if not exists
        this.progressBar = element.querySelector('.carousel-progress');
        if (!this.progressBar) {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'carousel-progress';
            this.progressBar.style.width = '0%';
            element.appendChild(this.progressBar);
        }

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Initialize first slide as active
        this.updateSlideClasses();
        
        // Calculate dimensions
        this.updateDimensions();
        
        // Event listeners
        this.bindEvents();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Handle resize
        window.addEventListener('resize', this.debounce(() => {
            this.updateDimensions();
            this.moveToSlide(this.currentIndex, false);
        }, 250));
    }

    updateDimensions() {
        this.slideWidth = this.carousel.getBoundingClientRect().width;
    }

    updateSlideClasses() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
    }

    moveToSlide(targetIndex, animate = true) {
        // Handle wrapping
        if (targetIndex < 0) targetIndex = this.slides.length - 1;
        if (targetIndex >= this.slides.length) targetIndex = 0;

        // Update track position
        if (animate) {
            this.track.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            this.track.style.transition = 'none';
        }
        this.track.style.transform = `translateX(-${this.slideWidth * targetIndex}px)`;

        // Update active states
        this.slides[this.currentIndex].classList.remove('active');
        this.slides[targetIndex].classList.add('active');

        // Update dots
        if (this.dots.length > 0) {
            this.dots[this.currentIndex]?.classList.remove('active');
            this.dots[targetIndex]?.classList.add('active');
        }

        this.currentIndex = targetIndex;
        
        // Reset autoplay progress
        this.resetProgress();
    }

    bindEvents() {
        // Button navigation
        this.nextButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.moveToSlide(this.currentIndex + 1);
            this.restartAutoPlay();
        });

        this.prevButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.moveToSlide(this.currentIndex - 1);
            this.restartAutoPlay();
        });

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.moveToSlide(index);
                this.restartAutoPlay();
            });
        });

        // Touch/Swipe support
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.stopAutoPlay();
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
            this.startAutoPlay();
        }, { passive: true });

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.isHovering = true;
            this.stopAutoPlay();
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.startAutoPlay();
        });

        // Keyboard navigation
        this.carousel.setAttribute('tabindex', '0');
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.moveToSlide(this.currentIndex - 1);
                this.restartAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.moveToSlide(this.currentIndex + 1);
                this.restartAutoPlay();
            }
        });

        // Focus visible indicator
        this.carousel.addEventListener('focus', () => {
            this.carousel.style.outline = '2px solid var(--pink)';
            this.carousel.style.outlineOffset = '4px';
        });

        this.carousel.addEventListener('blur', () => {
            this.carousel.style.outline = 'none';
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next
                this.moveToSlide(this.currentIndex + 1);
            } else {
                // Swiped right - go to previous
                this.moveToSlide(this.currentIndex - 1);
            }
        }
    }

    startAutoPlay() {
        if (this.isHovering || this.slides.length <= 1) return;
        
        this.autoPlayTimer = setInterval(() => {
            this.moveToSlide(this.currentIndex + 1);
        }, 5000);

        this.startProgress();
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayTimer);
        clearInterval(this.progressTimer);
        this.progressBar.style.width = '0%';
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        if (!this.isHovering) {
            this.startAutoPlay();
        }
    }

    startProgress() {
        let progress = 0;
        const interval = 50; // Update every 50ms
        const totalTime = 5000;
        const increment = (interval / totalTime) * 100;

        this.progressTimer = setInterval(() => {
            progress += increment;
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                progress = 0;
            }
        }, interval);
    }

    resetProgress() {
        this.progressBar.style.width = '0%';
        if (this.autoPlayTimer) {
            this.startProgress();
        }
    }

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
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach((carousel, index) => {
        // Add unique ID if not present
        if (!carousel.id) {
            carousel.id = `carousel-${index}`;
        }
        new Carousel(carousel);
    });
});
