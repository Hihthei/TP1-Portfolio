document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.project-card img, .gallery-grid img');

    const imageObserverOptions = {
        root: null,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.1
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.classList.add('lazy-fade-in');
                
                observer.unobserve(img);
            }
        });
    };
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(handleIntersection, imageObserverOptions);
        
        lazyImages.forEach(img => {
            img.style.opacity = '0';
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            img.style.opacity = '1';
        });
    }
    
    const projectCards = document.querySelectorAll('.project-card, .tp-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});