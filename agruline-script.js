// ==========================================
// AGRULINE - AGRU CHILE LANDING PAGE SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // TABS FUNCTIONALITY
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ==========================================
    // SPECIFICATIONS TABS
    // ==========================================
    const specButtons = document.querySelectorAll('.spec-button');
    const specPanes = document.querySelectorAll('.spec-pane');
    
    specButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSpec = button.getAttribute('data-spec');
            
            // Remove active class from all buttons and panes
            specButtons.forEach(btn => btn.classList.remove('active'));
            specPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetSpec).classList.add('active');
        });
    });
    
    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80; // Height of sticky header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // FORM VALIDATION AND SUBMISSION
    // ==========================================
    const cotizacionForm = document.getElementById('cotizacion-form');
    
    if (cotizacionForm) {
        cotizacionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(cotizacionForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.nombre || !data.email || !data.telefono || !data.empresa) {
                alert('Por favor complete todos los campos obligatorios.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor ingrese un email válido.');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Form data:', data);
            
            // Show success message
            alert('¡Gracias por su consulta! Nos pondremos en contacto con usted pronto.');
            
            // Reset form
            cotizacionForm.reset();
            
            // Google Analytics event (if GA is configured)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Cotizacion AGRULINE',
                    'value': 1
                });
            }
            
            // Facebook Pixel event (if configured)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Cotizacion AGRULINE',
                    content_category: 'Tuberias HDPE'
                });
            }
        });
    }
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
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
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ==========================================
    // STICKY HEADER ON SCROLL
    // ==========================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // CLICK TRACKING FOR CTA BUTTONS
    // ==========================================
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            // Google Analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': buttonText,
                    'value': 1
                });
            }
            
            // Facebook Pixel event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', {
                    content_name: buttonText,
                    content_category: 'CTA Click'
                });
            }
        });
    });
    
    // ==========================================
    // PHONE NUMBER CLICK TRACKING
    // ==========================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Number Click',
                    'value': 1
                });
            }
        });
    });
    
    // ==========================================
    // EMAIL CLICK TRACKING
    // ==========================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'event_category': 'Contact',
                    'event_label': 'Email Click',
                    'value': 1
                });
            }
        });
    });
    
    // ==========================================
    // WHATSAPP BUTTON TRACKING
    // ==========================================
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp Button Click',
                    'value': 1
                });
            }
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: 'WhatsApp',
                    content_category: 'Instant Messaging'
                });
            }
        });
    }
    
    // ==========================================
    // TAB CLICK TRACKING
    // ==========================================
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.trim();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tab_view', {
                    'event_category': 'Engagement',
                    'event_label': `Aplicaciones - ${tabName}`,
                    'value': 1
                });
            }
        });
    });
    
    // ==========================================
    // PDF DOWNLOAD TRACKING (if you add download links)
    // ==========================================
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.getAttribute('href').split('/').pop();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'file_download', {
                    'event_category': 'Downloads',
                    'event_label': fileName,
                    'value': 1
                });
            }
        });
    });
    
    // ==========================================
    // SCROLL DEPTH TRACKING
    // ==========================================
    let scrollMarks = {
        25: false,
        50: false,
        75: false,
        90: false
    };
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        Object.keys(scrollMarks).forEach(mark => {
            if (scrollPercent >= parseInt(mark) && !scrollMarks[mark]) {
                scrollMarks[mark] = true;
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'Engagement',
                        'event_label': `${mark}% Scrolled`,
                        'value': parseInt(mark)
                    });
                }
            }
        });
    });
    
    // ==========================================
    // TIME ON PAGE TRACKING
    // ==========================================
    let startTime = new Date().getTime();
    
    window.addEventListener('beforeunload', () => {
        const endTime = new Date().getTime();
        const timeSpent = Math.round((endTime - startTime) / 1000); // in seconds
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'Engagement',
                'event_label': 'Seconds on Page',
                'value': timeSpent
            });
        }
    });
    
    // ==========================================
    // COPY TO CLIPBOARD (for contact info)
    // ==========================================
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }
    
    // Add copy functionality to contact items if needed
    const contactEmails = document.querySelectorAll('.contact-item a[href^="mailto:"]');
    contactEmails.forEach(email => {
        email.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const emailText = this.textContent;
            copyToClipboard(emailText);
        });
    });
    
    // ==========================================
    // LAZY LOADING FOR IMAGES (when you add real images)
    // ==========================================
    if ('IntersectionObserver' in window) {
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
    
    // ==========================================
    // CONSOLE LOG FOR DEBUGGING
    // ==========================================
    console.log('AGRULINE Landing Page - Scripts loaded successfully');
    console.log('Analytics tracking enabled');
    
});

// (Carrusel eliminado para página de servicio)

// ==========================================
// GOOGLE ADS CONVERSION TRACKING
// ==========================================
function trackConversion(conversionLabel) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/' + conversionLabel
        });
    }
}

// Call this function when form is successfully submitted
// Example: trackConversion('abc123xyz');
