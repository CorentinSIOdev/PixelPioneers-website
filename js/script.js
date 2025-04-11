document.addEventListener('DOMContentLoaded', function () {
    // Carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    function updateSlidePosition() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    updateSlidePosition();
    startAutoSlide();

    // Scroll behavior for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();     

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Trailer
    let trailerSection = document.querySelector(".trailer"); 
    if (!trailerSection) return; 

    let trailerIframe = trailerSection.querySelector("iframe");
    if (!trailerIframe) return; 

    let videoURL = new URL(trailerIframe.src);
    videoURL.searchParams.set("autoplay", "1"); 
    videoURL.searchParams.set("mute", "1"); 
    
    function playTrailer(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trailerIframe.src = videoURL.href;
                observer.unobserve(trailerSection); 
            }
        });
    }

    let observer = new IntersectionObserver(playTrailer, {
        root: null, 
        threshold: 0.5, 
    });

    observer.observe(trailerSection);


    // Scroll Reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Easter Egg - Konami Code
    const konamiCode = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];

    let inputSequence = [];

    document.addEventListener('keydown', function (e) {
        inputSequence.push(e.key);
        if (inputSequence.length > konamiCode.length) {
            inputSequence.shift();
        }

        if (inputSequence.join('') === konamiCode.join('')) {
            triggerEasterEgg();
            inputSequence = [];
        }
    });

    function triggerEasterEgg() {
        // Add glitch effect to the body
        document.body.classList.add('glitch-mode');
    
        // Add sound effect
        // TODO : Ajouter le son de glitch
        const audio = new Audio('assets/sounds/glitch-secret.mp3');
        audio.volume = 0.5;
        audio.play();
    
        // Add overlay with text
        const overlay = document.createElement('div');
        overlay.className = 'glitch-overlay';
        overlay.innerHTML = `
            <div class="glitch-text">⚠️ ACCÈS TEMPORAIRE AU MULTIVERS DE KARE...</div>
        `;
        document.body.appendChild(overlay);
    
        // Remove the overlay and glitch effect after 5 seconds
        setTimeout(() => {
            document.body.classList.remove('glitch-mode');
            overlay.remove();
            audio.pause();
        }, 5000);
    }   
    
    // SCROLL BAR
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scroll-bar').style.width = `${scrolled}%`;
    });
    
    // ACCESSIBILITY
    const toggleBtn = document.getElementById('accessibility-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('access-mode');
    });
});
