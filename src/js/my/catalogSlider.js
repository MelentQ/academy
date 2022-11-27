import {
  Swiper,
  Navigation,
  Pagination,
  EffectFade
} from "swiper";
Swiper.use([Navigation, Pagination, EffectFade]);

export default function catalogSlider() {
  const container = document.querySelector('.js-catalog-slider');
  if (!container) return;

  const mainSlider = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 20,
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
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 60
      }
    }
  });

  mainSlider.slides.forEach(slide => {
    const colorsSlider = new Swiper(slide.querySelector('.js-colors-slider'), {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      allowTouchMove: false
    })

    let activeIndex = 0;

    const colorsButtons = slide.querySelectorAll('.catalog-card__color');
    const modalButton = slide.querySelector('.js-set-color');
    modalButton.dataset.color = colorsButtons[0].dataset.color;
    colorsButtons[0].classList.add('active');
    colorsButtons.forEach((button, i) => {
      button.addEventListener('click', () => {
        colorsSlider.slideTo(i);

        colorsButtons.forEach((b, j) => {
          if (j == i) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        })
        activeIndex = i;

        modalButton.dataset.color = button.dataset.color;
      });

      button.addEventListener('mouseover', () => {
        colorsSlider.slideTo(i);
      })

      button.addEventListener('mouseout', () => {
        colorsSlider.slideTo(activeIndex);
      })
    })
  });
}