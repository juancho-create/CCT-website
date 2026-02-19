/**
 * SPA Router for Cali Cultural Tours
 * Handles hash-based navigation and SEO metadata updates.
 */

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a[data-page], .mobile-menu a[data-page]');
const quickNavCards = document.querySelectorAll('.quick-nav-card[data-page]');

const pageMeta = {
  'home': { title: 'Cali Cultural Tours | Your Guide to Cali Colombia', desc: 'Food tours, salsa, hummingbirds, whale watching, coffee farms and more in Cali, Colombia.' },
  'tours': { title: 'Tours in Cali Colombia | Cali Cultural Tours', desc: 'Browse all tours in Cali — food, cultural, and nature tours with licensed guide Juan Camilo.' },
  'street-food': { title: 'Street Food Tour Cali | Cali Cultural Tours', desc: '2-hour walking tour through Cali\'s street food scene. 95,000 COP per person.' },
  'market-tour': { title: 'Galería Alameda Market Tour Cali | Cali Cultural Tours', desc: 'Exotic fruit tasting, cheeses, flowers, and witchcraft zone. 95,000 COP per person.' },
  'coffee-tasting': { title: 'Coffee Tasting Cali Colombia | Cali Cultural Tours', desc: 'Guided Colombian coffee tasting with a professional barista. 120,000 COP per person.' },
  'coffee-farm': { title: 'Coffee Farm Tour Sevilla | Cali Cultural Tours', desc: 'Full-day trip to a coffee plantation in Sevilla, Valle del Cauca. From 929,900 COP.' },
  'chocotour': { title: 'Chocolate Tour Cali Colombia | Cali Cultural Tours', desc: 'Make your own chocolate bar on a cacao farm 1.5 hours from Cali. From 680,000 COP.' },
  'salsa-tour': { title: 'Salsa Tour Cali Colombia | Cali Cultural Tours', desc: '5-hour salsa tour: museums, vinyl shop, snacks, and 2-hour dance class. From 259,900 COP.' },
  'cristo-rey': { title: 'Cristo Rey City Tour Cali | Cali Cultural Tours', desc: '4-hour city tour: Cristo Rey viewpoint, San Antonio, monuments. From 359,000 COP.' },
  'waterfalls': { title: 'Pance Waterfall Tour Cali | Cali Cultural Tours', desc: 'Swim in Chorrera del Indio waterfalls near Cali. From 306,900 COP.' },
  'hummingbirds': { title: 'Hummingbird Paradise Tour Cali | Cali Cultural Tours', desc: 'See dozens of hummingbirds in the cloud forest near Cali. From 329,900 COP.' },
  'whale-watching': { title: 'Whale Watching Bahía Málaga from Cali | Cali Cultural Tours', desc: 'Seasonal July–October. Humpback whale watching on Colombia\'s Pacific coast. From 1,660,200 COP.' },
  'safety': { title: 'Safety in Cali Colombia | Cali Cultural Tours', desc: 'Practical safety guide for tourists visiting Cali, Colombia.' },
  'local-info': { title: 'Local Info Cali Colombia | Cali Cultural Tours', desc: 'Everything you need to know before visiting Cali, Colombia.' },
  'map': { title: 'Cali Recommendations Map | Cali Cultural Tours', desc: 'Interactive map of the best places in Cali — curated by a local guide.' },
  'activities': { title: 'Daily Activities in Cali | Cali Cultural Tours', desc: 'Things to do in Cali every day of the week.' },
  'blog': { title: 'Blog — Cali Colombia Travel Tips | Cali Cultural Tours', desc: 'Travel tips, salsa guides, and local knowledge from Juan Camilo.' },
  'contact': { title: 'Contact Juan | Cali Cultural Tours', desc: 'Get in touch to plan your Cali experience with a licensed local guide.' }
};

function showPage(pageId) {
  // Hide all pages
  pages.forEach(page => page.classList.remove('active'));

  // Show target page
  const targetPage = document.getElementById(pageId);
  if (!targetPage) {
    console.warn(`[router] Unknown pageId: ${pageId}. Redirecting to home.`);
    showPage('home');
    return;
  }

  targetPage.classList.add('active');
  window.scrollTo(0, 0);

  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Update SEO Meta
  const meta = pageMeta[pageId] || pageMeta['home'];
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.desc);

  // Close mobile menu if open
  document.getElementById('mobileMenu')?.classList.remove('open');
}

function handleHash() {
  const hash = window.location.hash.slice(1) || 'home';
  showPage(hash);
}

// Initial Routing
window.addEventListener('hashchange', handleHash);
window.addEventListener('load', handleHash);

// Click handlers for data-page elements
document.addEventListener('click', (e) => {
  const dataPageEl = e.target.closest('[data-page]');
  if (dataPageEl) {
    const page = dataPageEl.dataset.page;
    if (page) {
      window.location.hash = page;
    }
  }
});

// Audit data-page references
(() => {
  const pageIds = new Set(Array.from(document.querySelectorAll('.page')).map(p => p.id).filter(Boolean));
  document.querySelectorAll('[data-page]').forEach((el) => {
    const page = el.dataset.page;
    if (page && !pageIds.has(page)) {
      console.warn(`[nav] data-page reference not found: ${page}`, el);
    }
  });
})();
