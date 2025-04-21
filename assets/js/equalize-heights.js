document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    let lastWindowWidth = window.innerWidth;
    let currentRowAssignments = [];

    function equalizeHeights() {
        const cards = document.querySelectorAll('.tp-card');
        if (!cards.length) return;
        
        const currentWidth = window.innerWidth;
        const isHorizontalResize = Math.abs(currentWidth - lastWindowWidth) > 5;
        lastWindowWidth = currentWidth;

        let rows = [];
        if (isHorizontalResize || currentRowAssignments.length === 0) {
            resetSectionHeights();
            
            rows = identifyRows(cards);
            currentRowAssignments = rows;
        } else {
            rows = currentRowAssignments;
        }
        
        rows.forEach(rowCards => {
            equalizeHeaderElements(rowCards);
            
            equalizeRowSections(rowCards);
        });
    }
    
    function resetSectionHeights() {
        document.querySelectorAll('.tp-card-header h2').forEach(title => {
            title.style.height = '';
        });
        
        document.querySelectorAll('.tp-tags').forEach(tagArea => {
            tagArea.style.height = '';
        });
        
        document.querySelectorAll('.tp-section').forEach(section => {
            section.style.height = '';
        });
    }
    
    function identifyRows(cards) {
        const rows = [];
        let currentRow = [];
        let previousTop = -1;
        
        const cardsArray = Array.from(cards);
        
        cardsArray.sort((a, b) => {
            return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        });
        
        cardsArray.forEach(card => {
            const rect = card.getBoundingClientRect();
            
            if (previousTop === -1 || Math.abs(rect.top - previousTop) > 10) {
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }
                currentRow = [card];
                previousTop = rect.top;
            } else {
                currentRow.push(card);
            }
        });
        
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }
        
        return rows;
    }
    
    function equalizeHeaderElements(rowCards) {
        let maxTitleHeight = 0;
        rowCards.forEach(card => {
            const title = card.querySelector('.tp-card-header h2');
            if (title) {
                const height = title.scrollHeight;
                maxTitleHeight = Math.max(maxTitleHeight, height);
            }
        });
        
        if (maxTitleHeight > 0) {
            rowCards.forEach(card => {
                const title = card.querySelector('.tp-card-header h2');
                if (title && Math.abs(title.clientHeight - maxTitleHeight) > 2) {
                    title.style.height = `${maxTitleHeight}px`;
                }
            });
        }
        
        let maxTagsHeight = 0;
        rowCards.forEach(card => {
            const tagsArea = card.querySelector('.tp-tags');
            if (tagsArea) {
                const height = tagsArea.scrollHeight;
                maxTagsHeight = Math.max(maxTagsHeight, height);
            }
        });
        
        if (maxTagsHeight > 0) {
            rowCards.forEach(card => {
                const tagsArea = card.querySelector('.tp-tags');
                if (tagsArea && Math.abs(tagsArea.clientHeight - maxTagsHeight) > 2) {
                    tagsArea.style.height = `${maxTagsHeight}px`;
                }
            });
        }
    }
    
    function equalizeRowSections(rowCards) {
        const sectionTypes = ['tp-summary', 'tp-technologies', 'tp-actions'];
        
        sectionTypes.forEach(sectionClass => {
            let maxHeight = 0;
            
            rowCards.forEach(card => {
                const section = card.querySelector(`.${sectionClass}`);
                if (section) {
                    const height = section.scrollHeight;
                    maxHeight = Math.max(maxHeight, height);
                }
            });
            
            if (maxHeight > 0) {
                rowCards.forEach(card => {
                    const section = card.querySelector(`.${sectionClass}`);
                    if (section && Math.abs(section.clientHeight - maxHeight) > 2) {
                        section.style.height = `${maxHeight}px`;
                    }
                });
            }
        });
    }
    
    const observeChanges = function() {
        const observer = new MutationObserver(function(mutations) {
            let needsUpdate = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || 
                    (mutation.type === 'attributes' && 
                     (mutation.attributeName === 'class' || mutation.attributeName === 'style'))) {
                    needsUpdate = true;
                }
            });
            
            if (needsUpdate) {
                clearTimeout(observerTimer);
                observerTimer = setTimeout(equalizeHeights, 100);
            }
        });
        
        const container = document.querySelector('.tp-grid');
        if (container) {
            observer.observe(container, { 
                childList: true, 
                subtree: true, 
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    };
    
    let resizeTimer;
    let observerTimer;
    
    window.addEventListener('load', function() {
        equalizeHeights();
        observeChanges();
    });
    
    equalizeHeights();
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(equalizeHeights, 250);
    });
    
    window.addEventListener('orientationchange', function() {
        currentRowAssignments = [];
        
        setTimeout(equalizeHeights, 300);
    });
    
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            if (window.scrollY % 50 < 10) {
                equalizeHeights();
            }
        }, 200);
    });
});