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

        // cases tabs
        const casesSelect = element.querySelector('.js-cases-select');
        if (casesSelect) {
            const casesOptions = casesSelect.querySelectorAll('.js-option');
            const casesButton = casesSelect.querySelector('.js-button');

            if (casesButton) {
                casesButton.addEventListener('click', () => {
                    casesSelect.classList.toggle('active');
                });
            }

            window.addEventListener('click', e => {
                const target = e.target
                if (!target.closest('.js-cases-select') && !target.closest('.js-button')) {
                    casesSelect.classList.remove('active');
                }
            });

            let activeOptionIndex = 0;
            casesOptions.forEach((option, i) => {
                option.addEventListener('click', () => {
                    casesOptions[activeOptionIndex].classList.remove('active');

                    option.classList.add('active');
                    activeOptionIndex = i;
                    setActiveTab(i);

                    casesSelect.classList.remove('active');
                });
            })
        }
    });
}