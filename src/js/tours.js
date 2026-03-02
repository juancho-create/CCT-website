/**
 * Tour filtering logic for Cali Cultural Tours
 */

const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');
const filterCounter = document.querySelector('.filter-counter');
const toursGrid = document.getElementById('tours-grid');

// Create no-results message element
const noResultsMsg = document.createElement('div');
noResultsMsg.className = 'no-results';
noResultsMsg.innerHTML = `
  <i class="fas fa-search"></i>
  <h3>No tours found</h3>
  <p>Try selecting a different category to see more tours.</p>
  <button onclick="resetFilters()" class="btn btn-pink btn-sm mt-20">Show All Tours</button>
`;

// Reset filters function
window.resetFilters = function () {
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
};

// Function to apply filter
function applyFilter(filter) {
    let visibleCount = 0;

    // Update active button
    const currentFilterBtns = document.querySelectorAll('.filter-btn');
    currentFilterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter cards with smooth transition
    const currentTourCards = document.querySelectorAll('.tour-card');
    currentTourCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            // Force reflow to ensure transition works, but avoid jumping
            card.offsetWidth;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.98)';
            setTimeout(() => {
                // Ensure it wasn't re-shown in the meantime
                if (card.style.opacity === '0') {
                    card.style.display = 'none';
                }
            }, 400);
        }
    });

    // Update counter
    const countSpan = document.getElementById('tour-count');
    if (countSpan) {
        countSpan.textContent = visibleCount;
    }

    // Show/hide no-results message
    if (visibleCount === 0) {
        if (toursGrid) toursGrid.appendChild(noResultsMsg);
    } else {
        if (toursGrid && toursGrid.contains(noResultsMsg)) {
            toursGrid.removeChild(noResultsMsg);
        }
    }

    // Announce filter change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `Showing ${visibleCount} ${filter === 'all' ? 'tours' : filter + ' tours'}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

function initializeTours() {
    // Re-query elements just in case they weren't ready
    const currentFilterBtns = document.querySelectorAll('.filter-btn');
    const currentTourCards = document.querySelectorAll('.tour-card');

    if (currentFilterBtns.length > 0 && currentTourCards.length > 0) {
        // Initialize - show all tours on load
        applyFilter('all');

        currentFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                applyFilter(btn.dataset.filter);
            });
        });

        // Add keyboard navigation for filter buttons
        currentFilterBtns.forEach((btn, index) => {
            btn.setAttribute('tabindex', '0');

            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowRight'
                        ? (index + 1) % currentFilterBtns.length
                        : (index - 1 + currentFilterBtns.length) % currentFilterBtns.length;
                    currentFilterBtns[nextIndex].focus();
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTours);
} else {
    initializeTours();
}
