export default function toggleMenuItems() {
  const menuContainer = document.querySelector('.js-toggle-menu');
  if (!menuContainer) return;

  const menu = menuContainer.querySelector('.header-menu__list');
  const menuItems = menu.querySelectorAll('.js-root-menu-item');
  const burger = menuContainer.querySelector('.header-menu__burger-container');
  const burgerMenuItems = burger.querySelectorAll('.js-burger-menu-item');

  function check() {
    const menuListWidth = menuContainer.offsetWidth - 64 - 68;

    let itemsWidth = 0;
    let burgerActiveItemsCount = 0;
    menuItems.forEach((item, i) => {
      burgerMenuItems[i].classList.remove('visible');
      item.classList.remove('hidden');

      itemsWidth += item.offsetWidth;

      if (itemsWidth > menuListWidth) {
        burgerMenuItems[i].classList.add('visible');
        item.classList.add('hidden');
        burgerActiveItemsCount++;
      }
    });

    if (burgerActiveItemsCount) {
      burger.classList.add('active');
    } else {
      burger.classList.remove('active');
    }
  }

  check();

  window.addEventListener('resize', check);

  window.checkMenu = check;
}