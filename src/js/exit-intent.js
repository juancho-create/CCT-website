/**
 * Exit Intent Popup for Tour Pages
 */

function initExitIntent() {
    // Only run on tour pages
    const mainTitle = document.querySelector('.tour-hero h1');
    if (!mainTitle) return;

    // Only show once per session
    if (sessionStorage.getItem('exitIntentShown')) return;

    // Create popup HTML
    const popupHTML = `
        <div class="exit-intent-overlay" id="exitIntentPopup">
            <div class="exit-intent-modal">
                <button class="exit-intent-close" id="closeExitIntent" aria-label="Close popup">&times;</button>
                <div class="exit-intent-content">
                    <h3>Not ready to book yet?</h3>
                    <p>Send Juan your dates on WhatsApp and he'll hold a spot for you. No commitment needed.</p>
                    <a href="https://wa.me/573162543554?text=Hi%20Juan!%20I%27m%20interested%20in%20a%20tour%20but%20not%20ready%20to%20book%20yet." 
                       target="_blank" rel="noopener" class="btn btn-wa mt-20" id="exitIntentBtn">
                        Message Juan <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
    const popup = document.getElementById('exitIntentPopup');
    const closeBtn = document.getElementById('closeExitIntent');
    const waBtn = document.getElementById('exitIntentBtn');

    function showPopup() {
        if (sessionStorage.getItem('exitIntentShown')) return;

        // Don't show if they already clicked WhatsApp in a previous session
        if (localStorage.getItem('waClicked')) return;

        popup.classList.add('visible');
        sessionStorage.setItem('exitIntentShown', 'true');
    }

    // Close logic
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('visible');
    });

    waBtn.addEventListener('click', () => {
        popup.classList.remove('visible');
        // Prevent showing again even if session clears
        localStorage.setItem('waClicked', 'true');
    });

    // Also track other WhatsApp links on the page
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('waClicked', 'true');
        });
    });

    // Handle ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('visible')) {
            popup.classList.remove('visible');
        }
    });

    // Mobile specific: show after 40 seconds
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
        setTimeout(showPopup, 40000);
    } else {
        // Desktop specific: mouse leave towards top
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                showPopup();
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExitIntent);
} else {
    initExitIntent();
}
