document.addEventListener('DOMContentLoaded', () => {
    // Seletores de elementos principais
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar nav ul');
    const contactForm = document.querySelector('.newsletter-form'); // Corrigido para newsletter-form no footer

    // --- Funcionalidade do Menu Hambúrguer ---
    if (menuToggle && navMenu) {
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
    }

    // --- Validação do Formulário de Newsletter (Antigo Formulário de Contato) ---
    // A seção de "contato" não existe mais no HTML, então renomeei para refletir a newsletter.
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nameInput = document.getElementById('newsletter-name');
            const emailInput = document.getElementById('newsletter-email');
            
            let isValid = true;

            // Validação do campo Nome
            if (nameInput.value.trim() === '') {
                alert('Por favor, preencha o seu nome.');
                nameInput.focus();
                isValid = false;
            }
            // Validação do campo Email
            else if (emailInput.value.trim() === '') {
                alert('Por favor, preencha o seu email.');
                emailInput.focus();
                isValid = false;
            } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Por favor, insira um email válido.');
                emailInput.focus();
                isValid = false;
            }

            if (isValid) {
                // Se a validação passar, você pode processar o formulário aqui (AJAX, fetch, etc.)
                alert('Cadastro realizado com sucesso! Você receberá nossos novos pacotes.');
                contactForm.reset(); // Limpa o formulário
                // Aqui você enviaria os dados para um servidor, por exemplo:
                // fetch('/caminho-do-seu-backend/newsletter-signup', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         name: nameInput.value,
                //         email: emailInput.value
                //     })
                // })
                // .then(response => response.json())
                // .then(data => console.log(data))
                // .catch(error => console.error('Erro:', error));
            }
        });
    }


    // --- Lógica do Carrossel de Feedback ---
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentFeedbackIndex = 0;

    function showFeedback(index) {
        // Oculta todos os cards movendo-os para fora da vista
        feedbackCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = `translateX(${100 * (index - currentFeedbackIndex)}%)`;
            card.style.position = 'absolute';
            card.style.opacity = '0'; // Adiciona transição de opacidade para um efeito mais suave
            card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'; // Transição para opacidade
        });

        // Mostra o card atual, centraliza e torna visível
        if (feedbackCards[index]) {
            feedbackCards[index].classList.add('active');
            feedbackCards[index].style.transform = 'translateX(0)';
            feedbackCards[index].style.position = 'relative';
            feedbackCards[index].style.opacity = '1';
            feedbackCards[index].style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
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
        showFeedback(0); // Exibe o primeiro card ao carregar
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

    // --- Script para o efeito flip card (destinos e festas) ---
    // Função para adicionar ou remover a classe 'active' ao clicar
    function setupFlipCard(cardSelector, viewBtnSelector, closeBtnSelector) {
        document.querySelectorAll(cardSelector).forEach(card => {
            const viewBtn = card.querySelector(viewBtnSelector);
            const closeBtn = card.querySelector(closeBtnSelector);

            if (viewBtn) {
                viewBtn.addEventListener('click', function(event) {
                    event.preventDefault(); // Impede o link de navegar

                    // Fechar todos os outros cards que estejam abertos (tanto destinos quanto festas)
                    document.querySelectorAll('.destination-card.active, .party-card.active').forEach(otherCard => {
                        if (otherCard !== card) { // Garante que não estamos fechando o próprio card que foi clicado
                            otherCard.classList.remove('active'); // Remove a classe 'active' para desvirar
                        }
                    });

                    card.classList.add('active'); // Adiciona a classe para virar o card clicado
                    // Opcional: Rola para o cartão para que o usuário veja os detalhes quando ele se abre
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', function(event) {
                    event.preventDefault(); // Impede o link de navegar
                    card.classList.remove('active'); // Remove a classe para desvirar o card
                });
            }
        });
    }

    // Aplica a função para os cards de destino
    // O seletor para o botão de "ver detalhes" nos destinos é '.package-details-toggle'
    setupFlipCard('.destination-card', '.package-details-toggle', '.close-details-btn');

    // Aplica a função para os cards de festa
    // O seletor para o botão de "ver detalhes" nas festas é '.view-details-btn'
    setupFlipCard('.party-card', '.view-details-btn', '.close-details-btn');
});
