// Game showcase functionality
function initGameShowcase() {
    const gameThumbnails = document.querySelectorAll('.game-thumbnail');
    const mainGameImage = document.getElementById('main-game-image');
    const mainGameTitle = document.getElementById('main-game-title');
    const mainGameDescription = document.getElementById('main-game-description');

    console.log('Game showcase elements found:', {
        thumbnails: gameThumbnails.length,
        mainImage: !!mainGameImage,
        mainTitle: !!mainGameTitle,
        mainDescription: !!mainGameDescription
    });

    if (!gameThumbnails.length || !mainGameImage || !mainGameTitle || !mainGameDescription) {
        console.log('Game showcase elements not found');
        return;
    }

    // Add smooth transitions to main elements with longer duration
    mainGameImage.style.transition = 'opacity 0.4s ease-in-out';
    mainGameTitle.style.transition = 'opacity 0.4s ease-in-out';
    mainGameDescription.style.transition = 'opacity 0.4s ease-in-out';
    
    // Initialize with first game data immediately
    const firstThumbnail = gameThumbnails[0];
    if (firstThumbnail) {
        const initialImage = firstThumbnail.getAttribute('data-image');
        const initialTitle = firstThumbnail.getAttribute('data-title');
        const initialDescription = firstThumbnail.getAttribute('data-description');
        
        // Set initial content immediately without transition
        mainGameImage.src = initialImage;
        mainGameImage.alt = initialTitle;
        mainGameTitle.textContent = initialTitle;
        mainGameDescription.textContent = initialDescription;
        
        // Set first thumbnail as active
        firstThumbnail.classList.add('active');
    }

    // Function to update main game display with improved fade effect
    function updateMainGame(imageSrc, title, description) {
        console.log('Updating main game:', { imageSrc, title, description });
        
        // Create a temporary image to preload
        const tempImage = new Image();
        tempImage.onload = function() {
            // Start fade out
            mainGameImage.style.opacity = '0';
            mainGameTitle.style.opacity = '0';
            mainGameDescription.style.opacity = '0';
            
            // Wait for fade out to complete, then update content
            setTimeout(() => {
                // Update content
                mainGameImage.src = imageSrc;
                mainGameImage.alt = title;
                mainGameTitle.textContent = title;
                mainGameDescription.textContent = description;
                
                // Start fade in
                setTimeout(() => {
                    mainGameImage.style.opacity = '1';
                    mainGameTitle.style.opacity = '1';
                    mainGameDescription.style.opacity = '1';
                }, 50);
            }, 300);
        };
        
        // Start loading the new image
        tempImage.src = imageSrc;
    }



    // Auto-rotate through games every 5 seconds
    window.currentIndex = 0;
    const gameDuration = 5000; // 5 seconds
    
    function startAutoRotation() {
        console.log('Starting auto rotation...');
        
        // Clear any existing interval
        if (window.autoInterval) {
            clearInterval(window.autoInterval);
        }
        
        window.autoInterval = setInterval(() => {
            console.log('Auto rotation tick - Current index:', window.currentIndex);
            
            // Move to next game
            window.currentIndex = (window.currentIndex + 1) % gameThumbnails.length;
            const nextThumbnail = gameThumbnails[window.currentIndex];
            
            console.log('Next thumbnail:', nextThumbnail);
            
            // Remove active class from all thumbnails and reset progress bars
            gameThumbnails.forEach(thumb => {
                thumb.classList.remove('active');
                // Reset progress bar by removing and re-adding active class
                thumb.style.setProperty('--progress-width', '0%');
            });
            
            // Add active class to next thumbnail
            nextThumbnail.classList.add('active');
            
            // Get game data from data attributes
            const gameImage = nextThumbnail.getAttribute('data-image');
            const gameTitle = nextThumbnail.getAttribute('data-title');
            const gameDescription = nextThumbnail.getAttribute('data-description');
            
            console.log('Game data:', { gameImage, gameTitle, gameDescription });
            
            // Update main display with smooth transition
            updateMainGame(gameImage, gameTitle, gameDescription);
        }, gameDuration);
        
        return window.autoInterval;
    }
    
    // Ensure auto-rotation works on mobile by preventing touch events from interfering
    gameThumbnails.forEach(thumbnail => {
        // Prevent touch events from stopping auto-rotation on mobile
        thumbnail.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Allow click events but don't stop auto-rotation completely
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all thumbnails and reset progress bars
            gameThumbnails.forEach(thumb => {
                thumb.classList.remove('active');
                const progressBar = thumb.querySelector('::after');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Get game data from data attributes
            const gameImage = this.getAttribute('data-image');
            const gameTitle = this.getAttribute('data-title');
            const gameDescription = this.getAttribute('data-description');
            
            // Update main display with smooth transition
            updateMainGame(gameImage, gameTitle, gameDescription);
            
            // Update currentIndex to match the clicked thumbnail
            const clickedIndex = Array.from(gameThumbnails).indexOf(this);
            window.currentIndex = clickedIndex;
            
            // Restart auto rotation after a short delay
            setTimeout(() => {
                if (!window.autoInterval) {
                    startAutoRotation();
                }
            }, 200);
        });
    });
    
    // On mobile, ensure auto-rotation continues even without visible thumbnails
    if (window.innerWidth <= 768) {
        // Force auto-rotation to start and continue on mobile
        setTimeout(() => {
            if (!window.autoInterval) {
                startAutoRotation();
            }
        }, 1000);
    }
    
    // Start auto-rotation immediately after a brief delay to ensure everything is ready
    setTimeout(() => {
        startAutoRotation();
    }, 100);

    console.log('Game showcase initialized successfully!');
}

// Initialize game showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize immediately
    initGameShowcase();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');

    if (hamburger && navMenu && navButtons) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.game-card, .feature-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Game card hover effects (removed for sidebar thumbnails)
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.transform = 'translateY(0)';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 200);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Trigger counter animation when in view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation logic here
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Formulaire envoyé avec succès !';
            successMessage.style.cssText = `
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
            `;
            
            this.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (navButtons) navButtons.classList.remove('active');
            
            // Close dropdowns
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) dropdownContent.style.display = 'none';
            });
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #9ca3af';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('Task website loaded successfully!');
}); 