document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar nav ul'); // Onde os links de navegação principais estão
    const topBar = document.getElementById('topBar'); // Referência à top bar (certifique-se de que sua top bar tenha id="topBar")
    const body = document.body;
    const navbarLogo = document.querySelector('.navbar .logo'); // Seleciona a logo da navbar

    // Criar ou obter o menu mobile
    let mobileNavMenu = document.querySelector('.mobile-nav-menu');

    if (!mobileNavMenu) {
        mobileNavMenu = document.createElement('ul');
        mobileNavMenu.classList.add('mobile-nav-menu');
        document.body.appendChild(mobileNavMenu);

        // Copia os itens da navegação principal para o menu mobile
        const navItems = document.querySelectorAll('.navbar nav ul li a'); // Seleciona diretamente os 'a'
        navItems.forEach(link => {
            const mobileItem = document.createElement('li');
            mobileItem.classList.add('nav-item'); // Adiciona a classe para aplicar estilos do mobile-nav-menu
            const mobileLink = link.cloneNode(true); // Clona o link
            mobileLink.classList.add('nav-link'); // Adiciona a classe para aplicar estilos do mobile-nav-menu
            mobileItem.appendChild(mobileLink);
            mobileNavMenu.appendChild(mobileItem);
        });
    }

    // --- Funcionalidade do Menu Mobile ---
    menuToggle.addEventListener('click', function() {
        mobileNavMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        body.classList.toggle('no-scroll'); // Adiciona/remove classe para desativar scroll do body

        // Esconde ou mostra a top bar e a logo da navbar
        if (mobileNavMenu.classList.contains('open')) {
            if (topBar) topBar.classList.add('hidden-top-bar');
            if (navbarLogo) navbarLogo.style.display = 'none'; // Esconde a logo
        } else {
            if (topBar) topBar.classList.remove('hidden-top-bar');
            if (navbarLogo) navbarLogo.style.display = 'flex'; // Mostra a logo (ou block, dependendo do display original)
        }
    });

    // Fechar menu mobile ao clicar em um link
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão da âncora
            mobileNavMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            body.classList.remove('no-scroll');
            if (topBar) topBar.classList.remove('hidden-top-bar'); // Garante que a top bar volte a aparecer
            if (navbarLogo) navbarLogo.style.display = 'flex'; // Garante que a logo volte a aparecer

            // Rolar suavemente para a seção
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Atualizar classe 'active' nos links do menu (desktop e mobile)
            document.querySelectorAll('.navbar nav ul li a, .mobile-nav-menu li a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active'); // Ativa o link clicado no menu mobile
            // Tenta ativar o link correspondente no menu desktop (se existir)
            const desktopLink = document.querySelector(`.navbar nav ul li a[href="#${targetId}"]`);
            if (desktopLink) {
                desktopLink.classList.add('active');
            }
        });
    });

    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', function(event) {
        // Verifica se o clique não foi dentro do menu mobile, do toggle ou da própria navbar (apenas para desktop)
        const isClickInsideMenu = mobileNavMenu.contains(event.target) || menuToggle.contains(event.target);
        const isClickInsideNavbar = !mobileNavMenu.classList.contains('open') && navbarNav.contains(event.target); // Não fechar se estiver interagindo com o menu desktop

        if (!isClickInsideMenu && !isClickInsideNavbar && mobileNavMenu.classList.contains('open')) {
            mobileNavMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            body.classList.remove('no-scroll');
            if (topBar) topBar.classList.remove('hidden-top-bar'); // Garante que a top bar volte a aparecer
            if (navbarLogo) navbarLogo.style.display = 'flex'; // Garante que a logo volte a aparecer
        }
    });

    // --- Atualizar link ativo na navbar ao rolar a página ---
    const sections = document.querySelectorAll('main section[id]'); // Seleciona apenas seções dentro de <main> com ID
    window.addEventListener('scroll', () => {
        let currentActiveSectionId = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight; // Ajusta o topo pela altura da navbar
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        // Remove 'active' de todos os links e adiciona ao link da seção atual
        document.querySelectorAll('.navbar nav ul li a, .mobile-nav-menu li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Card Flip para Destinos e Festas ---
    document.querySelectorAll('.destination-card, .party-card').forEach(card => {
        card.addEventListener('click', function(event) {
            // Evita que o clique no botão feche o card imediatamente após abrir
            if (!event.target.classList.contains('package-details-toggle') && !event.target.classList.contains('view-details-btn') && !event.target.classList.contains('close-details-btn')) {
                this.classList.toggle('active');
            }
        });
    });

    document.querySelectorAll('.package-details-toggle, .view-details-btn, .close-details-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Previne a rolagem da página
            const card = this.closest('.destination-card') || this.closest('.party-card');
            if (card) {
                card.classList.toggle('active');
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

    if (galleryItems.length > 0 && galleryCarousel) {
        // Função para atualizar itemsPerView com base na largura da tela
        function getItemsPerView() {
            if (window.innerWidth <= 768) { // Ex: mobile (1 item)
                return 1;
            } else if (window.innerWidth <= 992) { // Ex: tablet (2 itens)
                return 2;
            } else { // Desktop (3 itens)
                return 3;
            }
        }

        // Função para rolar o carrossel
        function scrollGallery(direction) {
            const itemWidth = galleryItems[0].offsetWidth + 20; // Largura do item + gap (20px)
            const itemsToShow = getItemsPerView();
            const scrollAmount = itemWidth * itemsToShow;

            if (direction === 'next') {
                // Se estiver no final, volta para o início
                if (galleryCarousel.scrollLeft + galleryCarousel.offsetWidth + 1 >= galleryCarousel.scrollWidth) {
                    galleryCarousel.scrollLeft = 0;
                } else {
                    galleryCarousel.scrollLeft += scrollAmount;
                }
            } else if (direction === 'prev') {
                // Se estiver no início, vai para o final
                if (galleryCarousel.scrollLeft <= 1) {
                    galleryCarousel.scrollLeft = galleryCarousel.scrollWidth - galleryCarousel.offsetWidth;
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
