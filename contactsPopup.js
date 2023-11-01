document.addEventListener("DOMContentLoaded", function () {
    const elements = {
        contactBtn: document.getElementById("contactBtn"),
        popup: document.getElementById("popup"),
        closeBtn: document.getElementById("closeBtn"),
        content: document.getElementById("content"),
        overlay: document.getElementById("overlay")
    };

    elements.popup.style.opacity = 0;
    elements.overlay.style.opacity = 0;
    
    function togglePopup(show = false) {
        if (show) {
            fade(elements.popup, 1);
            fade(elements.overlay, 1);
            elements.content.classList.add("blur");
        } else {
            fade(elements.popup, 0);
            fade(elements.overlay, 0);
            elements.content.classList.remove("blur");
        }
    }

    elements.contactBtn.addEventListener("click", () => togglePopup(true));
    elements.closeBtn.addEventListener("click", () => togglePopup());
    elements.overlay.addEventListener("click", () => togglePopup());

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            togglePopup();
        }
    });
});