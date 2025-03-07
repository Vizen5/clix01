/* ==========================================================================
   CLIX HOUSE - Service Page Functionality
   Choreographing content revelations and interactions to create a
   considered narrative flow that responds to the user's pace and focus.
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initServicePageAnimations();
    initFaqAccordion();
    initParallaxEffects();
    enhanceServiceInteractions();
});

// Orchestrate the entrance of page elements with choreographed timing
function initServicePageAnimations() {
    // Reveal text elements with sequential timing
    const textReveals = document.querySelectorAll('.text-reveal');
    
    textReveals.forEach(reveal => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        reveal.classList.add('active');
                    }, 200);
                    observer.unobserve(reveal);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(reveal);
    });
    
    // Fade in elements with staggered timing
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach((element, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        element.classList.add('revealed');
                    }, index * 150);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(element);
    });
    
    // Staggered entrance for grid items
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    staggerItems.forEach(item => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use data-delay attribute if present, otherwise calculate based on position
                    const delay = item.dataset.delay ? parseInt(item.dataset.delay) : 100;
                    
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, delay);
                    
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(item);
    });
}

// Initialize the accordion behavior for FAQs with smooth transitions
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial ARIA attributes
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            
            // Add unique IDs for ARIA relationships
            const questionId = `question-${Math.floor(Math.random() * 1000)}`;
            const answerId = `answer-${Math.floor(Math.random() * 1000)}`;
            
            question.setAttribute('id', questionId);
            question.setAttribute('aria-controls', answerId);
            answer.setAttribute('id', answerId);
            answer.setAttribute('aria-labelledby', questionId);
            
            // Toggle accordion on click
            question.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    if (otherItem !== item && otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.classList.remove('active');
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                });
                
                // Toggle current item
                this.setAttribute('aria-expanded', !expanded);
                answer.classList.toggle('active');
                answer.setAttribute('aria-hidden', expanded);
            });
            
            // Enhance keyboard navigation
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });
}

// Create subtle parallax effects for visual interest
function initParallaxEffects() {
    // Hero image parallax
    const heroImage = document.querySelector('.parallax-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.15;
            
            // Apply parallax transformation
            heroImage.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    // Process timeline animation on scroll
    const processItems = document.querySelectorAll('.process-item');
    
    if (processItems.length > 0) {
        window.addEventListener('scroll', function() {
            processItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                
                if (isVisible) {
                    // Add active class with staggered delay
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 150);
                }
            });
        });
    }
}

// Enhance interactive elements with purposeful hover and focus effects
function enhanceServiceInteractions() {
    // Feature item hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('feature-hover');
            
            // Slightly elevate the item
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            // Enhance the icon
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.opacity = '1';
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('feature-hover');
            
            // Reset transformations
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset icon
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.opacity = '0.7';
                icon.style.transform = '';
            }
        });
        
        // Enhance keyboard focus
        item.addEventListener('focus', function() {
            this.classList.add('feature-focus');
        });
        
        item.addEventListener('blur', function() {
            this.classList.remove('feature-focus');
        });
    });
    
    // Add visual indicators to process timeline
    const processItems = document.querySelectorAll('.process-item');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to process item
                entry.target.classList.add('process-active');
                
                // Animate the timeline line
                const timelineLine = entry.target.querySelector('.process-timeline-line');
                if (timelineLine) {
                    timelineLine.style.height = '100%';
                }
                
                processObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    processItems.forEach(item => {
        processObserver.observe(item);
    });
    
    // Create subtle cursor interactions
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            // Get interactive elements under the cursor
            const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
            const isOverInteractive = elementsUnderCursor.some(el => {
                return el.classList.contains('feature-item') || 
                       el.classList.contains('faq-question') || 
                       el.classList.contains('work-link') ||
                       el.tagName === 'BUTTON' ||
                       el.tagName === 'A';
            });
            
            // Modify cursor appearance over interactive elements
            if (isOverInteractive) {
                cursorFollower.classList.add('cursor-interactive');
            } else {
                cursorFollower.classList.remove('cursor-interactive');
            }
        }
    });
}

// Enhance service hero section with scroll-based transformations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.service-hero-content');
    const heroImage = document.querySelector('.service-hero-image');
    
    if (heroContent && heroImage) {
        // Create parallax effect on hero content
        const translateY = scrollPosition * 0.1;
        heroContent.style.transform = `translateY(${translateY}px)`;
        
        // Adjust opacity based on scroll position
        const opacity = Math.max(0, 1 - (scrollPosition / 500));
        heroContent.style.opacity = 0.5 + (opacity * 0.5);
        
        // Enhance image parallax effect
        const imageTranslateY = scrollPosition * 0.15;
        const parallaxImage = heroImage.querySelector('.parallax-image');
        if (parallaxImage) {
            parallaxImage.style.transform = `translateY(${imageTranslateY}px)`;
        }
    }
});

// Add subtle animation to service numbers
document.addEventListener('DOMContentLoaded', function() {
    const numbers = document.querySelectorAll('.approach-number, .process-number');
    
    numbers.forEach(number => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Create counting animation
                    const finalNumber = parseInt(number.textContent);
                    let currentNumber = 0;
                    
                    const timer = setInterval(() => {
                        currentNumber++;
                        
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(timer);
                        }
                        
                        // Add leading zero for numbers less than 10
                        if (finalNumber < 10) {
                            number.textContent = '0' + currentNumber;
                        } else {
                            number.textContent = currentNumber.toString();
                        }
                    }, 80);
                    
                    observer.unobserve(number);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(number);
    });
});