// Admin Dashboard JavaScript

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts and stats
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
});

// Initialize dashboard components
function initializeDashboard() {
    // Initialize any charts or data visualizations
    console.log('Initializing dashboard...');
    
    // Set up date display
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Set up event listeners
function setupEventListeners() {
    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Load dashboard data
function loadDashboardData() {
    // In a real implementation, this would fetch data from the API
    console.log('Loading dashboard data...');
    
    // Simulate loading data
    setTimeout(() => {
        // Update stats
        updateStats();
        
        // Update activity feed
        updateActivityFeed();
        
        // Hide loading indicators
        hideLoadingIndicators();
    }, 1000);
}

// Update dashboard stats
function updateStats() {
    // In a real implementation, this would update with actual data
    console.log('Updating stats...');
    
    // Example stat updates
    document.getElementById('totalEmployees').textContent = '142';
    document.getElementById('activePositions').textContent = '24';
    document.getElementById('pendingApplications').textContent = '18';
    document.getElementById('upcomingReviews').textContent = '7';
}

// Update activity feed
function updateActivityFeed() {
    // In a real implementation, this would fetch recent activity
    console.log('Updating activity feed...');
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        // Sample activity data
        const activities = [
            {
                icon: 'user-plus',
                title: 'New Employee Added',
                description: 'John Smith was added to the Marketing team',
                time: '2 hours ago'
            },
            {
                icon: 'file-text',
                title: 'Performance Review Completed',
                description: 'Q2 review completed for Sarah Johnson',
                time: '4 hours ago'
            },
            {
                icon: 'calendar',
                title: 'Leave Request Submitted',
                description: 'Michael Brown requested time off next week',
                time: '1 day ago'
            }
        ];
        
        // Clear existing activities
        activityList.innerHTML = '';
        
        // Add activities to list
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        ${getActivityIcon(activity.icon)}
                    </svg>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }
}

// Get SVG icon for activity
function getActivityIcon(iconType) {
    switch (iconType) {
        case 'user-plus':
            return '<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        case 'file-text':
            return '<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        case 'calendar':
            return '<path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        default:
            return '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    }
}

// Hide loading indicators
function hideLoadingIndicators() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Load a specific page
function loadPage(page) {
    // In a real implementation, this would load the requested page
    console.log(`Loading page: ${page}`);
    
    // Update active sidebar link
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${page}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Simulate page loading
    setTimeout(() => {
        // Hide loading indicator
        hideLoadingIndicators();
        
        // Update page title
        const pageTitle = document.querySelector('.header h1');
        if (pageTitle) {
            pageTitle.textContent = getPageTitle(page);
        }
    }, 500);
}

// Get page title
function getPageTitle(page) {
    const titles = {
        'dashboard': 'Admin Dashboard',
        'employees': 'Employee Management',
        'departments': 'Department Management',
        'positions': 'Position Management',
        'attendance': 'Attendance Tracking',
        'leave': 'Leave Management'
    };
    
    return titles[page] || 'Admin Dashboard';
}

// Handle form submission
function handleFormSubmission(form) {
    // In a real implementation, this would submit form data to the server
    console.log('Form submitted:', form.id);
    
    // Show loading indicator
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Saving...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            alert('Form submitted successfully!');
            
            // Close modal if it's a modal form
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }, 1000);
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Logout function
function logout() {
    // In a real implementation, this would destroy the session
    console.log('Logging out...');
    
    // Show confirmation
    if (confirm('Are you sure you want to logout?')) {
        // Redirect to login page
        window.location.href = '../user-login.html';
    }
}

// Show loading indicator
function showLoadingIndicator() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'block';
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeDashboard,
        setupEventListeners,
        loadDashboardData,
        updateStats,
        updateActivityFeed,
        loadPage,
        handleFormSubmission,
        openModal,
        closeModal,
        logout,
        formatCurrency,
        formatDate
    };
}