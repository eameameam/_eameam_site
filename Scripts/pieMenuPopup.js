document.addEventListener("DOMContentLoaded", function() {

    window.togglePieMenu = function(show = false) {
        if (show && !state.isPopupOpen) {
            toggleState('isPieMenuVisible');
            fade(elements.contactPopup, 1);
            fade(elements.overlay, 1);
            fade(elements.centerText, 0);
            console.log('After IF togglePieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        } else {
            toggleState();
            fade(elements.contactPopup, 0);
            fade(elements.overlay, 0);
            fade(elements.centerText, 1);
            console.log('After ELSE togglePieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        }
    }
});
