"use strict";
(() => {
    const images = [
        "../MEDIA/g1.jpg",
        "../MEDIA/g2.jpg",
        "../MEDIA/g3.jpg"
    ];
    const mainImage = document.getElementById("carousel-image");
    if (!mainImage) {
        throw new Error("Elementul carousel-image nu a fost găsit în DOM.");
    }
    let currentIndex = 0;
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.style.opacity = "0.3";
        setTimeout(() => {
            mainImage.src = images[currentIndex];
            mainImage.style.opacity = "1";
        }, 250);
    }
    setInterval(showNextImage, 3000);
})();
