document.addEventListener("DOMContentLoaded", function() {
    let circle = null;
    let line = null;
    let popups = [];
    let isMenuShown = false;
    let cleanupTimeout = null;

    function showPieMenu(event) {
        if (isMenuShown) {
            clearExistingTimeout();
            hidePieMenu();
            return;
        }
        event.preventDefault();
        circle = createCircle(event);
        line = createLine(event);
        popups = imageConfigs.map(config => createPieMenuItem(config, event));
        popups.forEach(popup => {
            popup.style.opacity = 1;
            document.body.appendChild(popup);
            popup.addEventListener("mouseenter", onPieMenuItemEnter);
        });
        document.addEventListener("mousemove", drawLine);
        isMenuShown = true;
    }

    function hidePieMenu() {
        if (!isMenuShown) return;
        cleanUp();
        document.removeEventListener("mousemove", drawLine);
        isMenuShown = false;
    }

    function onPieMenuItemEnter() {
        // Здесь ваш код для mouseenter
    }

    document.addEventListener("mousedown", showPieMenu);
    document.addEventListener("mouseup", hidePieMenu);

    function clearExistingTimeout() {
        if (cleanupTimeout) {
            clearTimeout(cleanupTimeout);
            cleanupTimeout = null;
        }
    }

    function cleanUp() {
        if (circle) fade(circle, 0);
        if (line) fade(line, 0);
        popups.forEach(popup => {
            fade(popup, 0);
            popup.removeEventListener("mouseenter", onPieMenuItemEnter);
        });
        clearExistingTimeout();
        cleanupTimeout = setTimeout(() => {
            safeRemoveChild(document.body, circle);
            safeRemoveChild(document.body, line);
            popups.forEach(popup => {
                safeRemoveChild(document.body, popup);
            });
            popups = [];
        }, 400);
    }

    function safeRemoveChild(parent, child) {
        if (parent && child && parent.contains(child)) {
            parent.removeChild(child);
        }
    }
    

    const imageConfigs = [
        { name: '_anim', xOffset: 0, yOffset: -.6, scale: 1.3 },
        { name: '_rig', xOffset: 1, yOffset: 0, scale: 1.3 },
        { name: '_unity', xOffset: -0.8, yOffset: 0.7, scale: 1.3 },
        { name: '_unreal', xOffset: 0.8, yOffset: 0.7, scale: 1.3 },
        { name: '_tools', xOffset: -1, yOffset: 0, scale: 1.3 }
    ];

    function createPieMenuItem(config, event) {
        const popupOptions = {
            styles: {
                width: '200px',
                height: '50px',
                backgroundImage: `url('Resources/${config.name}.png')`,
                backgroundSize: 'cover',
                position: 'absolute',
                left: `${event.clientX + 160 * config.xOffset * config.scale - 100}px`,
                top: `${event.clientY + 160 * config.yOffset * config.scale - 25}px`
            }
        };
        return createPopup(popupOptions);
    }

    function createCircle(event) {
        circle = document.createElement("div");
        circle.style = "width: 10px; height: 10px; background: white; position: absolute; border-radius: 50%;";
        circle.style.left = (event.clientX - 5) + "px";
        circle.style.top = (event.clientY - 5) + "px";
        document.body.appendChild(circle);
        return circle;
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
    }

    function createLine(event) {
        line = document.createElement("div");
        line.style = "width: 5px; background: white; position: absolute;";
        line.style.left = event.clientX + "px";
        line.style.top = event.clientY + "px";
        document.body.appendChild(line);
        return line;
    }


});

