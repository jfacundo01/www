document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    let mobileNavMenu = document.querySelector('.mobile-nav-menu');

    // Cria o menu mobile se ele não existir
    if (!mobileNavMenu) {
        mobileNavMenu = document.createElement('ul');
        mobileNavMenu.classList.add('mobile-nav-menu');
        document.body.appendChild(mobileNavMenu);

        // Copia os itens da navegação principal para o menu mobile
        const navItems = document.querySelectorAll('.navbar nav ul li');
        navItems.forEach(item => {
            const mobileItem = document.createElement('li');
            mobileItem.classList.add('nav-item');
            const mobileLink = item.querySelector('a').cloneNode(true);
            mobileLink.classList.add('nav-link');
            mobileItem.appendChild(mobileLink);
            mobileNavMenu.appendChild(mobileItem);
        });
    }

    menuToggle.addEventListener('click', function() {
        mobileNavMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Fechar menu mobile ao clicar em um link
    mobileNavMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileNavMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });

    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNavMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideMenu && mobileNavMenu.classList.contains('open')) {
            mobileNavMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });

    // Card Flip para Destinos e Festas
    document.querySelectorAll('.package-details-toggle, .view-details-btn, .close-details-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const cardInner = this.closest('.card-inner');
            if (cardInner) {
                cardInner.parentNode.classList.toggle('active');
            }
        });
    });

    // Carrossel de Feedback
    const feedbackCarousel = document.querySelector('.feedback-carousel');
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const prevFeedbackBtn = document.querySelector('.feedback-section .prev-btn');
    const nextFeedbackBtn = document.querySelector('.feedback-section .next-btn');
    let currentFeedbackIndex = 0;

    function showFeedback(index) {
        feedbackCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    if (feedbackCards.length > 0) {
        showFeedback(currentFeedbackIndex);

        prevFeedbackBtn.addEventListener('click', () => {
            currentFeedbackIndex = (currentFeedbackIndex - 1 + feedbackCards.length) % feedbackCards.length;
            showFeedback(currentFeedbackIndex);
        });

        nextFeedbackBtn.addEventListener('click', () => {
            currentFeedbackIndex = (currentFeedbackIndex + 1) % feedbackCards.length;
            showFeedback(currentFeedbackIndex);
        });
    }

    // Carrossel da Galeria
    const galleryCarousel = document.querySelector('.gallery-carousel');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevGalleryBtn = document.querySelector('.gallery-nav .prev-btn');
    const nextGalleryBtn = document.querySelector('.gallery-nav .next-btn');

    if (galleryItems.length > 0) {
        // Quantidade de itens visíveis por vez. Ajuste se o CSS mudar.
        // No CSS, definimos 3 itens em desktop.
        let itemsPerView = 3; 

        // Função para atualizar itemsPerView com base na largura da tela
        function updateItemsPerView() {
            if (window.innerWidth <= 768) { // Ex: mobile (1 item)
                itemsPerView = 1;
            } else if (window.innerWidth <= 992) { // Ex: tablet (2 itens)
                itemsPerView = 2;
            } else { // Desktop (3 itens)
                itemsPerView = 3;
            }
        }

        // Chamada inicial e ao redimensionar a tela
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);

        // Função para rolar o carrossel
        function scrollGallery(direction) {
            const itemWidth = galleryItems[0].offsetWidth + 20; // Largura do item + gap
            let scrollAmount;

            if (direction === 'next') {
                scrollAmount = itemWidth * itemsPerView;
                // Previne rolagem excessiva no final
                if (galleryCarousel.scrollLeft + galleryCarousel.offsetWidth + 1 >= galleryCarousel.scrollWidth) {
                    galleryCarousel.scrollLeft = 0; // Volta para o início se estiver no final
                } else {
                    galleryCarousel.scrollLeft += scrollAmount;
                }
            } else if (direction === 'prev') {
                scrollAmount = itemWidth * itemsPerView;
                // Previne rolagem excessiva no início
                if (galleryCarousel.scrollLeft <= 1) {
                    galleryCarousel.scrollLeft = galleryCarousel.scrollWidth - galleryCarousel.offsetWidth; // Vai para o final
                } else {
                    galleryCarousel.scrollLeft -= scrollAmount;
                }
            }
        }

        // Adiciona listeners para os botões da galeria
        prevGalleryBtn.addEventListener('click', () => scrollGallery('prev'));
        nextGalleryBtn.addEventListener('click', () => scrollGallery('next'));
    }
});
