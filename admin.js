/**
 * Edu-genre - Admin JavaScript File
 * This file contains all client-side functionality for the admin dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edu-genre admin panel initialized');
    
    // Initialize all admin components
    initAdminInterface();
    initFormHandlers();
    initDataTables();
    initCharts();
});

/**
 * Initialize admin interface elements
 */
function initAdminInterface() {
    // Set active sidebar item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize dropdown menus
    const dropdownToggleList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownToggleList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
    
    // Initialize file upload previews
    initFileUploads();
    
    // Initialize delete confirmation modals
    initDeleteConfirmation();
}

/**
 * Initialize form handlers for admin actions
 */
function initFormHandlers() {
    // Book form handling
    const bookForm = document.getElementById('book-form');
    if (bookForm) {
        // Generate slug from title
        const titleInput = document.getElementById('book-title');
        const slugInput = document.getElementById('book-slug');
        
        if (titleInput && slugInput) {
            titleInput.addEventListener('input', function() {
                slugInput.value = generateSlug(this.value);
            });
        }
        
        // Handle free book checkbox
        const freeCheckbox = document.getElementById('book-free');
        const priceInput = document.getElementById('book-price');
        const currencySelect = document.getElementById('book-currency');
        
        if (freeCheckbox && priceInput && currencySelect) {
            freeCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    priceInput.value = '';
                    priceInput.disabled = true;
                    currencySelect.disabled = true;
                } else {
                    priceInput.disabled = false;
                    currencySelect.disabled = false;
                }
            });
        }
        
        // Form submission
        bookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                showAdminToast('Veuillez remplir tous les champs obligatoires.', 'danger');
                return;
            }
            
            // Simulate form submission
            showAdminToast('Le livre a été enregistré avec succès!', 'success');
        });
    }
    
    // Article form handling
    const articleForm = document.getElementById('article-form');
    if (articleForm) {
        // Generate slug from title
        const titleInput = document.getElementById('article-title');
        const slugInput = document.getElementById('article-slug');
        
        if (titleInput && slugInput) {
            titleInput.addEventListener('input', function() {
                slugInput.value = generateSlug(this.value);
            });
        }
        
        // Form submission
        articleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                showAdminToast('Veuillez remplir tous les champs obligatoires.', 'danger');
                return;
            }
            
            // Simulate form submission
            showAdminToast('L\'article a été enregistré avec succès!', 'success');
        });
    }
    
    // Activity form handling
    const activityForm = document.getElementById('activity-form');
    if (activityForm) {
        // Generate slug from title
        const titleInput = document.getElementById('activity-title');
        const slugInput = document.getElementById('activity-slug');
        
        if (titleInput && slugInput) {
            titleInput.addEventListener('input', function() {
                slugInput.value = generateSlug(this.value);
            });
        }
        
        // Form submission
        activityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                showAdminToast('Veuillez remplir tous les champs obligatoires.', 'danger');
                return;
            }
            
            // Simulate form submission
            showAdminToast('L\'activité a été enregistrée avec succès!', 'success');
        });
    }
}

/**
 * Initialize file upload functionality
 */
function initFileUploads() {
    // Cover image upload
    const coverBtn = document.getElementById('book-cover-btn');
    const coverInput = document.getElementById('book-cover');
    const filePreview = document.querySelector('.file-preview');
    
    if (coverBtn && coverInput && filePreview) {
        coverBtn.addEventListener('click', function() {
            coverInput.click();
        });
        
        coverInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    filePreview.innerHTML = `<img src="${e.target.result}" alt="Cover Preview" style="max-height: 100px; max-width: 100%;">`;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
}

/**
 * Initialize delete confirmation
 */
function initDeleteConfirmation() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Êtes-vous sûr de vouloir supprimer cet élément? Cette action est irréversible.')) {
                // Simulate delete operation
                const row = this.closest('tr');
                if (row) {
                    row.remove();
                    showAdminToast('L\'élément a été supprimé avec succès.', 'success');
                }
            }
        });
    });
    
    // Select all functionality
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('tbody .form-check-input');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
}

/**
 * Initialize data tables for admin lists
 */
function initDataTables() {
    // Search functionality
    const tableSearchInputs = document.querySelectorAll('.table-search');
    
    tableSearchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.card').querySelector('table');
            
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });
}

/**
 * Initialize charts for admin dashboard
 */
function initCharts() {
    // Users chart
    const usersChartEl = document.getElementById('users-chart');
    if (usersChartEl) {
        const usersChart = new Chart(usersChartEl, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                datasets: [{
                    label: 'Utilisateurs',
                    data: [120, 190, 300, 350, 420, 550, 650, 700, 850, 950, 1100, 1256],
                    fill: true,
                    backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
                    borderColor: 'var(--bs-primary)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(var(--bs-light-rgb), 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(var(--bs-light-rgb), 0.05)'
                        }
                    }
                }
            }
        });
    }
    
    // Content chart
    const contentChartEl = document.getElementById('content-chart');
    if (contentChartEl) {
        const contentChart = new Chart(contentChartEl, {
            type: 'doughnut',
            data: {
                labels: ['Articles', 'Activités', 'Livres'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        'var(--bs-primary)',
                        'var(--bs-success)',
                        'var(--bs-warning)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

/**
 * Generate slug from text
 */
function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[àáâäãåą]/g, 'a')
        .replace(/[èéêëę]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôöõø]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ýÿ]/g, 'y')
        .replace(/[ñń]/g, 'n')
        .replace(/[çć]/g, 'c')
        .replace(/[ß]/g, 'ss')
        .replace(/[^\w\s]/g, '') // Remove special characters except whitespace
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-') // Replace multiple - with single -
        .trim()
        .replace(/^-+/, '') // Remove - from start
        .replace(/-+$/, ''); // Remove - from end
}

/**
 * Show a toast notification in the admin panel
 */
function showAdminToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
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
            <strong class="me-auto">Edu-genre Admin</strong>
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