document.addEventListener("DOMContentLoaded", function () {
    const fullScreenElements = {
        popup: document.getElementById("fullScreenPopup"),
        closeBtn: document.getElementById("fullScreenCloseBtn"),
        content: document.getElementById("fullScreenContent"),
        overlay: document.getElementById("fullScreenOverlay")
    };

    const mainContent = document.getElementById("content");

    fullScreenElements.popup.style.opacity = 0;
    fullScreenElements.overlay.style.opacity = 0;

    window.toggleFullScreenPopup = function(show = false, contentElementId = null) {

        if (!fullScreenElements.popup || !fullScreenElements.content) return;

        if (show && contentElementId) {
            const content = document.getElementById(contentElementId);
            if (content) {
                fullScreenElements.content.innerHTML = content.innerHTML;
            }
            fade(fullScreenElements.popup, 1);
            mainContent.classList.add("blur");
            isFullScreenPopupOpen = true;
            fullScreenElements.overlay.style.display = "block";
        } else {
            fade(fullScreenElements.popup, 0);
            mainContent.classList.remove("blur");
            isFullScreenPopupOpen = false;
            fullScreenElements.overlay.style.display = "none";
        }
    }

    fullScreenElements.closeBtn.addEventListener("click", () => toggleFullScreenPopup(false));
    fullScreenElements.overlay.addEventListener("click", () => toggleFullScreenPopup());

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            toggleFullScreenPopup();
        }
    });
});
