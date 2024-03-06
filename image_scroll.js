function initializeHobbies() {
    const images = document.querySelectorAll('.hobby-image');
    const description = document.querySelector('.description');
    const imageContainer = document.querySelector('.image-container');
    const containerWidth = images.length * 100 + '%';

    let currentIndex = 0;

    // Set width of image container to fit all images
    imageContainer.style.width = containerWidth;

    function showDescription(index) {
        const descriptionText = images[index].getAttribute('data-description');
        description.innerText = descriptionText;
        description.classList.remove('hidden');
    }

    function hideDescription() {
        description.classList.add('hidden');
    }

    function slideImages() {
        const newPosition = -100 * currentIndex + '%';
        imageContainer.style.transition = 'transform 0.5s ease';
        imageContainer.style.transform = 'translateX(' + newPosition + ')';
    }

    function loopImages() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            slideImages();
        }, 3000);
    }

    images.forEach((image, index) => {
        image.addEventListener('mouseenter', () => showDescription(index));
        image.addEventListener('mouseleave', hideDescription);
        image.addEventListener('click', () => showDescription(index));
    });

    loopImages();
}

document.addEventListener('DOMContentLoaded', initializeHobbies);
