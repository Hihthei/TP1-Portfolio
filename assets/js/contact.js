// Validation et simulation d'envoi du formulaire de contact

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation supplémentaire côté client
            if (name.length < 2) {
                showNotification('Veuillez entrer un nom valide', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            if (subject === '') {
                showNotification('Veuillez sélectionner un sujet', 'error');
                return;
            }
            
            if (message.length < 10) {
                showNotification('Votre message doit contenir au moins 10 caractères', 'error');
                return;
            }
            
            // Simulation d'envoi (délai artificiel)
            showNotification('Envoi en cours...', 'info');
            
            setTimeout(function() {
                // Réinitialisation du formulaire
                contactForm.reset();
                showNotification('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            }, 1500);
        });
    }
    
    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fonction pour afficher les notifications
    function showNotification(message, type) {
        // Vérifier si une notification existe déjà
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Créer une nouvelle notification
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        
        // Insérer la notification avant le bouton d'envoi
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.parentNode.insertBefore(notification, submitBtn);
        
        // Faire défiler jusqu'à la notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Supprimer la notification après quelques secondes si c'est un succès
        if (type === 'success' || type === 'info') {
            setTimeout(function() {
                notification.classList.add('fade-out');
                setTimeout(function() {
                    notification.remove();
                }, 500);
            }, 5000);
        }
    }
});