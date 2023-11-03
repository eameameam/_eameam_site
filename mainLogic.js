const state = {
    isPopupOpen: false,
    isFullScreenPopupOpen: false,
    isPieMenuVisible: false, 
    isContextMenuOpen: false
};

function stateContactPopup() {
    closeAllStates();
    state.isPopupOpen = true;
}

function stateFullScreenPopup() {
    closeAllStates();
    state.isFullScreenPopupOpen = true;
}

function statePieMenu() {
    closeAllStates();
    state.isPieMenuVisible = true;
}

function stateContextMenu() {
    closeAllStates();
    state.isContextMenuOpen = true;
}

function closeAllStates() {
    for (const key in state) {
        state[key] = false;
    }
}

const elementsOpacity = {
    popup: document.getElementById("popup"),
    fullScreenPopup: document.getElementById("fullScreenPopup"),
    contactOverlay: document.getElementById("contactOverlay"),
    fullScreenOverlay: document.getElementById("fullScreenOverlay"),
    rmbMenuOverlay: document.getElementById("rmbMenuOverlay"),
    centerText: document.getElementById("centerText"),
};

elementsOpacity.popup.style.opacity = 0;
elementsOpacity.fullScreenPopup.style.opacity = 0;
elementsOpacity.contactOverlay.style.opacity = 0;
elementsOpacity.fullScreenOverlay.style.opacity = 0;
elementsOpacity.rmbMenuOverlay.style.opacity = 0;
elementsOpacity.centerText.style.opacity = 1;


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

function blur(element, applyBlur = true) {
    if (!element.classList.contains("blur-transition")) {
        element.classList.add("blur-transition");
    }

    if (applyBlur) {
        element.style.filter = "blur(5px)"; 
    } else {
        element.style.filter = "none";
    }
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





