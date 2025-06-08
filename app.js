class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 10;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideDotsContainer = document.getElementById('slideDots');
        this.currentSlideElement = document.querySelector('.current-slide');
        this.totalSlidesElement = document.querySelector('.total-slides');
        
        this.init();
    }
    
    init() {
        this.createSlideDots();
        this.updateSlideIndicator();
        this.updateNavigationButtons();
        this.bindEvents();
        this.showSlide(1);
    }
    
    createSlideDots() {
        this.slideDotsContainer.innerHTML = '';
        for (let i = 1; i <= this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === this.currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(i));
            this.slideDotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes that are more significant than vertical ones
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.previousSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    showSlide(slideNumber) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide with animation
        const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (targetSlide) {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                targetSlide.classList.add('active');
            }, 50);
        }
        
        this.updateSlideDots();
        this.updateSlideIndicator();
        this.updateNavigationButtons();
    }
    
    updateSlideDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index + 1 === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateSlideIndicator() {
        this.currentSlideElement.textContent = this.currentSlide;
        this.totalSlidesElement.textContent = this.totalSlides;
    }
    
    updateNavigationButtons() {
        // Update previous button
        if (this.currentSlide <= 1) {
            this.prevBtn.disabled = true;
        } else {
            this.prevBtn.disabled = false;
        }
        
        // Update next button
        if (this.currentSlide >= this.totalSlides) {
            this.nextBtn.disabled = true;
        } else {
            this.nextBtn.disabled = false;
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.showSlide(this.currentSlide);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.showSlide(this.currentSlide);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.showSlide(this.currentSlide);
        }
    }
}

// Enhanced animations and effects
class PresentationEffects {
    constructor() {
        this.initializeEffects();
    }
    
    initializeEffects() {
        this.addScrollAnimations();
        this.addHoverEffects();
        this.addLoadingAnimation();
    }
    
    addScrollAnimations() {
        // Animate elements when they come into view
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
        
        // Observe all content elements
        document.querySelectorAll('.content-list li, .character-card, .plot-section, .martial-art-card, .theme-card, .conclusion-point').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    addHoverEffects() {
        // Add subtle hover effects to interactive elements
        document.querySelectorAll('.character-card, .martial-art-card, .theme-card, .plot-section').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    addLoadingAnimation() {
        // Add a subtle loading animation for images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.filter = 'blur(0)';
            });
            
            // Set initial state
            img.style.opacity = '0';
            img.style.filter = 'blur(5px)';
            img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
            
            // If image is already loaded
            if (img.complete) {
                img.style.opacity = '1';
                img.style.filter = 'blur(0)';
            }
        });
    }
}

// Accessibility enhancements
class AccessibilityEnhancements {
    constructor() {
        this.initializeA11y();
    }
    
    initializeA11y() {
        this.addAriaLabels();
        this.addFocusManagement();
        this.addScreenReaderSupport();
    }
    
    addAriaLabels() {
        // Add ARIA labels to navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.setAttribute('aria-label', '前往上一張投影片');
        }
        
        if (nextBtn) {
            nextBtn.setAttribute('aria-label', '前往下一張投影片');
        }
        
        // Add ARIA labels to slide dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.setAttribute('aria-label', `前往第 ${index + 1} 張投影片`);
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
        });
    }
    
    addFocusManagement() {
        // Ensure proper focus management
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dot.click();
                }
            });
        });
    }
    
    addScreenReaderSupport() {
        // Add live region for slide changes
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'slideAnnouncement';
        document.body.appendChild(liveRegion);
        
        // Update live region when slides change
        const originalShowSlide = PresentationApp.prototype.showSlide;
        PresentationApp.prototype.showSlide = function(slideNumber) {
            originalShowSlide.call(this, slideNumber);
            
            const slideTitle = document.querySelector(`[data-slide="${slideNumber}"] .slide-title`);
            if (slideTitle && liveRegion) {
                liveRegion.textContent = `第 ${slideNumber} 張投影片：${slideTitle.textContent}`;
            }
        };
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.initializeOptimizations();
    }
    
    initializeOptimizations() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        // Implement lazy loading for images
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--duration-fast', '0ms');
            document.documentElement.style.setProperty('--duration-normal', '0ms');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation functionality
    const presentation = new PresentationApp();
    
    // Initialize enhancements
    const effects = new PresentationEffects();
    const accessibility = new AccessibilityEnhancements();
    const performance = new PerformanceOptimizer();
    
    // Add custom event for slide changes
    window.presentationApp = presentation;
    
    // Optional: Add fullscreen toggle
    const addFullscreenToggle = () => {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.innerHTML = '⛶';
        fullscreenBtn.className = 'btn btn--secondary';
        fullscreenBtn.style.position = 'fixed';
        fullscreenBtn.style.top = '20px';
        fullscreenBtn.style.right = '20px';
        fullscreenBtn.style.zIndex = '1000';
        fullscreenBtn.setAttribute('aria-label', '切換全螢幕模式');
        
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
        
        document.body.appendChild(fullscreenBtn);
    };
    
    // Add fullscreen toggle if supported
    if (document.documentElement.requestFullscreen) {
        addFullscreenToggle();
    }
    
    // Add print styles handler
    window.addEventListener('beforeprint', () => {
        // Show all slides for printing
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.display = 'block';
            slide.style.pageBreakAfter = 'always';
        });
    });
    
    window.addEventListener('afterprint', () => {
        // Restore normal slide display
        presentation.showSlide(presentation.currentSlide);
    });
    
    console.log('亂馬1/2 簡報應用程序已成功載入！');
});