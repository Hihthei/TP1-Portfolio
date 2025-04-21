/**
 * Script pour animer les sections au défilement
 * Ajoute des effets d'apparition pour améliorer l'expérience utilisateur
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les sections à animer
    const sections = document.querySelectorAll('.project-content > div, .project-header, .contact-header, .contact-content, .cv-header, .cv-section, .presentation, .projects, .tp-header, .tp-card');
    
    // Ajouter la classe pour l'animation
    sections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    // Configuration de l'observateur d'intersection
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Créer une fonction de rappel pour l'observateur
    const handleSectionIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe pour déclencher l'animation
                entry.target.classList.add('visible');
                
                // Arrêter d'observer une fois la section animée
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'observateur s'il est supporté par le navigateur
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(handleSectionIntersection, sectionObserverOptions);
        
        // Observer chaque section
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        sections.forEach(section => {
            section.classList.add('visible');
        });
    }
    
    // Animation pour la navigation active
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        // Vérifier si le lien correspond à la page actuelle
        if (link.getAttribute('href') === currentPath || 
            (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '../index.html' && link.getAttribute('href') !== 'index.html')) {
            link.classList.add('active-nav');
        }
        
        // Ajouter un effet hover avec délai
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });
});