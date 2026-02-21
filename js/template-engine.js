/**
 * Template Engine for Cali Cultural Tours
 * Handles dynamic content rendering and component loading with performance optimizations
 */

class TemplateEngine {
  constructor() {
    this.cache = new Map();
    this.siteData = {};
    this.imageObserver = null;
    this.init();
  }

  async init() {
    try {
      // Load site data
      await this.loadSiteData();

      // Load components
      await this.loadComponents();

      // Update active navigation link
      this.updateActiveNavLink();

      // Initialize performance optimizations
      this.setupLazyLoading();
      this.setupIntersectionObserver();

      // Initialize page
      this.initializePage();
    } catch (error) {
      console.error('Template engine initialization failed:', error);
    }
  }

  async loadSiteData() {
    try {
      const response = await fetch('data/site-data.json');
      this.siteData = await response.json();
    } catch (error) {
      console.error('Failed to load site data:', error);
      this.siteData = this.getFallbackData();
    }
  }

  async loadComponents() {
    const components = ['header', 'footer'];

    for (const component of components) {
      try {
        const response = await fetch(`templates/components/${component}.html`);
        const html = await response.text();
        this.cache.set(component, html);

        // Inject into DOM
        const placeholder = document.getElementById(`${component}-placeholder`);
        if (placeholder) {
          placeholder.innerHTML = this.renderTemplate(html, this.siteData);
        }
      } catch (error) {
        console.error(`Failed to load component ${component}:`, error);
      }
    }
  }

  renderTemplate(template, data = {}) {
    let rendered = template;

    // Support nested data using dot notation (e.g. {{site.name}})
    const flattenKeys = (obj, prefix = '') => {
      let items = {};
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(items, flattenKeys(obj[key], prefix + key + '.'));
        } else {
          items[prefix + key] = obj[key];
        }
      }
      return items;
    };

    const flatData = flattenKeys(data);

    Object.keys(flatData).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, flatData[key] || '');
    });

    return rendered;
  }

  initializePage() {
    // Add page-specific initialization
    this.addPageAnimations();
    this.initializeForms();
    this.optimizeImages();
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    // Lazy loading for images with Intersection Observer
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // Add loaded class for fade-in effect
          img.classList.add('loaded');
          this.imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.imageObserver.observe(img);
    });
  }

  setupIntersectionObserver() {
    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Stagger animation for grid items
          if (entry.target.classList.contains('tour-card')) {
            const cards = Array.from(document.querySelectorAll('.tour-card'));
            const index = cards.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 100}ms`;
          }
        }
      });
    }, observerOptions);

    // Observe elements with reveal class
    document.querySelectorAll('.reveal, .tour-card, .quick-nav-card').forEach(el => {
      observer.observe(el);
    });
  }

  optimizeImages() {
    // Add loading="lazy" to all images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
      img.loading = 'lazy';
    });

    // Convert images to use data-src for lazy loading
    document.querySelectorAll('img').forEach(img => {
      if (img.src && !img.dataset.src) {
        img.dataset.src = img.src;
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';
      }
    });
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.as = 'style';
    fontLink.onload = function () { this.rel = 'stylesheet'; };
    document.head.appendChild(fontLink);

    // Preload hero image
    const heroImg = document.createElement('link');
    heroImg.rel = 'preload';
    heroImg.href = 'images/home-hero.jpg';
    heroImg.as = 'image';
    document.head.appendChild(heroImg);
  }

  addPageAnimations() {
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  initializeForms() {
    // Enhanced form handling with validation
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  async handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Remove honeypot field
    delete data.honeypot;

    try {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      this.showFormMessage(form, 'Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();

    } catch (error) {
      this.showFormMessage(form, 'Sorry, there was an error. Please try again.', 'error');
    } finally {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showFormMessage(form, message, type) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;

    form.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  getFallbackData() {
    return {
      siteName: 'Cali Cultural Tours',
      tagline: 'Your guide to Cali Colombia',
      phone: '+57 316 254 3554',
      email: 'info@caliculturaltours.com',
      whatsapp: '573162543554',
      rnt: 'RNT 196165'
    };
  }

  // Utility method for creating tour cards dynamically
  createTourCard(tour) {
    return `
      <div class="tour-card" data-category="${tour.category}">
        <div class="tour-card-img">
          <img data-src="${tour.image}" alt="${tour.title}" loading="lazy" decoding="async">
        </div>
        <div class="tour-card-body">
          <div class="tour-card-badge">${tour.categoryLabel}</div>
          <h4>${tour.emoji} ${tour.title}</h4>
          <p>${tour.description}</p>
          <div class="tour-card-meta">
            <span><i class="far fa-clock"></i> ${tour.duration}</span>
            <span><i class="${tour.icon}"></i> ${tour.type}</span>
          </div>
          <div class="tour-card-footer">
            <div class="tour-card-price">From ${tour.price}</div>
            <a href="${tour.link}" class="btn btn-pink btn-sm">See Details</a>
          </div>
        </div>
      </div>
    `;
  }

  // Performance monitoring
  logPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');

          // Log Largest Contentful Paint
          if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          }
        }, 0);
      });
    }
  }
  updateActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Initialize template engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.templateEngine = new TemplateEngine();
  window.templateEngine.logPerformance();
});
