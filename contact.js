// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const faqItems = document.querySelectorAll('.faq-item');

    // FAQ Toggle Functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // Simulate form submission (replace with actual API call)
                console.log('Form submitted:', formObject);
            }
        });
    }

    // Form validation
    function validateForm(data) {
        const errors = [];
        
        // Check required fields
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Le nom doit contenir au moins 2 caractères');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Veuillez entrer une adresse email valide');
        }
        
        if (!data.subject) {
            errors.push('Veuillez sélectionner un sujet');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Le message doit contenir au moins 10 caractères');
        }
        
        if (errors.length > 0) {
            showErrorMessage(errors);
            return false;
        }
        
        return true;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-check-circle"></i>
                <h3>Message envoyé !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
        `;
        
        // Add styles
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, rgba(55, 65, 81, 0.95) 0%, rgba(75, 85, 99, 0.95) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 2rem;
            z-index: 10000;
            backdrop-filter: blur(10px);
            text-align: center;
            min-width: 300px;
        `;
        
        successDiv.querySelector('.message-content i').style.cssText = `
            font-size: 3rem;
            color: #10b981;
            margin-bottom: 1rem;
        `;
        
        successDiv.querySelector('.message-content h3').style.cssText = `
            color: #ffffff;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        `;
        
        successDiv.querySelector('.message-content p').style.cssText = `
            color: #d1d5db;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Show error message
    function showErrorMessage(errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de validation</h3>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Add styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 2rem;
            z-index: 10000;
            backdrop-filter: blur(10px);
            text-align: center;
            min-width: 300px;
        `;
        
        errorDiv.querySelector('.message-content i').style.cssText = `
            font-size: 3rem;
            color: #ffffff;
            margin-bottom: 1rem;
        `;
        
        errorDiv.querySelector('.message-content h3').style.cssText = `
            color: #ffffff;
            font-size: 1.3rem;
            margin-bottom: 1rem;
            font-weight: 600;
        `;
        
        errorDiv.querySelector('.message-content ul').style.cssText = `
            color: #ffffff;
            font-size: 0.9rem;
            text-align: left;
            list-style: none;
            padding: 0;
            margin: 0;
        `;
        
        errorDiv.querySelector('.message-content li').style.cssText = `
            margin-bottom: 0.5rem;
            padding-left: 1rem;
            position: relative;
        `;
        
        errorDiv.querySelector('.message-content li').style.setProperty('--before-content', '"•"');
        errorDiv.querySelector('.message-content li').style.setProperty('--before-color', '#ffffff');
        
        document.body.appendChild(errorDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Le nom doit contenir au moins 2 caractères';
                }
                break;
                
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer une adresse email valide';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Veuillez sélectionner un sujet';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Le message doit contenir au moins 10 caractères';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }
    }

    // Show field error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-circle';
        icon.style.fontSize = '0.8rem';
        errorDiv.insertBefore(icon, errorDiv.firstChild);
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }

    // Clear field error
    function clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }

    // Add smooth animations
    function addContactAnimations() {
        const contactMethods = document.querySelectorAll('.contact-method');
        const socialIcons = document.querySelectorAll('.social-icon');
        
        // Animate contact methods on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        contactMethods.forEach((method, index) => {
            method.style.opacity = '0';
            method.style.transform = 'translateY(30px)';
            method.style.transition = `all 0.3s ease ${index * 0.1}s`;
            observer.observe(method);
        });

        // Animate social icons
        socialIcons.forEach((icon, index) => {
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0.8)';
            icon.style.transition = `all 0.3s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'scale(1)';
            }, 1000 + index * 100);
        });
    }

    addContactAnimations();

    // Add form focus effects
    const formElements = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });

    // Add character counter for message
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            color: #9ca3af;
            font-size: 0.8rem;
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = messageTextarea.value.length;
            const minLength = 10;
            const remaining = minLength - length;
            
            if (remaining > 0) {
                counter.textContent = `${remaining} caractères minimum restants`;
                counter.style.color = '#ef4444';
            } else {
                counter.textContent = `${length} caractères`;
                counter.style.color = '#10b981';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
}); 