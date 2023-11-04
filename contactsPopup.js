document.addEventListener("DOMContentLoaded", function () {
    const elements = {
        contactBtn: document.getElementById("contactBtn"),
        popup: document.getElementById("popup"),
        overlay: document.getElementById("contactOverlay"),
        centerText: document.getElementById("centerText")
    };

    elements.contactBtn.addEventListener("click", () => togglePopup(true));

    window.togglePopup = function(show = false) {
        if (show && !state.isPopupOpen) {
            toggleState("isPopupOpen");
            fade(elements.popup, 1);
            fade(elements.overlay, 1);
            fade(elements.centerText, 0);
        } else {
            toggleState();
            fade(elements.popup, 0);
            fade(elements.overlay, 0);
            fade(elements.centerText, 1);
        }
    }
});
