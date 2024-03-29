import {
  Swiper,
  Navigation,
  Autoplay,
  EffectFade,
  Thumbs,
  Controller
} from "swiper";
Swiper.use([Navigation, Autoplay, EffectFade, Thumbs, Controller]);

import gsap from 'gsap';

export default function introSlider() {
  const container = document.querySelector('.js-init-intro-slider');
  if (!container) return;

  const thumbs = container.querySelectorAll('.intro__thumb');

  thumbs.forEach(thumb => {

    if (thumbs.length <= 1) {
      thumb.classList.add('disabled');
    }

    thumb.addEventListener('click', (e) => {
      e.preventDefault();
    });
  })

  const thumbsSlider = new Swiper(container.querySelector('.intro__thumbs'), {
    slidesPerView: 4,
    spaceBetween: 60
  });

  const imageSlider = new Swiper(container.querySelector('.intro__images'), {
    slidesPerView: 1,
    effect: 'fade',
    speed: 0,
    fadeEffect: {
      crossFade: false
    },
    allowTouchMove: false,
    thumbs: {
      swiper: thumbsSlider,
      multipleActiveThumbs: false
    }
  });

  if (window.matchMedia("(min-width: 1440px)").matches) {

    const animation = gsap.timeline();

    thumbsSlider.slides.forEach(slide => {
      const line = slide.querySelector('.intro__thumb-fill');
      gsap.set(line, {
        xPercent: -100
      });
    })

    function lineAnimation() {
      if (window.lastThumbLine) {
        gsap.set(window.lastThumbLine, {
          xPercent: -100
        });
      };

      const currentThumbLine = thumbsSlider.slides[imageSlider.activeIndex].querySelector('.intro__thumb-fill');
      window.lastThumbLine = currentThumbLine;
      animation.clear();
      animation.eventCallback('onComplete', null);
      animation.fromTo(currentThumbLine, {
        xPercent: -100,
      }, {
        ease: "none",
        xPercent: 0,
        duration: 5,
      });
      animation.eventCallback('onComplete', () => {
        if (imageSlider.isEnd) {
          imageSlider.slideTo(0);
        } else {
          imageSlider.slideNext();
        }
      });
    }

    lineAnimation();

    imageSlider.on("slideChange", lineAnimation);

  } else {
    const mobileSliderContainer = container.querySelector('.intro__mobile-slider');
    const mobileSlider = new Swiper(mobileSliderContainer, {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      controller: {
        control: imageSlider
      },
      navigation: {
        nextEl: container.querySelector('.slider-button.--right'),
        prevEl: container.querySelector('.slider-button.--left'),
      }
    });

    if (window.matchMedia("(min-width: 641px)").matches) {
      const animation = gsap.timeline();
      const line = mobileSliderContainer.querySelector('.intro__thumb-fill');
      gsap.set(line, {
        xPercent: -100
      });
  
      function lineAnimation() {
        gsap.set(line, {
          xPercent: -100
        });
  
        animation.clear();
        animation.eventCallback('onComplete', null);
        animation.fromTo(line, {
          xPercent: -100,
        }, {
          ease: "none",
          xPercent: 0,
          duration: 5,
        });
        animation.eventCallback('onComplete', () => {
          if (mobileSlider.isEnd) {
            mobileSlider.slideTo(0);
          } else {
            mobileSlider.slideNext();
          }
        });
      }
  
      lineAnimation();
  
      mobileSlider.on("slideChange", lineAnimation);
    }
  }
}