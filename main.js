/**
 * Edu-genre - Main JavaScript File
 * This file contains all client-side functionality for the public-facing website
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edu-genre website initialized');
    
    // Initialize all components
    initNavigation();
    initNewsletterForm();
    initAnimations();
    initSearch();
    initInteractiveElements();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile navigation toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                target.classList.toggle('show');
            }
        });
    }
}

/**
 * Handle newsletter form submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const agreeCheckbox = document.getElementById('agree-terms');
            
            if (!emailInput.value.trim()) {
                showToast('Veuillez entrer votre adresse email.', 'warning');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showToast('Veuillez entrer une adresse email valide.', 'warning');
                return;
            }
            
            if (!agreeCheckbox.checked) {
                showToast('Veuillez accepter les conditions.', 'warning');
                return;
            }
            
            // Simulate form submission
            showToast('Merci pour votre inscription à la newsletter!', 'success');
            this.reset();
        });
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterPageContent(searchTerm);
        });
    }
}

/**
 * Filter content on the page based on search term
 */
function filterPageContent(searchTerm) {
    // This function would filter articles, activities, or books based on the search term
    // Implementation depends on the specific page and content structure
    
    const contentItems = document.querySelectorAll('.filterable-item');
    if (contentItems.length > 0) {
        contentItems.forEach(item => {
            const title = item.querySelector('.title')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

/**
 * Initialize simple animations for page elements
 */
function initAnimations() {
    // Simple fade-in effect for page sections
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        // Simple scroll detection to trigger animations
        window.addEventListener('scroll', function() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150; // pixels from the viewport top
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        });
        
        // Trigger initial check
        window.dispatchEvent(new Event('scroll'));
    }
}

/**
 * Initialize interactive elements 
 */
function initInteractiveElements() {
    // Add hover effects or interactive behavior to cards
    const interactiveCards = document.querySelectorAll('.feature-card, .activity-card, .article-card, .book-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Initialize contact form if it exists
    initContactForm();
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const subjectInput = this.querySelector('select[name="subject"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                showToast('Veuillez entrer votre nom.', 'warning');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showToast('Veuillez entrer une adresse email valide.', 'warning');
                return;
            }
            
            if (!subjectInput.value) {
                showToast('Veuillez sélectionner un sujet.', 'warning');
                return;
            }
            
            if (!messageInput.value.trim()) {
                showToast('Veuillez entrer votre message.', 'warning');
                return;
            }
            
            // Simulate form submission
            showToast('Votre message a été envoyé. Nous vous répondrons bientôt!', 'success');
            this.reset();
        });
    }
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create the toast
    const toastEl = document.createElement('div');
    toastEl.className = `toast show bg-${type} text-white`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="toast-header bg-${type} text-white">
            <strong class="me-auto">Edu-genre</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toastEl);
    
    // Add close button functionality
    const closeButton = toastEl.querySelector('.btn-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            toastEl.remove();
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toastEl.remove();
    }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
