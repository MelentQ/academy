// https://youtu.be/AOcVzpEEqwE

export default function toggleMenuItems() {
  const nextAll = element => {
    const nextElements = [];

    while (element.nextElementSibling) {
      nextElements.push(element.nextElementSibling);
      element = element.nextElementSibling;
    }

    return nextElements;
  }

  const menu = document.querySelector('.header-menu__list'),
    more = document.querySelector('.header-menu__burger-container'),
    subMenu = document.querySelector('.header-menu__burger-list'),
    parent = document.querySelector('.header-menu__wrapper'),
    moreWidth = 40,
    moreMargin = 60,
    menuMargin = 60;

  let windowWidth = window.innerWidth;

  const contract = () => {
    let w = 0,
      outerWidth = parent.offsetWidth - 64 - 28 - 40 - 200;

    console.log(outerWidth);

    let menuItems = menu.querySelectorAll('.js-root-menu-item');

    for (let i = 0; i < menuItems.length; i++) {
      w += menuItems[i].offsetWidth;

      if (w > outerWidth) {
        let nextElements = nextAll(menuItems[i - 1]);

        let nextReverse = nextElements.reverse();

        nextReverse.forEach(el => {
          el.remove();
          subMenu.prepend(el);
        });

        break;
      }
    }
  };

  const expand = () => {
    let w = 0,
      outerWidth = parent.offsetWidth - 64 - 28 - 40 - 100;

    let menuItems = menu.querySelectorAll('.js-root-menu-item');
    menuItems.forEach(el => {
      w += el.offsetWidth;
    });

    let submenuItems = subMenu.querySelectorAll('.js-root-menu-item');
    for (let i = 0; i < submenuItems.length; i++) {
      w += submenuItems[i].offsetWidth;
      if (w > outerWidth) {
        let a = 0;

        while (a < i) {
          submenuItems[a].remove();
          menu.appendChild(submenuItems[a]);

          a++;
        }

        break;
      }
    }

    if (submenuItems.length > 0) {
      let lastOffset = submenuItems[submenuItems.length - 1].offsetWidth;

      if ((menu.offsetWidth + lastOffset) <= outerWidth) {
        submenuItems[submenuItems.length - 1].remove();
        menu.appendChild(submenuItems[submenuItems.length - 1]);
      }
    }
  };

  const checkActive = () => {
    if (subMenu.querySelectorAll('.js-root-menu-item').length) {
      more.classList.add('active');
    } else {
      more.classList.remove('active');
    }
  };

  contract();
  checkActive();

  window.addEventListener('resize', () => {
    (window.innerWidth > windowWidth) ? expand(): contract();
    windowWidth = window.innerWidth;
    checkActive();
  });
}