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
