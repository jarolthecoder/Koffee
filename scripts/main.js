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
const navigation = document.querySelector('.navigation-mobile');
const linkMobile = document.querySelectorAll('.navigation-mobile .nav-item');
const contactNav = document.querySelector('.contact-info-mobile');
const socialLinkBlock = document.querySelector('.social-media-mobile');

mobileToggleBtn.addEventListener('click', () => {
  if(mobileNav.classList.contains('nav-active')) {
			mobileNav.classList.remove('nav-active');
      navigation.classList.remove('fade-up');
      contactNav.classList.remove('fade-up');
			socialLinkBlock.classList.remove('fade-up');
			toggleBar.forEach((b)=> b.classList.remove('bar-active'));
      linkMobile.forEach((l)=> l.classList.remove('fade-up'));
      document.body.style.position = 'static';
		} else {
			mobileNav.classList.toggle('nav-active');
      navigation.classList.add('fade-up')
			contactNav.classList.add('fade-up');
			socialLinkBlock.classList.add('fade-up');
      toggleBar.forEach((b)=> b.classList.add('bar-active'));
      linkMobile.forEach((l)=> l.classList.add('fade-up'));
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
