document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu Responsivo ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar o ícone do menu
        });

        // Fechar o menu ao clicar em um link (apenas em mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) { // Ajuste este breakpoint conforme seu CSS
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Lógica do Flip Card para Destinos ---
    const packageDetailsToggles = document.querySelectorAll('.package-details-toggle');
    const closeDetailsBtns = document.querySelectorAll('.close-details-btn');

    packageDetailsToggles.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const cardInner = button.closest('.destination-card').querySelector('.card-inner');
            const destinationCard = button.closest('.destination-card');
            
            // Adiciona a classe 'active' para virar o card e aplicar sombra
            destinationCard.classList.add('active');
        });
    });

    closeDetailsBtns.forEach(button => {
        button.addEventListener('click', () => {
            const cardInner = button.closest('.destination-card').querySelector('.card-inner');
            const destinationCard = button.closest('.destination-card');
            
            // Remove a classe 'active' para desvirar o card e remover sombra
            destinationCard.classList.remove('active');
        });
    });

    // --- Lógica do Carrossel de Feedback ---
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentFeedbackIndex = 0;

    function showFeedback(index) {
        // Oculta todos os cards
        feedbackCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = `translateX(${100 * (index - currentFeedbackIndex)}%)`; // Move para fora da vista
            card.style.position = 'absolute'; // Garante que não ocupem espaço
        });

        // Mostra o card atual e o centraliza
        if (feedbackCards[index]) {
            feedbackCards[index].classList.add('active');
            feedbackCards[index].style.transform = 'translateX(0)';
            feedbackCards[index].style.position = 'relative'; // O card ativo ocupa espaço
        }
        currentFeedbackIndex = index;
    }

    function nextFeedback() {
        let newIndex = currentFeedbackIndex + 1;
        if (newIndex >= feedbackCards.length) {
            newIndex = 0; // Volta para o primeiro
        }
        showFeedback(newIndex);
    }

    function prevFeedback() {
        let newIndex = currentFeedbackIndex - 1;
        if (newIndex < 0) {
            newIndex = feedbackCards.length - 1; // Vai para o último
        }
        showFeedback(newIndex);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevFeedback);
        nextBtn.addEventListener('click', nextFeedback);
    }

    // Iniciar o carrossel mostrando o primeiro feedback
    if (feedbackCards.length > 0) {
        showFeedback(0);
    }

    // Opcional: Auto-slide do carrossel
    let autoSlideInterval = setInterval(nextFeedback, 7000); // Muda a cada 7 segundos

    // Pausar auto-slide ao passar o mouse sobre o carrossel
    const feedbackCarousel = document.querySelector('.feedback-carousel');
    if (feedbackCarousel) {
        feedbackCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        feedbackCarousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextFeedback, 7000);
        });
    }

});