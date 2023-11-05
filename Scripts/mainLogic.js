let popups = ['_anim', '_rig', '_unity', '_unreal', '_tools', '_header'];

const state = {
    isPopupOpen: false,
    isFullScreenPopupOpen: false,
    isPieMenuVisible: false, 
    isContextMenuOpen: false
};

const elements = {
    overlay: document.getElementById("overlay"),
    content: document.getElementById("content"),
    centerText: document.getElementById("centerText"),
    contactBtn: document.getElementById("contactBtn"),
    contactPopup: document.getElementById("contactPopup"),
    contactCloseBtn: document.getElementById("contactCloseBtn"),
    fullScreenPopup: document.getElementById("fullScreenPopup"),
    fullScreenCloseBtn: document.getElementById("fullScreenCloseBtn"),
    fullScreenContent: document.getElementById("fullScreenContent"),
};

elements.centerText.style.opacity = 1;
elements.contactPopup.style.opacity = 0;
elements.fullScreenPopup.style.opacity = 0;
elements.overlay.style.opacity = 0;

function toggleState(menuType) {
    for (let key in state) {
        state[key] = false;
    }

    if (menuType && state.hasOwnProperty(menuType)) {
        state[menuType] = true;
    }
}

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