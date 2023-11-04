document.addEventListener("DOMContentLoaded", function () {
    const elements = {
        popup: document.getElementById("fullScreenPopup"),
        content: document.getElementById("fullScreenContent"),
        centerText: document.getElementById("centerText"),
        mainContent: document.getElementById("content")
    };

    window.toggleFullScreenPopup = function(show = false, contentElementId = null) {
        if (!elements.popup || !elements.content) return;
    
        if (show && contentElementId) {
            const content = document.getElementById(contentElementId);
            if (content) {
                elements.content.innerHTML = content.innerHTML;
            }
            stateFullScreenPopup();
            blur(elements.mainContent, 1);
            fade(elements.popup, 1);
            fade(elements.centerText, 0);
            document.body.classList.remove("no-select");

        } else {
            closeAllStates();
            blur(elements.mainContent, 0);
            fade(elements.popup, 0);
            fade(elements.centerText, 1);
        }
    }
});
