document.addEventListener("DOMContentLoaded", function() {

    window.togglePopup = function(show = false) {
        if (show && !state.isPopupOpen) {
            toggleState('isPopupOpen');
            fade(elements.contactPopup, 1);
            fade(elements.overlay, 1);
            fade(elements.centerText, 0);
            console.log('After IF togglePopup:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        } else {
            toggleState();
            fade(elements.contactPopup, 0);
            fade(elements.overlay, 0);
            fade(elements.centerText, 1);
            console.log('After ELSE togglePopup:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        }
    }
});
