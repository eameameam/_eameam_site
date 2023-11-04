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
            toggleState('isFullScreenPopupOpen');
            const content = document.getElementById(contentElementId);
            if (content) {
                elements.content.innerHTML = content.innerHTML;
            }
            document.body.classList.remove("no-select");
            blur(elements.mainContent, 1);
            fade(elements.popup, 1);
            fade(elements.centerText, 0);
        } 
        else {
            blur(elements.mainContent, 0);
            fade(elements.popup, 0);
            fade(elements.centerText, 1);
        }
    }
    
});
