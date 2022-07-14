export default function modals() {
    const instance = new HystModal({
        linkAttributeName: 'data-modal',
        beforeOpen: function(modal){
            
        },
        afterClose: function(modal){
            
        },
    });

    window.modals = instance;
}