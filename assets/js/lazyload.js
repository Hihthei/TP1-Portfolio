/**
 * Script pour le chargement progressif des images
 * Améliore les performances en chargeant uniquement les images visibles à l'écran
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les images qui doivent être chargées progressivement
    const lazyImages = document.querySelectorAll('.project-card img, .gallery-grid img');
    
    // Configuration de l'observateur d'intersection
    const imageObserverOptions = {
        root: null, // observer par rapport à la fenêtre du navigateur
        rootMargin: '0px 0px 100px 0px', // marge pour charger les images avant qu'elles soient visibles
        threshold: 0.1 // déclencher lorsque 10% de l'image est visible
    };
    
    // Créer une fonction de rappel pour l'observateur
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Ajouter une classe pour l'animation de fondu
                img.classList.add('lazy-fade-in');
                
                // Arrêter d'observer une fois l'image chargée
                observer.unobserve(img);
            }
        });
    };
    
    // Créer l'observateur s'il est supporté par le navigateur
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(handleIntersection, imageObserverOptions);
        
        // Observer chaque image
        lazyImages.forEach(img => {
            // Initialiser le style pour l'animation
            img.style.opacity = '0';
            imageObserver.observe(img);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        lazyImages.forEach(img => {
            img.style.opacity = '1';
        });
    }
    
    // Ajouter une animation aux cartes de projets
    const projectCards = document.querySelectorAll('.project-card, .tp-card');
    
    projectCards.forEach((card, index) => {
        // Ajouter un délai pour l'apparition progressive
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Déclencher l'animation après un délai basé sur l'index
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});