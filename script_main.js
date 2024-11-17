// Índice actual de la imagen mostrada
let currentIndex = 0;
// Total de imágenes en el carrusel
const totalSlides = document.querySelectorAll('.carousel-images a').length;
// Referencia al contenedor de imágenes
const carouselImages = document.querySelector('.carousel-images');
// Referencia a los puntos de navegación
const dots = document.querySelectorAll('.dot');

// Función para mostrar la imagen seleccionada por el índice
function showSlide(index) {
    // Mueve el contenedor de imágenes para mostrar la imagen correspondiente
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
    
    // Actualiza el índice actual
    currentIndex = index;
    
    // Actualiza el estado activo de los puntos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Función para el cambio automático de imágenes cada 5 segundos
function autoSlide() {
    // Cambia al siguiente índice de imagen
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Inicia el cambio automático de imágenes
setInterval(autoSlide, 5000);

// Agrega funcionalidad de clic a los puntos para cambiar de imagen manualmente
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});


// Índice actual del carrusel
let discoverIndex = 0;

// Función para desplazarse en el carrusel
function scrollDiscover(direction) {
    const container = document.querySelector('.discover-projects-container');
    const totalProjects = document.querySelectorAll('.discover-project').length;

    // Calcula el nuevo índice (asegurando que no salga de los límites)
    discoverIndex = Math.max(0, Math.min(discoverIndex + direction, totalProjects - 3));

    // Mueve el carrusel para mostrar los proyectos correctos 310
    container.style.transform = `translateX(-${discoverIndex * 383}px)`;
}
