
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
  import('../css/animations.css');
}, 100);

// Prevent FOUC
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('loaded');
});

// Overflow checker
setTimeout(() => {
  const docWidth = document.documentElement.offsetWidth;
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > docWidth) {
      console.log('Overflowing:', el.tagName, el.className, el.id, 'offsetWidth:', el.offsetWidth, 'docWidth:', docWidth);
      el.style.border = '5px solid red';
    }
  });
}, 2000);

// Animation Failsafe
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('[data-animate], .animate-hidden, .fade-in, .slide-up, .reveal, .reveal-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  }, 2500);
});
