function initializeHobbies() {
    // const images = document.querySelectorAll('.hobby-image');
    const imageNames = ['public.jpg', 'public2.png', 'public3.jpeg'];
    const idesc = ['public1desc', 'public2desc', 'public3desc'];
    const images = [];
    for (let i=0; i<imageNames.length; i++) {
        const img = new Image();
        img.src = imageNames[i];
    }
        
    const description = document.querySelector('.description');
    const imageContainer = document.querySelector('.image-container');

    let currentIndex = 0;
    const imageWidth = images[0].clientWidth;
    // const imageWidth = 500;
    function changeHidden(index) {
        const descriptionText = images[index].getAttribute('data-description');
        description.innerText = descriptionText;
        if (description.classList.contains('hidden')) {
            description.classList.remove('hidden');
        } else {
            description.classList.add('hidden');
        }
    }

    function showDescription(index) {
        description.innerText = idesc[index];
        description.style.zIndex = 999;
        console.log(`${description.innerText}`);
        // description.classList.remove('hidden');
    }
    
    function hideDescription() {
        description.classList.add('hidden');
    }

    function slideImages() {
        const newPosition = -currentIndex * imageWidth;
        imageContainer.style.transition = 'transform 0.5s ease';
        imageContainer.style.transform = 'translateX(' + newPosition + 'px)';
    }

    function showImage(index) {
        img.onload = function() {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
            showDescription(index);
        };
        
    }

    function loopImages() {
        setInterval(() => {
            // currentIndex = (currentIndex + 1) % images.length;
            // slideImages();
            // if (currentIndex >= images.length) {
            //     currentIndex = 0;
            // }
            showImage(currentIndex++ % images.length);
        }, 5000);
    }

    images.forEach((image, index) => {
        image.addEventListener('mouseenter', () => showDescription(index));
        image.addEventListener('mouseleave', hideDescription);
        image.addEventListener('click', () => changeHidden(index));
    });

    loopImages();
}

document.addEventListener('DOMContentLoaded', initializeHobbies);
