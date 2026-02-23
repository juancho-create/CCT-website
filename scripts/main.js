import './css/variables.css';
import './css/base.css';
import './css/critical.css';
import './css/components.css';
import './css/pages.css';

// Loading indicator management
const pageLoader = document.getElementById('pageLoader');
if (pageLoader) {
  // Hide loader when page is ready
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        pageLoader.remove();
      }, 300);
    }, 500);
  });

  // Fallback: hide loader after maximum wait time
  setTimeout(() => {
    if (pageLoader && !pageLoader.classList.contains('hidden')) {
      pageLoader.classList.add('hidden');
      setTimeout(() => {
        pageLoader.remove();
      }, 300);
    }
  }, 3000);
}

// Defer animations CSS to prevent blocking initial render
setTimeout(() => {
    import('./css/animations.css');
}, 100);
