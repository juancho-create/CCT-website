/**
 * Tour filtering logic for Cali Cultural Tours
 */

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    const countSpan = document.getElementById('tour-count');
    const toursGrid = document.getElementById('tours-grid');

    if (!filterBtns.length || !tourCards.length) return;

    // Reset filters exposed globally (for the "Show All Tours" button in no-results)
    window.resetFilters = function () {
        applyFilter('all');
    };

    function applyFilter(filter) {
        let visibleCount = 0;

        // Update active button classes
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter cards
        tourCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;
            if (matches) {
                card.style.display = 'flex';
                // Trigger reflow
                void card.offsetWidth;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.98)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 400);
            }
        });

        // Update counter text correctly
        if (countSpan) {
            countSpan.textContent = visibleCount;
        }

        // Manage no results message
        let emptyMsg = toursGrid.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'no-results';
                emptyMsg.innerHTML = `
                  <i class="fas fa-search" style="font-size: 2rem; color: var(--gray-medium); margin-bottom: 10px;"></i>
                  <h3 style="margin-bottom: 5px;">No tours found</h3>
                  <p>Try selecting a different category to see more tours.</p>
                  <button onclick="window.resetFilters()" class="btn btn-pink btn-sm" style="margin-top: 20px;">Show All Tours</button>
                `;
                emptyMsg.style.textAlign = 'center';
                emptyMsg.style.padding = '40px 20px';
                emptyMsg.style.gridColumn = '1 / -1';
                toursGrid.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    }

    // Attach event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            applyFilter(e.target.dataset.filter);
        });

        // Add keyboard navigation
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                applyFilter(e.target.dataset.filter);
            }
        });
    });

    // Initialize - show all tours on load
    applyFilter('all');
}

// Ensure execution happens after DOM is fully parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilters);
} else {
    initFilters();
}
