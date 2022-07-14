import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

export default function menu() {
    const burger = document.querySelector('.header__burger');
    const closeButton = document.querySelector('.menu-close');
    const menu = document.querySelector('.menu');

    window.menuOpen = false;

    if (!burger || !menu) return;

    const openMenu = () => {
        if (window.menuOpen) return;
        document.body.classList.add('menu-open');
        disableBodyScroll(menu, {
            reserveScrollBarGap: true
        });
        window.menuOpen = true;
    };
    const closeMenu = () => {
        if (!window.menuOpen) return;
        document.body.classList.remove('menu-open');
        clearAllBodyScrollLocks();
        window.menuOpen = false;
    };

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    })

    closeButton.addEventListener('click', event => {
        event.preventDefault();
        closeMenu();
    })

    burger.addEventListener('click', event => {
        event.preventDefault();
        if (!window.menuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });
}
