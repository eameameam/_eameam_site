let isPopupOpen = false;
let isFullScreenPopupOpen = false;
let isPieMenuVisible = false; 
let isContextMenuOpen = false;

function fade(element, targetOpacity, display = "block", duration = 400) {
    const currentOpacity = parseFloat(getComputedStyle(element).opacity);
    const increment = (targetOpacity - currentOpacity) / duration * 16;

    if (targetOpacity > currentOpacity) {
        element.style.display = display;
    }

    function adjustOpacity(timestamp) {
        const newOpacity = parseFloat(element.style.opacity) + increment;
        element.style.opacity = newOpacity;

        if ((increment > 0 && newOpacity < targetOpacity) || (increment < 0 && newOpacity > targetOpacity)) {
            requestAnimationFrame(adjustOpacity);
        } else {
            element.style.opacity = targetOpacity;
            if (targetOpacity == 0) {
                setTimeout(() => {
                    element.style.display = "none";
                }, 100);
            }
        }
    }

    requestAnimationFrame(adjustOpacity);
}

function createPopup(options = {}) {
    const popup = document.createElement("div");
    popup.style.borderRadius = "5px";
    for (const [key, value] of Object.entries(options.styles || {})) {
        popup.style[key] = value;
    }
    if (options.content) {
        popup.innerHTML = options.content;
    }
    return popup;
}
