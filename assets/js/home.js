/* ==========================================================================
   CLIX HOUSE - Homepage Specific Functionality
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initHomeKineticElements();
    enhanceWorkItemInteractions();
});

// Initialize kinetic typography and motion elements specific to homepage
function initHomeKineticElements() {
    // Additional kinetic typography animations
    const kineticType = document.querySelector('.hero-kineticType');
    
    if (kineticType) {
        // Create a subtle parallax effect on the kinetic type
        window.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            // Apply a subtle transform to the kinetic type based on mouse position
            kineticType.style.transform = `translateX(${moveX}px) translateY(calc(-50% + ${moveY}px)) rotate(-5deg)`;
        });
        
        // Reset animation on window resize for better responsiveness
        window.addEventListener('resize', function() {
            kineticType.style.animation = 'none';
            
            setTimeout(function() {
                kineticType.style.animation = 'marquee 20s linear infinite';
            }, 10);
        });
    }
    
    // Optional: Enhanced scroll-based animations for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const opacity = Math.max(0, 1 - scrollPosition / 500);
            
            // Fade out hero content slightly as user scrolls down
            heroSection.style.opacity = 0.5 + (opacity * 0.5);
        });
    }
}

// Enhance work item hover and focus interactions
function enhanceWorkItemInteractions() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        // Create a more sophisticated hover effect
        item.addEventListener('mouseenter', function() {
            // Add active state to the current item
            this.classList.add('work-active');
            
            // Optional: Slightly dim other work items
            workItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.add('work-inactive');
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove active state
            this.classList.remove('work-active');
            
            // Remove inactive state from all items
            workItems.forEach(otherItem => {
                otherItem.classList.remove('work-inactive');
            });
        });
        
        // Enhance focus state for keyboard navigation
        item.addEventListener('focus', function() {
            this.classList.add('work-focused');
        });
        
        item.addEventListener('blur', function() {
            this.classList.remove('work-focused');
        });
    });
    
    // Add subtle parallax effect to work images on scroll
    const workImages = document.querySelectorAll('.work-image');
    
    if (workImages.length > 0) {
        window.addEventListener('scroll', function() {
            workImages.forEach(image => {
                const parentContainer = image.closest('.work-item');
                if (parentContainer) {
                    const rect = parentContainer.getBoundingClientRect();
                    const isVisible = (
                        rect.top < window.innerHeight &&
                        rect.bottom > 0
                    );
                    
                    if (isVisible) {
                        // Calculate vertical position relative to viewport
                        const viewportCenter = window.innerHeight / 2;
                        const itemCenter = rect.top + (rect.height / 2);
                        const offset = (itemCenter - viewportCenter) * 0.05;
                        
                        // Apply subtle parallel movement
                        image.style.transform = `translateY(${offset}px)`;
                    }
                }
            });
        });
    }
}

// Initialize advanced text animations that are specific to homepage
document.addEventListener('DOMContentLoaded', function() {
    // Apply special text effect to manifesto principles
    const manifestoPrinciples = document.querySelectorAll('.manifesto-principle');
    
    manifestoPrinciples.forEach(principle => {
        // Split the text into words
        const text = principle.innerHTML;
        const words = text.split(' ');
        
        // Rebuild the text with word spans
        principle.innerHTML = words.map(word => {
            return `<span class="principle-word">${word}</span>`;
        }).join(' ');
        
        // Add hover effect to each word
        const wordElements = principle.querySelectorAll('.principle-word');
        wordElements.forEach(word => {
            word.addEventListener('mouseenter', function() {
                this.classList.add('word-highlight');
            });
            
            word.addEventListener('mouseleave', function() {
                this.classList.remove('word-highlight');
            });
        });
    });
});

// Progressive loading of content for performance optimization
window.addEventListener('load', function() {
    // Mark the page as fully loaded
    document.body.classList.add('page-loaded');
    
    // Preload images for work items that aren't initially visible
    setTimeout(() => {
        const workImages = document.querySelectorAll('.work-image');
        workImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.includes('placeholder')) {
                // In a real implementation, this would load actual images
                // For demo, we'll just log that preloading would happen here
                console.log('Preloading image for better performance: ', src);
            }
        });
    }, 1000);
});

// Add smooth entrance animation to contact CTA when it comes into view
document.addEventListener('DOMContentLoaded', function() {
    const contactCta = document.querySelector('.contact-cta');
    
    if (contactCta) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactCta.classList.add('cta-revealed');
                    observer.unobserve(contactCta);
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(contactCta);
    }
});