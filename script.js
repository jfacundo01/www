document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar nav ul');
    const contactForm = document.querySelector('.contact-form');
    
    // --- Funcionalidade do Menu Hambúrguer ---
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link (melhora a UX em mobile)
    document.querySelectorAll('.navbar nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Validação do Formulário de Contato ---
    if (contactForm) { // Verifica se o formulário existe na página
        contactForm.addEventListener('submit', function(event) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Validação do campo Nome
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha o seu nome.');
                nameInput.focus();
                isValid = false;
            } 
            // Validação do campo Email (simples, apenas verifica se está vazio e formato básico)
            else if (emailInput.value.trim() === '') {
                alert('Por favor, preencha o seu email.');
                emailInput.focus();
                isValid = false;
            } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Por favor, insira um email válido.');
                emailInput.focus();
                isValid = false;
            }
            // Validação do campo Mensagem
            else if (messageInput.value.trim() === '') {
                alert('Por favor, escreva sua mensagem.');
                messageInput.focus();
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário se a validação falhar
            } else {
                // Se a validação passar, você pode enviar o formulário aqui (AJAX, fetch, etc.)
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset(); // Limpa o formulário
                event.preventDefault(); // Impede o envio real do formulário (para demonstração)
            }
        });
    }

    // --- Funcionalidade: Detalhes do Pacote (Flip Card) ---
    const packageDetailsToggles = document.querySelectorAll('.package-details-toggle');
    const closeDetailsButtons = document.querySelectorAll('.close-details-btn');

    packageDetailsToggles.forEach(toggleButton => {
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link (#)
            const card = this.closest('.destination-card'); // Encontra o card pai (o que foi clicado)
            
            // Primeiro, vamos FECHAR todos os outros cards que estejam virados
            document.querySelectorAll('.destination-card').forEach(otherCard => {
                // Se o outro card estiver ativo (virado) e não for o card clicado
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active'); // Desvira o outro card
                }
            });

            // Agora, alterna a classe 'active' no cartão CLICADO
            // Isso fará com que o .card-inner dentro dele vire/desvire via CSS
            card.classList.toggle('active'); 
            
            // Opcional: Rola para o cartão para que o usuário veja os detalhes quando ele se abre
            if (card.classList.contains('active')) { // Se o card estiver ativo (virado)
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    closeDetailsButtons.forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            const card = this.closest('.destination-card'); // Encontra o cartão pai
            if (card) {
                card.classList.remove('active'); // Garante que a classe 'active' é removida ao fechar
            }
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