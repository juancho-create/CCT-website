/**
 * Form handling and validation for Cali Cultural Tours
 * Handles sanitization, validation, and submission to WhatsApp.
 */

function sanitizeInput(str) {
    return String(str ?? '').replace(/[<>\"'&]/g, '').trim();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());
}

function digitsOnly(str) {
    return String(str ?? '').replace(/\D/g, '');
}

function ensureErrorEl(input) {
    const group = input.closest('.form-group');
    if (!group) return null;
    let el = group.querySelector('.field-error');
    if (!el) {
        el = document.createElement('div');
        el.className = 'field-error';
        group.appendChild(el);
    }
    return el;
}

function setFieldError(input, message) {
    const el = ensureErrorEl(input);
    if (!el) return;
    el.textContent = message || '';
}

function validateField(input) {
    const name = input.name;
    const value = String(input.value ?? '').trim();

    if (name === 'firstName' || name === 'lastName') {
        if (!value) return 'Required.';
        if (value.length < 2) return 'Must be at least 2 characters.';
    }

    if (name === 'email') {
        if (!value) return 'Required.';
        if (!isValidEmail(value)) return 'Enter a valid email.';
    }

    if (name === 'whatsapp') {
        const digits = digitsOnly(value);
        if (!digits) return 'Required.';
        if (digits.length < 7) return 'Enter at least 7 digits.';
    }

    return '';
}

function handleFormSubmit(e, formId) {
    e.preventDefault();

    const form = document.getElementById(formId);
    if (!form) {
        console.warn(`[forms] Form not found: ${formId}`);
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Honeypot check
    if (data.honeypot) {
        return;
    }

    const inputs = form.querySelectorAll('input[name], textarea[name]');
    let hasErrors = false;
    inputs.forEach((input) => {
        if (input.name === 'honeypot') return;
        const msg = validateField(input);
        setFieldError(input, msg);
        if (msg) hasErrors = true;
    });

    if (hasErrors) {
        return;
    }

    // Show thank you modal
    document.getElementById('overlay')?.classList.add('show');
    document.getElementById('thankYouModal')?.classList.add('show');

    // Redirect to WhatsApp after a delay
    setTimeout(() => {
        const safeFirstName = sanitizeInput(data.firstName);
        const safeLastName = sanitizeInput(data.lastName);
        const safeBody = sanitizeInput(data.message || data.comments || '');
        const bodyText = safeBody || "I'm interested in your tours!";
        const message = `Hi Juan! My name is ${safeFirstName} ${safeLastName}. ${bodyText}`;
        window.open(`https://wa.me/573162543554?text=${encodeURIComponent(message)}`, '_blank');
    }, 1500);

    // Reset form
    form.reset();
}

function closeModal() {
    document.getElementById('overlay')?.classList.remove('show');
    document.getElementById('thankYouModal')?.classList.remove('show');
}

// Global closeModal for inline onclick
window.closeModal = closeModal;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('homeContactForm')?.addEventListener('submit', (e) => handleFormSubmit(e, 'homeContactForm'));
    document.getElementById('contactForm')?.addEventListener('submit', (e) => handleFormSubmit(e, 'contactForm'));
    document.getElementById('overlay')?.addEventListener('click', closeModal);

    document.querySelectorAll('form').forEach((form) => {
        form.querySelectorAll('input[name], textarea[name]').forEach((input) => {
            if (input.name === 'honeypot') return;
            input.addEventListener('input', () => {
                const msg = validateField(input);
                setFieldError(input, msg);
            });
        });
    });
});
