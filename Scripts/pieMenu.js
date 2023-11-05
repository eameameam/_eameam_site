document.addEventListener("DOMContentLoaded", function() {
    const imageConfigs = [
        { name: '_anim', xOffset: 0, yOffset: 0.7, scale: 1.3 },
        { name: '_rig', xOffset: 1.2, yOffset: 0, scale: 1.3 },
        { name: '_unity', xOffset: -1, yOffset: 0.4, scale: 1.3 },
        { name: '_unreal', xOffset: 1, yOffset: 0.4, scale: 1.3 },
        { name: '_tools', xOffset: -1.2, yOffset: 0, scale: 1.3 },
        { name: '_header', xOffset: 0, yOffset: -.5, scale: 1.3 },
    ];

    function togglePieMenu(show, event) {
        if (show && canShowPieMenu(event)) {
            state.isPieMenuVisible = true;
            renderInteractiveComponents(event);
            imageConfigs.forEach(config => {
                document.body.appendChild(createPieMenuItem(config, event));
            });
            document.addEventListener("mousemove", updatePopupsScale); 
        } else {
            state.isPieMenuVisible = false;
            clearInteractiveComponents();
            document.body.classList.remove("no-select");
            blur(elements.content, 0);
            fade(elements.centerText, 1);
            document.removeEventListener("mousemove", updatePopupsScale); 
        }
        document[show ? 'addEventListener' : 'removeEventListener']("mousemove", updatePopupsScale);
    }
    

    function canShowPieMenu(event) {
        return !state.isFullScreenPopupOpen && !state.isPieMenuVisible && !state.isPopupOpen && !state.isContextMenuOpen && isInInteractiveZone(event.clientX, event.clientY);
    }

    window.addEventListener("mousedown", function(event) {
        if (event.button === 0 && !state.isFullScreenPopupOpen) {
            togglePieMenu(true, event);
            event.preventDefault();
            blur(elements.content, 1);
            fade(elements.centerText, 0);
        }
    });
    
    window.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            togglePieMenu(false, event);
            event.preventDefault();
        }
    });

    function clearInteractiveComponents() {
        imageConfigs.forEach(config => {
            if (config.element) {
                document.body.removeChild(config.element);
                config.element = null;
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
    }

    function createPieMenuItem(config, event) {
        const isHeader = config.name === '_header';
        const offsetX = 160 * config.xOffset * config.scale;
        const offsetY = 160 * config.yOffset * config.scale;
    
        const pieMenuPopupOptions = {
            styles: {
                width: isHeader ? '300px' : '200px',
                height: isHeader ? '75px' : '50px',
                backgroundImage: `url('Resources/${config.name}.png')`,
                backgroundSize: 'cover',
                position: 'absolute',
                zIndex: '4',
                left: `${event.clientX + offsetX - (isHeader ? 150 : 100)}px`,
                top: `${event.clientY + offsetY - (isHeader ? 37.5 : 25)}px`,
                boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.6)'
            }
        };
    
        const pieMenuPopup = createPopup(pieMenuPopupOptions);
        pieMenuPopup.dataset.name = config.name;
        pieMenuPopup.id = config.name;
    
        config.element = pieMenuPopup;
    
        if (config.name !== '_header') {
            pieMenuPopup.addEventListener("mouseenter", () => {
                toggleFullScreenPopup(true, config.name);
                document.removeEventListener("mousemove", updatePopupsScale);
                togglePieMenu(false, event);
            });
            document.addEventListener("mousemove", updatePopupsScale);
        }
        return pieMenuPopup;
    }

    function updatePopupsScale(event) {
        const x2 = event.clientX;
        const y2 = event.clientY;
        imageConfigs.forEach((config) => {
            if (config.name === '_header') {
                return;
            }
            const pieMenuPopup = config.element;
            if (!pieMenuPopup) {
                return;
            }
            let popupRect = pieMenuPopup.getBoundingClientRect();
            let popupCenterX = (popupRect.left + popupRect.right) / 2;
            let popupCenterY = (popupRect.top + popupRect.bottom) / 2;
    
            let distanceToPopup = Math.sqrt(Math.pow(popupCenterX - x2, 2) + Math.pow(popupCenterY - y2, 2));
            let maxDistance = 250; 
            let minScale = 1;
            let maxScale = 0.8;
    
            let scale = minScale + (maxScale - minScale) * (maxDistance - Math.min(distanceToPopup, maxDistance)) / maxDistance;
            pieMenuPopup.style.transform = `scale(${scale})`;
        });
    }
});
