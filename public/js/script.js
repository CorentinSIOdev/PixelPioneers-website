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
});
