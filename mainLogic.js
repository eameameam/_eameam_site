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
    if (!element.classList.contains("fade-transition")) {
        element.classList.add("fade-transition");
    }
    
    element.style.transitionDuration = `${duration}ms`;

    if (targetOpacity === 1) {
        element.style.display = display;
        setTimeout(() => { 
            element.style.opacity = targetOpacity; 
        }, 0);
    } else {
        element.style.opacity = targetOpacity;
        setTimeout(() => {
            if (parseFloat(getComputedStyle(element).opacity) === 0) {
                element.style.display = "none";
            }
        }, duration);
    }
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





