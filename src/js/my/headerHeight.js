export default function headerHeight() {
  const header = document.querySelector('.header');
  if (!header) return;

  function setHeaderHeight() {
    document.documentElement.style.setProperty('--js-header-height', header.offsetHeight + 'px');
  }

  setHeaderHeight();

  window.addEventListener('resize', setHeaderHeight, {passive: true});
}