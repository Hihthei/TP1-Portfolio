document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.project-content > div, .project-header, .contact-header, .contact-content, .cv-header, .cv-section, .presentation, .projects, .tp-header, .tp-card');
    
    sections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleSectionIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(handleSectionIntersection, sectionObserverOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        sections.forEach(section => {
            section.classList.add('visible');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '../index.html' && link.getAttribute('href') !== 'index.html')) {
            link.classList.add('active-nav');
        }
        
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });
});