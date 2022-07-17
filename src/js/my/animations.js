export default function animations() {
  const animatedItems = document.querySelectorAll('.js-animation');
  if (animatedItems.length > 0) {
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    function animateOnScroll() {
      animatedItems.forEach(item => {
        const itemHeight = item.offsetHeight;
        const itemOffset = offset(item).top;
        const animationStart = 4;

        let itemPoint = window.innerHeight - itemHeight / animationStart;

        if (itemHeight > window.innerHeight) {
          itemPoint = window.innerHeight - window.innerHeight / animationStart;
        }

        if ((scrollY > itemOffset - itemPoint) && scrollY < (itemOffset + itemHeight)) {
          item.classList.add('animated')
        } else {
          // item.classList.remove('animated')
        }
      })
    }

    function offset(el) {
      let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    }
  }
}