// Scroll Down Button
const scrollBtn = document.querySelector('.scroll-down');
scrollBtn.addEventListener('click', ()=> {
    const target = document.querySelector('#products');
    window.scrollTo(0, target.offsetTop);
});

// Mobile Nav Toggle
const mobileNav = document.querySelector('#mobile-navbar');
const mobileToggleBtn = document.querySelector('.nav-toggle');
const toggleBar = document.querySelectorAll('.bar');

mobileToggleBtn.addEventListener('click', () => {
  if(mobileNav.classList.contains('nav-active')) {
			mobileNav.classList.remove('nav-active');
			toggleBar.forEach((b)=> b.classList.remove('bar-active'));
      document.body.style.position = 'static';
		} else {
			mobileNav.classList.toggle('nav-active');
			toggleBar.forEach((b)=> b.classList.toggle('bar-active'));
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
		}
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
