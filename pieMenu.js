document.addEventListener("DOMContentLoaded", function() {
    
    const elements = {
        content: document.getElementById("content"),
        centerText: document.getElementById("centerText")
    };

    function togglePieMenu(show = true, event) {
        if (show) {
            if (state.isPieMenuVisible || state.isPopupOpen || state.isFullScreenPopupOpen || state.isContextMenuOpen || !isInInteractiveZone(event.clientX, event.clientY)) {
                clearPieMenu();
                return;
            }
            createEndCircle(event);
            circle = createCircle(event);
            line = createLine(event);
            popups = imageConfigs.map(config => createPieMenuItem(config, event));
            attachPopupsToDOM();
            attachGlobalListeners();
        } else {
            clearPieMenu();
        }
    }
    
    function clearPieMenu() {
        clearInteractiveComponents(circle, line, popups);
        document.body.classList.remove("no-select");
        closeAllStates();
        if (!state.fullscreenPopup) {
            blur(elements.content, 0);
            fade(elements.centerText, 1);
        }
    }
    
    function attachPopupsToDOM() {
        popups.forEach(popup => {
            popup.style.opacity = 1;
            document.body.appendChild(popup);
            popup.addEventListener("mouseenter", clearPieMenu);
        });
        statePieMenu();
        document.body.classList.add("no-select");
        blur(elements.content, 1);
        fade(elements.centerText, 0);
    }
    
    function attachGlobalListeners() {
        document.addEventListener("mousemove", drawLine);
    }
    
    function onPieMenuItemEnter(event) {
        if (event.target.dataset.name === '_header') return;
    
        let fullscreenPopup = document.getElementById("fullScreenPopup");
        if (fullscreenPopup) {
            fullscreenPopup.addEventListener("mouseenter", () => {
                toggleFullScreenPopup(true);
                stateFullScreenPopup();
            });
        }
        clearPieMenu();
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
        if (!isHeader) {
            menuItem.addEventListener("mouseenter", () => toggleFullScreenPopup(true, config.name));
        }
        return menuItem;
    }

    document.addEventListener("mousedown", function(event) {
        if (event.button === 0 && !state.isContextMenuOpen) {
            togglePieMenu(true, event);
        }
    });
    
    document.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            clearPieMenu();
        }
    });
   
    const imageConfigs = [
        { name: '_anim', xOffset: 0, yOffset: 0.7, scale: 1.3 },
        { name: '_rig', xOffset: 1.2, yOffset: 0, scale: 1.3 },
        { name: '_unity', xOffset: -1, yOffset: 0.4, scale: 1.3 },
        { name: '_unreal', xOffset: 1, yOffset: 0.4, scale: 1.3 },
        { name: '_tools', xOffset: -1.2, yOffset: 0, scale: 1.3 },
        { name: '_header', xOffset: 0, yOffset: -.5, scale: 1.3 },
    ];


    
    function clearInteractiveComponents() {
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
        popups.forEach(popup => {
            document.body.removeChild(popup);
            popup.removeEventListener("mouseenter", onPieMenuItemEnter);
        });
        popups = [];
        document.removeEventListener("mousemove", drawLine);
        document.body.classList.remove("no-select");
        if (elements && elements.content) {
            elements.content.classList.remove("blur");
        }
    }
    
});

