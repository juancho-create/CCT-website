/**
 * Tour filtering logic for Cali Cultural Tours
 */

const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');
const filterCounter = document.getElementById('filter-counter');
const toursGrid = document.getElementById('tours-grid');

// Create no-results message element
const noResultsMsg = document.createElement('div');
noResultsMsg.className = 'no-results';
noResultsMsg.innerHTML = `
  <i class="fas fa-search"></i>
  <h3>No tours found</h3>
  <p>Try selecting a different category to see more tours.</p>
  <button onclick="resetFilters()">Show All Tours</button>
`;

// Reset filters function
window.resetFilters = function() {
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.click();
};

if (filterBtns.length > 0 && tourCards.length > 0) {
    // Initialize counter visibility
    if (filterCounter) {
        filterCounter.classList.add('visible');
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            // Filter cards with smooth transition
            tourCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                    // Trigger reflow for smooth transition
                    card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(-20px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });

            // Update counter
            if (filterCounter) {
                const categoryName = filter === 'all' ? 'tours' : filter + ' tours';
                filterCounter.innerHTML = `Showing <strong>${visibleCount}</strong> ${categoryName}`;
            }

            // Show/hide no-results message
            if (visibleCount === 0) {
                toursGrid.appendChild(noResultsMsg);
            } else {
                if (toursGrid.contains(noResultsMsg)) {
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
        });
    });

    // Add keyboard navigation for filter buttons
    filterBtns.forEach((btn, index) => {
        btn.setAttribute('tabindex', '0');
        
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowRight' 
                    ? (index + 1) % filterBtns.length 
                    : (index - 1 + filterBtns.length) % filterBtns.length;
                filterBtns[nextIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}
