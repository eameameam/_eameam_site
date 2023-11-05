document.addEventListener("DOMContentLoaded", function() {

    window.togglePopup = function(show = false) {
        if (show && !state.isPopupOpen) {
            toggleState('isPopupOpen');
            fade(elements.contactPopup, 1);
            fade(elements.overlay, 1);
            fade(elements.centerText, 0);
        } else {
            toggleState();
            fade(elements.contactPopup, 0);
            fade(elements.overlay, 0);
            fade(elements.centerText, 1);
        }
    }
});
