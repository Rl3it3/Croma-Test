let currentSlide = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector(".category");
    const items = document.querySelectorAll(".category-item");
    const totalSlides = 4;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const itemWidth = items[0].offsetWidth + 10;
    const offset = -currentSlide * itemWidth;

    carousel.style.transform = `translateX(${offset}px)`;
}