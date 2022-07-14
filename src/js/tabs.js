export default function tabs() {
    const elements = Array.from(document.querySelectorAll('.js-tabs'));

    elements.forEach(element => {
        const btns = Array.from(element.querySelectorAll('.js-tab'));
        const items = Array.from(element.querySelectorAll('.js-body'));

        const setActiveTab = index => {
            btns.forEach(btn => btn.classList.remove('active'));
            items.forEach(item => item.classList.remove('active'));

            btns[index].classList.add('active');
            items[index].classList.add('active');
        };

        btns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                setActiveTab(btnIndex);
            });
        });
    });
}
