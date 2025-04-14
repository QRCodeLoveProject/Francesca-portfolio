document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const menuContainer = document.querySelector('.menu-container');
    
    if (hamburger && menuContainer) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menuContainer.classList.toggle('active');
            
            // Blocca lo scroll quando il menu è aperto
            if (menuContainer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Chiudi menu quando si clicca su un link
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menuContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Slideshow automatico
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (slides.length > 0) {
        // Imposta il primo slide come attivo
        slides[0].classList.add('active');
        
        // Cambia slide ogni 5 secondi
        setInterval(nextSlide, 5000);
    }
    
    // Header scroll effect - ELIMINATO
    
    // Smooth scroll per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Animazione gallery items al caricamento della pagina
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    // Inizializza tutti gli elementi gallery-item con opacity 0 e transform
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Animazione elementi quando entrano nel viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .contact-item, .skill');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                el.classList.add('animate');
            }
        });
    }
    
    // Aggiungi le classi CSS necessarie per l'animazione
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .about-content, .contact-item, .skill {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
        .about-content.animate, .contact-item.animate, .skill.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `, styleSheet.cssRules.length);
    
    // Trigger dell'animazione al caricamento e allo scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});