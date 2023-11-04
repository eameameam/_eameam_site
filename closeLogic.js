document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        if (state.isFullScreenPopupOpen) {
            toggleFullScreenPopup(false);
            closeAllStates();
        } else if (state.isPopupOpen) {
            togglePopup(false);
            closeAllStates();
        } else if (state.isContextMenuOpen) {
            toggleContextMenu(false);
            closeAllStates();
        }
    });

    const overlays = {
        contactOverlay: document.getElementById("contactOverlay"),
        fullScreenOverlay: document.getElementById("fullScreenOverlay"),
        rmbMenuOverlay: document.getElementById("rmbMenuOverlay")
    };

    for (let key in overlays) {
        if (overlays[key]) {
            overlays[key].addEventListener("click", function() {
                if (key === "contactOverlay") {
                    togglePopup(false);
                    closeAllStates();
                } else if (key === "fullScreenOverlay") {
                    toggleFullScreenPopup(false);
                    closeAllStates();
                } else if (key === "rmbMenuOverlay") {
                    closeAllMenus(false);
                    closeAllStates();
                }
            });
        }
    }

    const closeButtons = {
        closeBtn: document.getElementById("closeBtn"),
        fullScreenCloseBtn: document.getElementById("fullScreenCloseBtn")
    };

    for (let key in closeButtons) {
        if (closeButtons[key]) {
            closeButtons[key].addEventListener("click", function() {
                if (key === "closeBtn") {
                    togglePopup(false);
                    closeAllStates();
                } else if (key === "fullScreenCloseBtn") {
                    toggleFullScreenPopup(false);
                    closeAllStates();
                }
            });
        }
    }
});