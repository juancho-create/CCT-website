/**
 * Sticky Mobile CTA for Tour Pages
 */

function initTourStickyCTA() {
    // Only elements with specific tour page markers should run this
    const bookingCard = document.querySelector('.booking-card');
    const mainTitle = document.querySelector('.tour-hero h1');
    const priceValue = document.querySelector('.price-value');

    if (!bookingCard || !mainTitle || !priceValue) return;

    // Create the CTA element
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'tour-sticky-cta';
    stickyCTA.innerHTML = `
        <div class="sticky-cta-content">
            <div class="sticky-cta-text">
                <span class="sticky-cta-title">${mainTitle.textContent}</span>
                <span class="sticky-cta-price">${priceValue.textContent}</span>
            </div>
            <a href="https://wa.me/573162543554" target="_blank" rel="noopener" class="btn btn-pink btn-sm sticky-cta-btn">
                <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </a>
        </div>
    `;

    document.body.appendChild(stickyCTA);

    // Intersection Observer to show/hide sticky CTA
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When booking card is out of view (scrolled past), show sticky CTA
            // We only care if we are on mobile, which is handled via CSS Media Query targeting the stickyCTA visibility
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
        });
    }, { threshold: 0 });

    observer.observe(bookingCard);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTourStickyCTA);
} else {
    initTourStickyCTA();
}
