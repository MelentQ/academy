import {Swiper, Pagination, Navigation} from "swiper";
Swiper.use([Pagination, Navigation]);

export default function mobileSlider() {
  if (window.matchMedia("(max-width: 1024px)").matches) {
    const containers = document.querySelectorAll('.js-init-mobile-slider');
    containers.forEach(container => {
      const instance = new Swiper(container.classList.contains('swiper') ? container : container.querySelector('.swiper'), {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        pagination: {
          el: container.querySelector('.pagination'),
          bulletClass: "pagination__item",
          bulletActiveClass: "active",
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: container.querySelector('.slider-button.--right'),
          prevEl: container.querySelector('.slider-button.--left'),
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            autoHeight: false
          },
          768: {
            slidesPerView: 3,
            autoHeight: false
          }
        }
      })
    });
  }
}