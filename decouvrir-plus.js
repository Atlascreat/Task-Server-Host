// Discover Plus Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    const searchInput = document.getElementById('game-search');
    
    let currentFilter = 'all';
    let currentSearch = '';

    // Filter functionality
    function filterGames() {
        gameCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            const gameName = card.getAttribute('data-name').toLowerCase();
            
            let shouldShow = true;
            
            // Apply category filter
            if (currentFilter !== 'all') {
                shouldShow = categories.includes(currentFilter);
            }
            
            // Apply search filter
            if (currentSearch && shouldShow) {
                shouldShow = gameName.includes(currentSearch.toLowerCase());
            }
            
            // Show/hide card with animation
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update results count
        updateResultsCount();
    }

    // Update results count
    function updateResultsCount() {
        const visibleCards = document.querySelectorAll('.game-card[style*="display: block"], .game-card:not([style*="display: none"])');
        const resultsCount = document.querySelector('.results-count');
        
        if (!resultsCount) {
            const countElement = document.createElement('div');
            countElement.className = 'results-count';
            countElement.style.cssText = 'color: #d1d5db; font-size: 0.9rem; margin-top: 1rem; text-align: center;';
            document.querySelector('.filters-container').appendChild(countElement);
        }
        
        const countElement = document.querySelector('.results-count');
        countElement.textContent = `${visibleCards.length} jeu${visibleCards.length > 1 ? 'x' : ''} trouvé${visibleCards.length > 1 ? 's' : ''}`;
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.getAttribute('data-filter');
            
            // Apply filters
            filterGames();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.trim();
            filterGames();
        });
    }

    // Initialize with all games visible
    filterGames();

    // Add hover effects for game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add smooth animations for filter transitions
    function addFilterAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .game-card {
                transition: all 0.3s ease;
            }
            
            .filter-btn {
                transition: all 0.3s ease;
            }
            
            .search-box input {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    addFilterAnimations();

    // Add keyboard navigation for search
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Focus on first visible game card
                const firstVisibleCard = document.querySelector('.game-card[style*="display: block"], .game-card:not([style*="display: none"])');
                if (firstVisibleCard) {
                    firstVisibleCard.focus();
                }
            }
        });
    }

    // Add loading animation for images
    function addImageLoadingAnimation() {
        const images = document.querySelectorAll('.game-card-image img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.5';
                this.style.filter = 'grayscale(100%)';
            });
        });
    }

    addImageLoadingAnimation();

    // Add scroll animations
    function addScrollAnimations() {
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

        gameCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }

    addScrollAnimations();

    // Add filter button animations
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 140, 0, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add search suggestions
    function addSearchSuggestions() {
        const gameNames = Array.from(gameCards).map(card => 
            card.querySelector('h3').textContent.toLowerCase()
        );
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const value = this.value.toLowerCase();
                const suggestions = gameNames.filter(name => 
                    name.includes(value) && value.length > 0
                );
                
                // Remove existing suggestions
                const existingSuggestions = document.querySelector('.search-suggestions');
                if (existingSuggestions) {
                    existingSuggestions.remove();
                }
                
                // Add new suggestions if there are any
                if (suggestions.length > 0 && value.length > 0) {
                    const suggestionsContainer = document.createElement('div');
                    suggestionsContainer.className = 'search-suggestions';
                    suggestionsContainer.style.cssText = `
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(55, 65, 81, 0.95);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                        margin-top: 5px;
                        z-index: 1000;
                        backdrop-filter: blur(10px);
                    `;
                    
                    suggestions.forEach(suggestion => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.textContent = suggestion;
                        suggestionItem.style.cssText = `
                            padding: 0.5rem 1rem;
                            cursor: pointer;
                            color: #d1d5db;
                            transition: background 0.2s ease;
                        `;
                        
                        suggestionItem.addEventListener('mouseenter', function() {
                            this.style.background = 'rgba(255, 140, 0, 0.2)';
                        });
                        
                        suggestionItem.addEventListener('mouseleave', function() {
                            this.style.background = 'transparent';
                        });
                        
                        suggestionItem.addEventListener('click', function() {
                            searchInput.value = suggestion;
                            currentSearch = suggestion;
                            filterGames();
                            suggestionsContainer.remove();
                        });
                        
                        suggestionsContainer.appendChild(suggestionItem);
                    });
                    
                    searchInput.parentElement.appendChild(suggestionsContainer);
                }
            });
            
            // Hide suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target)) {
                    const suggestions = document.querySelector('.search-suggestions');
                    if (suggestions) {
                        suggestions.remove();
                    }
                }
            });
        }
    }

    addSearchSuggestions();
}); 