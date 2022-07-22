export default function toggleHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const toggleY = header.dataset.toggle || 300;
  let opened = false;

  window.addEventListener('scroll', () => {
    if (!opened && window.scrollY >= toggleY) {
      opened = true;
      header.classList.add('opened');
    } else if (window.scrollY < toggleY) {
      opened = false;
      header.classList.remove('opened');
    }
  }, {
    passive: true
  });
}