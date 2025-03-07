/* ==========================================================================
   CLIX HOUSE - Project Detail Page Functionality
   
   Enhancing the case study narrative through considered interaction design,
   parallax effects, and choreographed content revelations that align with
   the user's reading rhythm.
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initializeProjectPage();
    enhanceProjectNarrative();
    initParallaxEffects();
});

// Set up foundational page behaviors and content revelations
function initializeProjectPage() {
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
            threshold: 0.2
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
            threshold: 0.1
        });
        
        observer.observe(element);
    });
    
    // Staggered entrance for grid items and process steps
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    staggerItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Calculate delay based on position to create a wave effect
                    const baseDelay = 100;
                    const itemDelay = Math.min(index * 150, 800); // Cap maximum delay
                    
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, baseDelay + itemDelay);
                    
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

// Create a more immersive narrative experience through selective transitions
function enhanceProjectNarrative() {
    // Animate statistical results with counting effect
    const resultNumbers = document.querySelectorAll('.result-number');
    
    resultNumbers.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Parse the original value, handling percentages and decimals
                    const originalText = element.textContent;
                    let finalValue;
                    let prefix = '';
                    let suffix = '';
                    
                    // Extract numeric value from text
                    if (originalText.includes('%')) {
                        finalValue = parseFloat(originalText);
                        suffix = '%';
                    } else if (originalText.includes('/')) {
                        const parts = originalText.split('/');
                        finalValue = parseFloat(parts[0]);
                        suffix = `<span class="result-unit">/${parts[1]}</span>`;
                    } else if (originalText.includes('+')) {
                        prefix = '+';
                        finalValue = parseFloat(originalText.replace('+', ''));
                    } else {
                        finalValue = parseFloat(originalText);
                    }
                    
                    // Animate count from 0 to final value
                    let startValue = 0;
                    const duration = 1500; // ms
                    const interval = 20; // ms
                    const steps = duration / interval;
                    const increment = finalValue / steps;
                    let currentValue = startValue;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        
                        if (currentValue >= finalValue) {
                            clearInterval(counter);
                            currentValue = finalValue;
                        }
                        
                        // Format the display value properly (handle decimals)
                        let displayValue;
                        if (Number.isInteger(finalValue)) {
                            displayValue = Math.floor(currentValue);
                        } else {
                            // Keep one decimal place for non-integer values
                            displayValue = currentValue.toFixed(1);
                        }
                        
                        // Update the element with formatted value
                        element.innerHTML = `${prefix}${displayValue}${suffix}`;
                    }, interval);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(element);
    });

    // Enhance testimonial quote appearance
    const testimonial = document.querySelector('.testimonial');
    
    if (testimonial) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Create a typewriter-like effect for the quote
                    const quoteElement = testimonial.querySelector('.testimonial-quote');
                    
                    if (quoteElement) {
                        testimonial.classList.add('revealed');
                        
                        // Add a pulsing emphasis to the quote marks
                        const emphasizeQuotation = () => {
                            // Add an animated class to make the quote marks pulse
                            quoteElement.classList.add('quote-emphasis');
                            
                            // Remove class after animation completes
                            setTimeout(() => {
                                quoteElement.classList.remove('quote-emphasis');
                            }, 1000);
                        };
                        
                        // Add the emphasis after a delay
                        setTimeout(emphasizeQuotation, 1000);
                    }
                    
                    observer.unobserve(testimonial);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(testimonial);
    }
    
    // Create a fluid reading experience with scroll-linked highlights
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Get all approach sections and dynamically highlight the one in view
        const approachItems = document.querySelectorAll('.approach-item');
        
        approachItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isFullyVisible = (
                rect.top >= 0 &&
                rect.bottom <= windowHeight
            );
            
            const isPartiallyVisible = (
                rect.top < windowHeight &&
                rect.bottom > 0
            );
            
            if (isFullyVisible) {
                item.classList.add('approach-focus');
            } else if (!isPartiallyVisible) {
                item.classList.remove('approach-focus');
            }
        });
    });
}

// Create subtle parallax effects for visual interest and depth
function initParallaxEffects() {
    // Hero image parallax effect
    const heroImage = document.querySelector('.project-hero .parallax-image');
    const heroSection = document.querySelector('.project-hero');
    
    if (heroImage && heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Calculate parallax amount based on scroll within hero section
            if (scrollPosition <= heroHeight) {
                const parallaxAmount = scrollPosition * 0.4;
                heroImage.style.transform = `scale(1.1) translateY(${parallaxAmount}px)`;
            }
        });
    }
    
    // Challenge image subtle parallax
    const challengeImage = document.querySelector('.challenge-image img');
    
    if (challengeImage) {
        window.addEventListener('scroll', function() {
            const rect = challengeImage.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercentage = (windowHeight - rect.top) / (windowHeight + rect.height);
                const parallaxAmount = (scrollPercentage - 0.5) * 30;
                
                challengeImage.style.transform = `translateY(${parallaxAmount}px)`;
            }
        });
    }
    
    // Solution gallery images subtle scale on scroll
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        window.addEventListener('scroll', function() {
            const rect = image.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercentage = (windowHeight - rect.top) / (windowHeight + rect.height);
                // Create subtle scale effect based on position in viewport
                const scaleAmount = 1 + (scrollPercentage * 0.05); // Scale between 1 and 1.05
                
                image.style.transform = `scale(${scaleAmount})`;
            }
        });
    });
    
    // Next project image parallax
    const nextProjectImage = document.querySelector('.next-project-image .parallax-image');
    
    if (nextProjectImage) {
        window.addEventListener('scroll', function() {
            const rect = nextProjectImage.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercentage = (windowHeight - rect.top) / (windowHeight + rect.height);
                const parallaxAmount = (scrollPercentage - 0.5) * 20;
                
                nextProjectImage.style.transform = `translateY(${parallaxAmount}px)`;
            }
        });
    }
}

// Enhance approach items with subtle visual connections
document.addEventListener('DOMContentLoaded', function() {
    const approachItems = document.querySelectorAll('.approach-item');
    
    approachItems.forEach((item, index) => {
        // Create connecting lines between approach items (except the last one)
        if (index < approachItems.length - 1) {
            const connector = document.createElement('div');
            connector.className = 'approach-connector';
            item.appendChild(connector);
            
            // Animate the connector when the item comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            connector.classList.add('connector-active');
                        }, 800); // Delay to allow item animation to complete first
                        
                        observer.unobserve(item);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(item);
        }
    });
});

// Add image hover effect for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add a hover class for additional effects
            this.classList.add('hover');
            
            // Enhance caption visibility
            const caption = this.querySelector('.image-caption');
            if (caption) {
                caption.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
            
            // Reset caption
            const caption = this.querySelector('.image-caption');
            if (caption) {
                caption.style.opacity = '';
            }
        });
    });
});

// Create a smooth reading experience with scroll-based transformations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.project-hero-content');
    const hero = document.querySelector('.project-hero');
    
    if (heroContent && hero) {
        const heroHeight = hero.offsetHeight;
        
        // Fade out hero content as user scrolls down
        if (scrollPosition < heroHeight) {
            const opacity = 1 - (scrollPosition / (heroHeight * 0.8));
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    }
    
    // Animate section headings when they enter viewport
    const sectionHeadings = document.querySelectorAll('.section-heading');
    
    sectionHeadings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
            heading.classList.add('heading-active');
        }
    });
});