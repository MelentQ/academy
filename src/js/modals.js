export default function modals() {
    const instance = new HystModal({
        linkAttributeName: 'data-modal',
        beforeOpen: function (modal) {
            window.closeMenu();

            const modalForm = modal.openedWindow.querySelector('form');
            if (modalForm) {
                const values = modal.starter.dataset;

                for (let name in values) {
                    if (name != "modal") {
                        const hiddenInput = document.createElement('input');
                        hiddenInput.type = "hidden";
                        hiddenInput.classList.add('js-dynamic-input');
                        hiddenInput.name = name;
                        hiddenInput.value = values[name];
                        modalForm.prepend(hiddenInput);
                    }
                }
            }
        },
        afterClose: function (modal) {
            const hiddenInputs = modal.openedWindow.querySelectorAll('.js-dynamic-input');
            hiddenInputs.forEach(input => {
                input.remove();
            })
        },
    });

    window.modals = instance;
}