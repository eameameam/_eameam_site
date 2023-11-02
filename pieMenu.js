document.addEventListener("DOMContentLoaded", function() {
    let circle = null;
    let endCircle = null;
    let line = null;
    let popups = [];
    let isPieMenuVisible  = false;

    const interactiveZone = {
        startX: window.innerWidth * 0.15,
        endX: window.innerWidth * 0.85,
        startY: window.innerHeight * 0.15,
        endY: window.innerHeight * 0.85
    };
    
    function isInInteractiveZone(x, y) {
        return x >= interactiveZone.startX && x <= interactiveZone.endX && y >= interactiveZone.startY && y <= interactiveZone.endY;
    }
    
    const elements = {
        content: document.getElementById("content")
    };

    function togglePieMenu(show = true, event) {
        if (show) {
            if (isPieMenuVisible || isPopupOpen || isFullScreenPopupOpen || !isInInteractiveZone(event.clientX, event.clientY)) {
                togglePieMenu(false);
                return;
            }
            if (isContextMenuOpen) return;
            createEndCircle(event);
            circle = createCircle(event);
            line = createLine(event);
            popups = imageConfigs.map(config => createPieMenuItem(config, event));
            popups.forEach(popup => {
                popup.style.opacity = 1;
                document.body.appendChild(popup);
                popup.addEventListener("mouseenter", onPieMenuItemEnter);
            });
            document.addEventListener("mousemove", drawLine);
            isPieMenuVisible = true;
            document.body.classList.add("no-select");
            elements.content.classList.add("blur");

        } else {
            if (!isPieMenuVisible) return;
            if (circle) document.body.removeChild(circle);
            if (line) document.body.removeChild(line);
            popups.forEach(popup => {
                document.body.removeChild(popup);
                popup.removeEventListener("mouseenter", onPieMenuItemEnter);
            });
            document.removeEventListener("mousemove", drawLine);
            popups = [];
            isPieMenuVisible = false;
            document.body.classList.remove("no-select");
            elements.content.classList.remove("blur");
        }
    }

    function showPieMenu(event) {
        togglePieMenu(true, event);
    }
    
    function hidePieMenu() {
        togglePieMenu(false);
        if (endCircle) {
            document.body.removeChild(endCircle);
            endCircle = null;
        }
    }
    
    function onPieMenuItemEnter(event) {
        if (event.target.dataset.name === '_header') return; 
    
        let fullscreenPopup = document.getElementById("fullscreenPopup");
        if (fullscreenPopup) {
            fullscreenPopup.addEventListener("mouseenter", () => toggleFullScreenPopup(true));
        }
        hidePieMenu();
    }

    document.addEventListener("mousedown", function(event) {
        if (event.button === 0 && !isContextMenuOpen) {
            showPieMenu(event);
        }
    });
    
    
    document.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            hidePieMenu();
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
    
    

    function createCircle(event) {
        circle = document.createElement("div");
        circle.style = "width: 10px; height: 10px; background: rgba(130, 130, 130, 0.9); position: absolute; border-radius: 50%; z-index: 3;";
        circle.style.left = (event.clientX - 5) + "px";
        circle.style.top = (event.clientY - 5) + "px";
        document.body.appendChild(circle);
        return circle;
    }

    function createEndCircle(event) {
        endCircle = document.createElement("div");
        endCircle.style = "width: 10px; height: 10px; background: rgba(130, 130, 130, 0.9); position: absolute; border-radius: 50%; z-index: 3;";
        endCircle.style.left = (event.clientX - 5) + "px";
        endCircle.style.top = (event.clientY - 5) + "px";
        document.body.appendChild(endCircle);
        return endCircle;
    }
    
    function updateEndCirclePosition(event) {
        endCircle.style.left = (event.clientX - 5) + "px";
        endCircle.style.top = (event.clientY - 5) + "px";
    }

    function drawLine(event) {
        let x1 = circle.offsetLeft + 5;
        let y1 = circle.offsetTop + 5;
        let x2 = event.clientX;
        let y2 = event.clientY;
        
        let length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI - 90;
        
        line.style.height = length + "px";
        line.style.left = x1 + "px";
        line.style.top = y1 + "px";
        line.style.transformOrigin = "top left";
        line.style.transform = `rotate(${angle}deg)`;
        
        updateEndCirclePosition(event);
        
        popups.forEach((popup) => {
            if (popup.dataset.name === '_header') return; 
    
            let popupRect = popup.getBoundingClientRect();
            let popupCenterX = (popupRect.left + popupRect.right) / 2;
            let popupCenterY = (popupRect.top + popupRect.bottom) / 2;
    
            let distanceToPopup = Math.sqrt(Math.pow(popupCenterX - x2, 2) + Math.pow(popupCenterY - y2, 2));
    
            let maxDistance = 150; 
            let minScale = 1.0;  
            let maxScale = 0.8; 
    
            let scale = maxScale - (maxScale - minScale) * Math.min(distanceToPopup, maxDistance) / maxDistance;
            popup.style.transform = `scale(${scale})`;
        });
    }
    
    function createLine(event) {
        line = document.createElement("div");
        line.style = "width: 5px; background: rgba(44, 44, 44, 0.9); position: absolute; z-index: 2;";
        line.style.left = (event.clientX - 2.5) + "px"; 
        line.style.top = (event.clientY - 2.5) + "px"; 
        document.body.appendChild(line);
        return line;
    }
});

