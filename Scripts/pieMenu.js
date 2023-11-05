document.addEventListener("DOMContentLoaded", function() {
    const imageConfigs = [
        { name: '_anim', xOffset: 0, yOffset: 0.7, scale: 1.3 },
        { name: '_rig', xOffset: 1.2, yOffset: 0, scale: 1.3 },
        { name: '_unity', xOffset: -1, yOffset: 0.4, scale: 1.3 },
        { name: '_unreal', xOffset: 1, yOffset: 0.4, scale: 1.3 },
        { name: '_tools', xOffset: -1.2, yOffset: 0, scale: 1.3 },
        { name: '_header', xOffset: 0, yOffset: -.5, scale: 1.3 },
    ];

    function togglePieMenu(show = true, event = null) {
        if (show && event && canShowPieMenu(event)) {
            toggleState('isPieMenuVisible', true);
            renderInteractiveComponents(event);
            imageConfigs.forEach(config => {
                document.body.appendChild(createPieMenuItem(config, event));
            });
            popups.forEach(popupId => setPopupVisibility(popupId, true));
            console.log('After if togglePieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);

        } else {
            clearInteractiveComponents();
            popups.forEach(popupId => setPopupVisibility(popupId, false));
            document.body.classList.remove("no-select");
            blur(elements.content, 0);
            fade(elements.centerText, 1);
            toggleState();
            console.log('After ELSE togglePieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);

        }
    }

    function canShowPieMenu(event) {
        return !(state.isPieMenuVisible || state.isPopupOpen || state.isFullScreenPopupOpen || state.isContextMenuOpen) && isInInteractiveZone(event.clientX, event.clientY);
    }

    function setPopupVisibility(popupId, visible) {
        const popup = document.getElementById(popupId);
        if (popup) {
            if (visible) {
                popup.classList.add('visible');
                console.log('After VIS setPopupVisibility:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);

            } else {
                popup.classList.remove('visible');
                console.log('After ELSE setPopupVisibility:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);

            }
        }
    }

    document.addEventListener("mousedown", function(event) {
        if (event.button === 0) {
            togglePieMenu(true, event);
            console.log('After mousedown:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);

        }
    });

    document.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            togglePieMenu(false);
            console.log('After mouseup:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible, 'Popup =', state.isPopupOpen, 'Context =', state.isContextMenuOpen);
        }
    });

    function createPieMenuItem(config, event) {
        const isHeader = config.name === '_header';
        const popupOptions = {
            styles: {
                width: isHeader ? '300px' : '200px',
                height: isHeader ? '75px' : '50px',
                backgroundImage: `url('Resources/${config.name}.png')`,
                backgroundSize: 'cover',
                position: 'absolute',
                zIndex: '4',
                left: isHeader ? `${event.clientX + 160 * config.xOffset * config.scale - 150}px` : `${event.clientX + 160 * config.xOffset * config.scale - 100}px`,
                top: isHeader ? `${event.clientY + 160 * config.yOffset * config.scale - 37.5}px` : `${event.clientY + 160 * config.yOffset * config.scale - 25}px`,
                boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.6)'
            }
        };
        
        const menuItem = createPopup(popupOptions);
        menuItem.dataset.name = config.name;
        
        if (config.name !== '_header') {
            menuItem.addEventListener("mouseenter", () => toggleFullScreenPopup(true, config.name));
        }
        return menuItem;
    }

    function clearInteractiveComponents() {
        imageConfigs.forEach(config => {
            const pieItem = document.querySelector(`[data-name="${config.name}"]`);
            if (pieItem) {
                document.body.removeChild(pieItem);
            }
        });
        if (circle) {
            document.body.removeChild(circle);
            circle = null;
        }
        if (endCircle) {
            document.body.removeChild(endCircle);
            endCircle = null;
        }
        if (line) {
            document.body.removeChild(line);
            line = null;
        }
        document.removeEventListener("mousemove", drawLine);
    }
});
