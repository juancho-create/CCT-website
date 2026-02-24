/**
 * Carousel Component for Cali Cultural Tours
 * Handles multiple carousels per page with touch/swipe support
 */

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = element.querySelector('.carousel-button--next');
        this.prevButton = element.querySelector('.carousel-button--prev');
        this.dotsNav = element.querySelector('.carousel-nav');
        this.dots = Array.from(this.dotsNav.children);

        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Arrange slides next to each other
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });

        // Event listeners
        this.nextButton.addEventListener('click', () => {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.moveToSlide(nextIndex);
        });

        this.prevButton.addEventListener('click', () => {
            const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.moveToSlide(prevIndex);
        });

        this.dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const targetIndex = this.dots.findIndex(dot => dot === targetDot);
            if (targetIndex === -1) return;
            this.moveToSlide(targetIndex);
        });

        // Touch support
        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        this.track.addEventListener('touchend', e => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextButton.click();
                } else {
                    this.prevButton.click();
                }
            }
            isDragging = false;
        }, { passive: true });

        // Auto-play (optional, enabled by default)
        this.startAutoPlay();

        // Pause auto-play on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Handle resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.slideWidth = this.slides[0].getBoundingClientRect().width;
                this.slides.forEach((slide, index) => {
                    slide.style.left = this.slideWidth * index + 'px';
                });
                this.moveToSlide(this.currentIndex);
            }, 100);
        });
    }

    moveToSlide(targetIndex) {
        this.track.style.transform = 'translateX(-' + this.slideWidth * targetIndex + 'px)';

        // Update dots
        this.dots[this.currentIndex].classList.remove('active');
        this.dots[targetIndex].classList.add('active');

        this.currentIndex = targetIndex;
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            this.nextButton.click();
        }, 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayTimer);
    }
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});
