document.addEventListener("DOMContentLoaded", function() {

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (state.isFullScreenPopupOpen) {
                toggleFullScreenPopup(false);
            } else if (state.isPopupOpen) {
                togglePopup(false);
            } else if (state.isContextMenuOpen) {
                toggleContextMenu(false);
            }
            toggleState();
        }
    });

    if (elements.overlay) {
        elements.overlay.addEventListener("click", function() {
            if (state.isFullScreenPopupOpen) {
                toggleFullScreenPopup(false);
            } else if (state.isPopupOpen) {
                togglePopup(false);
            } else if (state.isContextMenuOpen) {
                toggleContextMenu(false);
            }
            toggleState();
        });
    }

    elements.contactBtn.addEventListener("click", () => togglePopup(true));
    elements.contactCloseBtn.addEventListener("click", () => togglePopup(false));
    elements.fullScreenCloseBtn.addEventListener("click", () => toggleFullScreenPopup(true));
});
