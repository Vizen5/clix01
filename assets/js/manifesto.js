/* ==========================================================================
   CLIX HOUSE - Manifesto Page Functionality
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    initManifestoPrinciples();
    initParallaxScrolling();
    enhancePrincipleTypography();
});

// Initialize interactive elements for manifesto principles
function initManifestoPrinciples() {
    // Reveal manifesto principles on scroll with staggered timing
    const principles = document.querySelectorAll('.principle-item');
    
    const principleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of principles
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Animate the number with a counter effect
                    const numberElement = entry.target.querySelector('.principle-number');
                    if (numberElement) {
                        const finalNumber = numberElement.textContent.padStart(2, '0');
                        animateCounter(numberElement, finalNumber);
                    }
                }, index * 200);
                
                principleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    principles.forEach(principle => {
        principleObserver.observe(principle);
    });
}

// Create a subtle number counter animation
function animateCounter(element, finalNumber) {
    // Extract the numeric part (remove the '0' prefix if any)
    const finalDigits = parseInt(finalNumber.replace(/^0+/, ''));
    let currentNumber = 0;
    
    const increment = Math.max(1, Math.floor(finalDigits / 10));
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= finalDigits) {
            currentNumber = finalDigits;
            clearInterval(timer);
        }
        
        // Add leading zero if needed to match original format
        element.textContent = currentNumber.toString().padStart(2, '0');
    }, 50);
}

// Create parallax scrolling effects for visual interest
function initParallaxScrolling() {
    const spinningElement = document.querySelector('.spinning-element');
    
    if (spinningElement) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const rotationDegree = scrollPosition * 0.05;
            
            // Adjust the rotation speed based on scroll position
            spinningElement.style.transform = `rotate(${rotationDegree}deg)`;
        });
    }
    
    // Create parallax effect on the blockquote
    const blockquote = document.querySelector('.manifesto-quote blockquote');
    
    if (blockquote) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const offset = scrollPosition * 0.1;
            
            // Move blockquote at a different rate than scroll
            blockquote.style.transform = `translateY(${offset}px)`;
        });
    }
}

// Enhance typography with interactive elements
function enhancePrincipleTypography() {
    // Apply the text splitting effect to principle titles
    const principleTitles = document.querySelectorAll('.principle-title');
    
    principleTitles.forEach(title => {
        const html = title.innerHTML;
        const words = html.split(' ');
        
        // Replace each word with a span for interactive styling
        title.innerHTML = words.map(word => {
            return `<span class="principle-word">${word}</span>`;
        }).join(' ');
        
        // Add interaction effects to each word
        const wordElements = title.querySelectorAll('.principle-word');
        
        wordElements.forEach(word => {
            word.addEventListener('mouseenter', function() {
                this.classList.add('word-highlight');
            });
            
            word.addEventListener('mouseleave', function() {
                this.classList.remove('word-highlight');
            });
        });
    });
}

// Progressive reveal for large text sections
document.addEventListener('DOMContentLoaded', function() {
    const largeTextElements = document.querySelectorAll('.large-text');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                text.classList.add('text-visible');
                
                // Create letter-by-letter animation for first paragraph
                if (text.classList.contains('special-animation')) {
                    const content = text.textContent;
                    const characters = content.split('');
                    
                    text.textContent = '';
                    text.style.opacity = '1';
                    
                    characters.forEach((char, index) => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.opacity = '0';
                        span.style.transition = `opacity 0.1s ease ${index * 0.01}s`;
                        
                        text.appendChild(span);
                        
                        setTimeout(() => {
                            span.style.opacity = '1';
                        }, 10);
                    });
                }
                
                textObserver.unobserve(text);
            }
        });
    }, {
        threshold: 0.1
    });
    
    largeTextElements.forEach(text => {
        textObserver.observe(text);
    });
});

// Initialize the contact CTA reveal animation
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

// Enhance page-specific scroll animations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Create a fading-out effect for the page title as user scrolls down
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const pageTitleOffset = pageTitle.offsetTop;
        const distance = scrollPosition - pageTitleOffset;
        
        if (distance > 0 && distance < windowHeight) {
            const opacity = 1 - (distance / windowHeight);
            pageTitle.style.opacity = Math.max(0.3, opacity);
        } else if (distance <= 0) {
            pageTitle.style.opacity = 1;
        }
    }
});