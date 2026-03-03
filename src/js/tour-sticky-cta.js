/**
 * Sticky Mobile CTA for Tour Pages
 */
function initTourStickyCTA() {
    // 1. Find the main WhatsApp booking button on the page
    const mainBtn = document.querySelector('.booking-widget .btn-pink, .booking-card .btn-pink, [href*="wa.me"].btn-pink');

    // 2. Find the main title
    const mainTitle = document.querySelector('h1');

    if (!mainBtn || !mainTitle) return;

    // 3. Find the price
    let priceValueText = '';
    const priceEl = document.querySelector('.price-value, .booking-widget span[style*="font-size: 32px"]');
    if (priceEl) {
        priceValueText = priceEl.textContent.trim();
    } else {
        // Fallback
        const genericPrice = document.querySelector('.booking-widget span, .tour-card-price');
        if (genericPrice) priceValueText = genericPrice.textContent.trim();
    }

    // Create the CTA element
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'tour-sticky-cta-mobile';
    stickyCTA.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 15px; height: 100%;">
            <div style="display: flex; flex-direction: column; justify-content: center; overflow: hidden; white-space: nowrap; padding-right: 10px;">
                <span style="font-weight: 700; font-size: 15px; text-overflow: ellipsis; overflow: hidden; line-height: 1.2;">${mainTitle.textContent}</span>
                <span style="font-size: 13px; opacity: 0.9; line-height: 1.2;">${priceValueText}</span>
            </div>
            <a href="https://wa.me/573162543554" target="_blank" rel="noopener" style="background: #FF0055; color: white; border: none; padding: 0 20px; height: 40px; font-weight: 700; font-size: 14px; text-decoration: none; white-space: nowrap; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex-shrink: 0;">
                Book via WhatsApp
            </a>
        </div>
    `;

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .tour-sticky-cta-mobile {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 64px;
            background: #0F0A0A;
            color: white;
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: none;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        }
        .tour-sticky-cta-mobile.visible {
            transform: translateY(0);
        }
        @media (max-width: 768px) {
            .tour-sticky-cta-mobile {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(stickyCTA);

    // Intersection Observer to show/hide sticky CTA based on main CTA button leaving viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the original button goes out of view ABOVE the viewport
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
        });
    }, { threshold: 0 });

    observer.observe(mainBtn);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTourStickyCTA);
} else {
    initTourStickyCTA();
}
