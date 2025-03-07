/* ==========================================================================
   CLIX HOUSE - Contact Page Functionality
   Orchestrating form behavior with considered transitions and validation
   to create a fluid, responsive interaction model that guides the user
   through the inquiry process with clarity and feedback.
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initFormBehavior();
    initFormElements();
    initFormValidation();
    enhanceContactInteractions();
});

// Initialize the contact form behaviors and state management
function initFormBehavior() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormButton = document.getElementById('resetForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form before submission
            if (validateForm(contactForm)) {
                // Simulate form submission with loading state
                const submitButton = contactForm.querySelector('.form-submit');
                const originalText = submitButton.innerHTML;
                
                // Set loading state
                submitButton.innerHTML = `
                    <span class="submit-text">
                        <span class="en-content">Sending...</span>
                        <span class="es-content">Enviando...</span>
                    </span>
                    <span class="submit-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 6v6l4 2"></path>
                        </svg>
                    </span>
                `;
                submitButton.disabled = true;
                
                // Simulate API call with timeout (would be replaced with actual API call)
                setTimeout(function() {
                    // Show success message
                    formSuccess.classList.add('active');
                    
                    // Reset button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    if (resetFormButton) {
        resetFormButton.addEventListener('click', function() {
            // Hide success message
            formSuccess.classList.remove('active');
            
            // Reset form fields
            contactForm.reset();
            
            // Reset validation states
            const invalidFields = contactForm.querySelectorAll('.form-input.invalid');
            invalidFields.forEach(field => {
                field.classList.remove('invalid');
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
}

// Initialize interactive behavior for form elements
function initFormElements() {
    // Create focus and filled states for form inputs
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Set active state immediately for any pre-filled inputs
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
        
        // Handle input events for dynamic state updates
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateSingleField(this);
            }
        });
    });
    
    // Enhanced behavior for checkboxes
    const checkboxes = document.querySelectorAll('.form-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            
            if (this.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
        });
    });
}

// Form validation with considered error messaging
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateSingleField(this);
            });
        });
    }
}

// Validate individual form fields with appropriate feedback
function validateSingleField(field) {
    const parentNode = field.parentNode;
    const errorMessage = parentNode.querySelector('.error-message');
    
    // Remove existing error messages
    if (errorMessage) {
        errorMessage.remove();
    }
    
    // Check if field is valid
    let isValid = field.checkValidity();
    
    // Additional validation for email field
    if (field.type === 'email' && field.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            isValid = false;
        }
    }
    
    // Update field state based on validation
    if (!isValid && field.value.trim() !== '') {
        field.classList.add('invalid');
        
        // Create error message
        const message = document.createElement('div');
        message.className = 'error-message';
        
        // Set appropriate error message based on field type
        if (field.type === 'email') {
            message.innerHTML = `
                <span class="en-content">Please enter a valid email address</span>
                <span class="es-content">Por favor, introduce una dirección de correo válida</span>
            `;
        } else {
            message.innerHTML = `
                <span class="en-content">This field is required</span>
                <span class="es-content">Este campo es obligatorio</span>
            `;
        }
        
        // Add error message to form group
        parentNode.appendChild(message);
        
        // Animate error message entrance
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 10);
        
        return false;
    } else {
        field.classList.remove('invalid');
        return true;
    }
}

// Validate entire form before submission
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateSingleField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Enhance contact section with subtle interaction details
function enhanceContactInteractions() {
    // Add parallax effect to info cards
    const infoCards = document.querySelectorAll('.contact-info-card');
    
    if (infoCards.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            infoCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                // Calculate distance from mouse to card center
                const distanceX = (mouseX - (cardCenterX / window.innerWidth)) * 10;
                const distanceY = (mouseY - (cardCenterY / window.innerHeight)) * 10;
                
                // Apply subtle rotation based on mouse position
                card.style.transform = `perspective(1000px) rotateX(${-distanceY}deg) rotateY(${distanceX}deg) translateZ(0)`;
            });
        });
        
        // Reset card position when mouse leaves the window
        document.addEventListener('mouseleave', function() {
            infoCards.forEach(card => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // Enhance form input line animations
    const inputLines = document.querySelectorAll('.input-line');
    
    if (inputLines.length > 0) {
        inputLines.forEach(line => {
            const input = line.previousElementSibling;
            
            if (input) {
                input.addEventListener('focus', function() {
                    // Create ripple effect on input line
                    line.style.transition = 'transform 0.6s var(--easing-bounce)';
                    line.style.transform = 'scaleX(1)';
                });
                
                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        line.style.transform = 'scaleX(0.15)';
                    }
                });
            }
        });
    }
}

// Apply staggered entrance animations to form elements when they enter the viewport
document.addEventListener('DOMContentLoaded', function() {
    const formElements = document.querySelectorAll('.form-group, .contact-info-card, .studio-hours-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Calculate staggered delay based on element index
                const delay = 100 + (index * 50);
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    formElements.forEach(element => {
        observer.observe(element);
    });
});

// Add a "floating label" behavior for form inputs
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('.form-input');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Set initial state for inputs with values
            if (input.value.trim() !== '') {
                label.classList.add('float');
            }
            
            // Handle input focus events
            input.addEventListener('focus', function() {
                label.classList.add('float');
            });
            
            // Handle input blur events
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    label.classList.remove('float');
                }
            });
        }
    });
});