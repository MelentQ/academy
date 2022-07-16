export default function placeholders() {
  const containers = document.querySelectorAll('.js-init-placeholder');

  containers.forEach(container => {
    const input = container.querySelector('.js-input');
    input.addEventListener('input', () => {
      if (input.value) {
        container.classList.add('filled')
      } else {
        container.classList.remove('filled')
      }
    });

    input.addEventListener('focus', () => {
      container.classList.add('focused')
    });

    input.addEventListener('blur', () => {
      if (!input.value)
        container.classList.remove('focused')
    });
  })
}