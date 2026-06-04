// Main JavaScript for BoldPath HR Website
import api from './api.js';

// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialSlider = document.querySelector('.testimonial-slider');

// Mobile Menu Toggle
if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// FAQ Accordion
if (faqItems) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current item
            answer.classList.toggle('active');
        });
    });
}

// Testimonial Slider
if (testimonialSlider) {
    let currentSlide = 0;
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }
    
    // Show first slide
    showSlide(currentSlide);
    
    // Auto-rotate every 5 seconds
    setInterval(nextSlide, 5000);
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Registration Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(registerForm)) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const formData = new FormData(registerForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        try {
            const response = await api.register(userData);
            alert('Registration successful! Welcome to BoldPath HR.');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert(`Registration failed: ${error.message}`);
        }
    });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(loginForm)) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const formData = new FormData(loginForm);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        try {
            const response = await api.login(credentials);
            alert('Login successful! Welcome back.');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    });
}

// Logout Functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await api.logout();
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                window.location.href = 'index.html';
            }
        }
    });
}

// Dashboard Functionality
const dashboardStats = document.getElementById('dashboardStats');
if (dashboardStats) {
    // This would be replaced with actual API calls in a real implementation
    const stats = [
        { label: 'Total Employees', value: '142', change: '+12%' },
        { label: 'Active Positions', value: '24', change: '+3%' },
        { label: 'Pending Applications', value: '18', change: '-5%' },
        { label: 'Upcoming Reviews', value: '7', change: '+2%' }
    ];
    
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'card';
        statElement.innerHTML = `
            <h3 class="stat-number">${stat.value}</h3>
            <p class="mb-0">${stat.label}</p>
            <p class="stat-change">${stat.change}</p>
        `;
        dashboardStats.appendChild(statElement);
    });
}

// Activity List
const activityList = document.getElementById('activityList');
if (activityList) {
    // This would be replaced with actual API calls in a real implementation
    const activities = [
        { 
            icon: '👤', 
            title: 'New Employee Onboarded', 
            description: 'Sarah Johnson joined as Marketing Manager', 
            time: '2 hours ago' 
        },
        { 
            icon: '📋', 
            title: 'Performance Review Completed', 
            description: 'Quarterly review for Development Team', 
            time: '5 hours ago' 
        },
        { 
            icon: '📅', 
            title: 'Leave Request Approved', 
            description: 'Michael Chen\'s vacation request approved', 
            time: '1 day ago' 
        },
        { 
            icon: '📊', 
            title: 'Training Session Scheduled', 
            description: 'Leadership Development Workshop next week', 
            time: '2 days ago' 
        }
    ];
    
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p class="mb-0">${activity.description}</p>
                <p class="activity-time mb-0">${activity.time}</p>
            </div>
        `;
        activityList.appendChild(activityElement);
    });
}

// Initialize mobile menu state
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
    }
}

// Handle window resize
window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

console.log('BoldPath HR JavaScript loaded');