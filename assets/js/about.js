/* ==========================================================================
   CLIX HOUSE - About Page Functionality
   Orchestrating revelations and microinteractions that enrich the studio
   narrative through purposeful motion and considered interactivity.
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initAboutPageElements();
    enhanceTeamInteractions();
    initStudioGallery();
    enhanceTimelineAnimations();
});

// Initialize core page animations and element behaviors
function initAboutPageElements() {
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
    
    // Staggered entrance for content blocks
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    staggerItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use data-delay attribute if present, otherwise calculate based on position
                    const delay = item.dataset.delay ? parseInt(item.dataset.delay) : 100 + (index * 75);
                    
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
}

// Enhance team member hover interactions and focus states
function enhanceTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Create focused hover states
        member.addEventListener('mouseenter', function() {
            // Add active state to the current member
            this.classList.add('member-active');
            
            // Slightly dim other team members for focused attention
            teamMembers.forEach(otherMember => {
                if (otherMember !== this) {
                    otherMember.classList.add('member-inactive');
                }
            });
        });
        
        member.addEventListener('mouseleave', function() {
            // Remove active state
            this.classList.remove('member-active');
            
            // Remove inactive state from all members
            teamMembers.forEach(otherMember => {
                otherMember.classList.remove('member-inactive');
            });
        });
        
        // Make the entire member card focusable for accessibility
        member.setAttribute('tabindex', '0');
        
        // Enhance focus state for keyboard navigation
        member.addEventListener('focus', function() {
            this.classList.add('member-focused');
        });
        
        member.addEventListener('blur', function() {
            this.classList.remove('member-focused');
        });
    });
}

// Initialize studio gallery interactions
function initStudioGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        // Enhance focus states for accessibility
        image.setAttribute('tabindex', '0');
        
        // Add subtle interactions on hover and focus
        image.addEventListener('mouseenter', function() {
            this.classList.add('image-active');
        });
        
        image.addEventListener('mouseleave', function() {
            this.classList.remove('image-active');
        });
        
        image.addEventListener('focus', function() {
            this.classList.add('image-focused');
        });
        
        image.addEventListener('blur', function() {
            this.classList.remove('image-focused');
        });
    });
    
    // Add a subtle parallax effect to images on mouse movement
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (galleryGrid) {
        galleryGrid.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate position within the grid as percentage
            const posX = mouseX / rect.width;
            const posY = mouseY / rect.height;
            
            // Apply subtle movement to images based on mouse position
            galleryImages.forEach((image, index) => {
                const offsetFactor = (index % 2 === 0) ? 1 : -1;
                const offsetX = (posX - 0.5) * 10 * offsetFactor;
                const offsetY = (posY - 0.5) * 10 * offsetFactor;
                
                image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
        
        // Reset image positions when mouse leaves the gallery
        galleryGrid.addEventListener('mouseleave', function() {
            galleryImages.forEach(image => {
                image.style.transform = 'translate(0, 0)';
                
                // Add a smooth transition for the reset
                image.style.transition = 'transform 0.5s var(--easing-smooth)';
                
                // Remove the transition after it completes
                setTimeout(() => {
                    image.style.transition = '';
                }, 500);
            });
        });
    }
}

// Enhance timeline animations with sequential reveals
function enhanceTimelineAnimations() {
    const awardItems = document.querySelectorAll('.award-item');
    
    // Create a sequential counter animation for award years
    awardItems.forEach(item => {
        const yearElement = item.querySelector('.award-year');
        
        if (yearElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Get the target year as a number
                        const targetYear = parseInt(yearElement.textContent);
                        let currentYear = targetYear - 10;
                        
                        // Set initial value
                        yearElement.textContent = currentYear;
                        
                        // Create a counting animation
                        const interval = setInterval(() => {
                            currentYear++;
                            yearElement.textContent = currentYear;
                            
                            if (currentYear >= targetYear) {
                                clearInterval(interval);
                            }
                        }, 50);
                        
                        observer.unobserve(item);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(item);
        }
    });
}

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