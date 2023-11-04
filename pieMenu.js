document.addEventListener("DOMContentLoaded", function() {

    const elements = {
        content: document.getElementById("content"),
        centerText: document.getElementById("centerText")
    };

    const imageConfigs = [
        { name: '_anim', xOffset: 0, yOffset: 0.7, scale: 1.3 },
        { name: '_rig', xOffset: 1.2, yOffset: 0, scale: 1.3 },
        { name: '_unity', xOffset: -1, yOffset: 0.4, scale: 1.3 },
        { name: '_unreal', xOffset: 1, yOffset: 0.4, scale: 1.3 },
        { name: '_tools', xOffset: -1.2, yOffset: 0, scale: 1.3 },
        { name: '_header', xOffset: 0, yOffset: -.5, scale: 1.3 },
    ];

    function togglePieMenu(show = true, event) {
        if (show) {
            if (state.isPieMenuVisible || state.isPopupOpen || state.isFullScreenPopupOpen || state.isContextMenuOpen || !isInInteractiveZone(event.clientX, event.clientY)) {
                clearInteractiveComponents();
                console.log('After togglePieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
                return;
            }
            toggleState('isPieMenuVisible');
            console.log('After mousedown:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
            renderInteractiveComponents(event); 
            popups = imageConfigs.map(config => createPieMenuItem(config, event));
            attachPopupsToDOM();
        } else {
            clearInteractiveComponents(); 
        }
    }

    function clearPieMenu() {
        clearInteractiveComponents();
        document.body.classList.remove("no-select");
        if (!state.isFullScreenPopupOpen) {
            blur(elements.content, 0);
            fade(elements.centerText, 1);
            toggleState();
        }
        console.log('After clearPieMenu:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
    }

    function attachPopupsToDOM() {
        popups.forEach(popup => {
            document.body.appendChild(popup);
        });
        popups.forEach(popup => {
            if (popup.dataset.name !== '_header') {
                popup.addEventListener("mouseenter", clearPieMenu);
            }
        });

    }
    
    function onPieMenuItemEnter(event) {
        console.log('In onPieMenuItemEnter before check on header:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
        if (event.target.dataset.name === '_header') return;
        console.log('In onPieMenuItemEnter before check on fullscreen:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
        let fullscreenPopup = document.getElementById("fullScreenPopup");
        if (fullscreenPopup) {
            fullscreenPopup.addEventListener("mouseenter", () => {
                toggleFullScreenPopup(true);
                clearPieMenu();
                console.log('After onPieMenuItemEnter:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);
            });
        }
        console.log('In onPieMenuItemEnter before check on fullscreen:', 'FullScreen =', state.isFullScreenPopupOpen, 'PieMenu =', state.isPieMenuVisible);

    }
    
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
        
        if (!isHeader) {
            menuItem.addEventListener("mouseenter", () => {
                if (!state.isFullScreenPopupOpen) {
                    toggleFullScreenPopup(true, config.name);
                }
            });
        } else {
            menuItem.addEventListener("mouseenter", onPieMenuItemEnter);
        }
        return menuItem;
    }

    document.addEventListener("mousedown", function(event) {
        if (event.button === 0 && !state.isContextMenuOpen) {
            togglePieMenu(true, event);
            document.body.classList.add("no-select");
            blur(elements.content, 1);
            fade(elements.centerText, 0);

        }
    });
    
    document.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            clearPieMenu();
        }
    });
   

});

