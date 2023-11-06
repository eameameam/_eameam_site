document.addEventListener("DOMContentLoaded", function() {

    elements.contactBtn.addEventListener('mouseover', () => elements.contactBtn.style.color = '#777777');
    elements.contactBtn.addEventListener('mouseout', () => elements.contactBtn.style.color = '#f1f1f1');

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
