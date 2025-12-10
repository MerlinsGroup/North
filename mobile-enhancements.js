// ==========================================
// MOBILE ENHANCEMENTS & RESPONSIVE FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // MOBILE MENU IMPROVEMENTS
    // ==========================================

    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;

    // Enhanced mobile menu toggle with body scroll lock
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');

        if (!isOpen) {
            mobileMenu.classList.add('active');
            menuBtn.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scroll
            menuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.style.overflow = ''; // Restore scroll
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // Add touch event support for better mobile experience
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
        menuBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && menuBtn) {
            if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ==========================================
    // TOUCH-FRIENDLY DROPDOWN MENUS
    // ==========================================

    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            const isOpen = dropdown.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });

            // Toggle this dropdown
            if (!isOpen) {
                dropdown.classList.add('active');
            }
        });
    });

    // ==========================================
    // SMOOTH SCROLL WITH OFFSET FOR FIXED HEADER
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuBtn.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    });

    // ==========================================
    // VIEWPORT HEIGHT FIX FOR MOBILE BROWSERS
    // ==========================================

    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // ==========================================
    // LAZY LOADING FOR IMAGES
    // ==========================================

    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ==========================================
    // FORM VALIDATION & ENHANCEMENT
    // ==========================================

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Add proper input types for mobile keyboards
        const phoneInputs = form.querySelectorAll('input[name="phone"], input[type="tel"]');
        phoneInputs.forEach(input => {
            input.setAttribute('type', 'tel');
            input.setAttribute('inputmode', 'tel');
        });

        const emailInputs = form.querySelectorAll('input[name="email"], input[type="email"]');
        emailInputs.forEach(input => {
            input.setAttribute('type', 'email');
            input.setAttribute('inputmode', 'email');
        });

        // Add form validation
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Scroll to first error field
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });

    // ==========================================
    // RESPONSIVE TABLE WRAPPER
    // ==========================================

    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // ==========================================
    // TOUCH SWIPE FOR IMAGE GALLERIES
    // ==========================================

    const galleries = document.querySelectorAll('.showcase-grid, .projects-gallery');

    galleries.forEach(gallery => {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;

        gallery.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });

        gallery.addEventListener('touchend', () => {
            isDown = false;
        });
    });

    // ==========================================
    // DEVICE DETECTION & CLASS ADDITION
    // ==========================================

    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const html = document.documentElement;

        // Detect iOS
        if (/ipad|iphone|ipod/.test(userAgent)) {
            html.classList.add('ios');

            if (/ipad/.test(userAgent)) {
                html.classList.add('ipad');
            } else {
                html.classList.add('iphone');
            }
        }

        // Detect Android
        if (/android/.test(userAgent)) {
            html.classList.add('android');
        }

        // Detect touch capability
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            html.classList.add('touch');
        } else {
            html.classList.add('no-touch');
        }

        // Detect screen size
        updateScreenSizeClass();
    }

    function updateScreenSizeClass() {
        const html = document.documentElement;
        const width = window.innerWidth;

        // Remove existing size classes
        html.classList.remove('xs', 'sm', 'md', 'lg', 'xl');

        // Add appropriate size class
        if (width < 576) {
            html.classList.add('xs');
        } else if (width < 768) {
            html.classList.add('sm');
        } else if (width < 1024) {
            html.classList.add('md');
        } else if (width < 1440) {
            html.classList.add('lg');
        } else {
            html.classList.add('xl');
        }
    }

    detectDevice();
    window.addEventListener('resize', updateScreenSizeClass);

    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================

    // Debounce function for scroll and resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll events
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    }, 100));

    // ==========================================
    // ACCESSIBILITY IMPROVEMENTS
    // ==========================================

    // Add ARIA labels
    if (menuBtn) {
        menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenu) {
        mobileMenu.setAttribute('aria-label', 'Navigation menu');
    }

    // ==========================================
    // PRINT OPTIMIZATION
    // ==========================================

    window.addEventListener('beforeprint', function() {
        // Expand all collapsed content for printing
        document.querySelectorAll('.dropdown-menu, .mobile-menu').forEach(element => {
            element.style.display = 'block';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore original state after printing
        document.querySelectorAll('.dropdown-menu, .mobile-menu').forEach(element => {
            element.style.display = '';
        });
    });
});

// Make toggleMobileMenu globally accessible for onclick attribute
window.toggleMobileMenu = function() {
    const event = new Event('click');
    document.querySelector('.mobile-menu-btn').dispatchEvent(event);
};