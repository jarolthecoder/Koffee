// Scroll Down Button
const scrollBtn = document.querySelector('.scroll-down');
scrollBtn.addEventListener('click', ()=> {
    const target = document.querySelector('#products');
    window.scrollTo(0, target.offsetTop);
});

// Products Slider
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", (event) => {
  const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});