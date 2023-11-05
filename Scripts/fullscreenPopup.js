document.addEventListener("DOMContentLoaded", function() {

    window.toggleFullScreenPopup = function(show = false, contentElementId = null) {
        if (show && contentElementId) {
            toggleState('isFullScreenPopupOpen');
            elements.fullScreenContent.innerHTML = document.getElementById(contentElementId).innerHTML;
            blur(elements.content, 1);
            fade(elements.fullScreenPopup, 1);
            fade(elements.centerText, 0);
            console.log('After IF toggleFullScreenPopup:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        } 
        else {
            toggleState();
            blur(elements.content, 0);
            fade(elements.fullScreenPopup, 0);
            fade(elements.centerText, 1);
            console.log('After ELSE toggleFullScreenPopup:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        }
    }
});