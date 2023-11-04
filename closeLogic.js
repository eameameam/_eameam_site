document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        if (state.isFullScreenPopupOpen) {
            toggleFullScreenPopup(false);
        } else if (state.isPopupOpen) {
            togglePopup(false);
        } else if (state.isContextMenuOpen) {
            toggleContextMenu(false);
        }
        toggleState();
    });

    const overlays = {
        contactOverlay: "isPopupOpen",
        fullScreenOverlay: "isFullScreenPopupOpen",
        rmbMenuOverlay: "isContextMenuOpen"
    };

    for (let key in overlays) {
        const elem = document.getElementById(key);
        if (elem) {
            elem.addEventListener("click", function() {
                if (overlays[key] === "isPopupOpen") {
                    togglePopup(false);
                } else if (overlays[key] === "isFullScreenPopupOpen") {
                    toggleFullScreenPopup(false);
                } else if (overlays[key] === "isContextMenuOpen") {
                    toggleContextMenu(false);
                }
                toggleState();
            });
        }
    }

    const closeButtons = {
        closeBtn: "isPopupOpen",
        fullScreenCloseBtn: "isFullScreenPopupOpen"
    };

    for (let key in closeButtons) {
        const btn = document.getElementById(key);
        if (btn) {
            btn.addEventListener("click", function() {
                if (closeButtons[key] === "isPopupOpen") {
                    togglePopup(false);
                } else if (closeButtons[key] === "isFullScreenPopupOpen") {
                    toggleFullScreenPopup(false);
                }
                toggleState();
            });
        }
    }
});
