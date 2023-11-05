document.addEventListener("DOMContentLoaded", function() {

    window.toggleFullScreenPopup = function(show = false, contentElementId = null) {
        if (show && contentElementId) {
            toggleState('isFullScreenPopupOpen');
            if (contentElementId === "_tools") {
                elements.fullScreenContent.innerHTML = '';
                elements.fullScreenContent.appendChild(createToolsPopupContent());
            } else {
                elements.fullScreenContent.innerHTML = document.getElementById(contentElementId).innerHTML;
            }

            const fullScreenPopup = document.querySelector('.full-screen-popup');
            if (fullScreenPopup) {
                fullScreenPopup.style.display = 'flex'; 
            }
            blur(elements.content, 1);
            fade(elements.fullScreenPopup, 1);
            fade(elements.centerText, 0);
        } 
        else {
            toggleState();
            blur(elements.content, 0);
            fade(elements.fullScreenPopup, 0);
            fade(elements.centerText, 1);
        }
    }
});