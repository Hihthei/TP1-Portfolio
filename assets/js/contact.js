document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
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
            
            showNotification('Envoi en cours...', 'info');
            
            setTimeout(function() {
                contactForm.reset();
                showNotification('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.parentNode.insertBefore(notification, submitBtn);
        
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
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