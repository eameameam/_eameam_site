document.addEventListener("DOMContentLoaded", function () {
    let contextMenu = null;
    let subMenu = null;
    let isCustomContextMenuEnabled = true;

    const rmbMenuElements = {
        content: document.getElementById("content"),
        overlay: document.getElementById("rmbMenuOverlay")
    };

    const menuStructure = {
        "Body": ["Body1", "Body2", "Body3", "Body4", "Body5"],
        "Hands": ["Hands1", "Hands2", "Hands3", "Hands4", "Hands5"],
        "Legs": ["Legs1", "Legs2", "Legs3", "Legs4", "Legs5"],
        "Hair": ["Hair1", "Hair2", "Hair3", "Hair4", "Hair5"],
        "Face": ["Face1", "Face2", "Face3", "Face4", "Face5"],
        "Export": ["Png", "Fbx"]
    };

    function createContextMenu(event) {
        console.log('Creating main context menu.');
        stateContextMenu();
        state.isContextMenuOpen = true;
        console.log('Текущее состояние в createContextMenu 1 state.isContextMenuOpen:', state.isContextMenuOpen);
        lastClickCoords = { x: event.clientX, y: event.clientY };
    
        contextMenu = document.createElement("div");
        contextMenu.classList.add("rmbMenu");
        contextMenu.style.position = "absolute";
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.zIndex = "9999";
    
        for (const [key, values] of Object.entries(menuStructure)) {
            const menuItem = document.createElement("div");
            menuItem.textContent = key;
            
            if (values.length) {
                menuItem.addEventListener('mouseover', () => {
                    createSubMenu(key, menuItem.getBoundingClientRect());
                    menuItem.style.color = '#f1f1f1';
                });
                menuItem.addEventListener('mouseout', event => {
                    if (subMenu && !subMenu.contains(event.relatedTarget) && !menuItem.contains(event.relatedTarget)) {
                        document.body.removeChild(subMenu);
                        subMenu = null;
                    }
                    menuItem.style.color = '#b1b1b1';
                });
            } else {
                menuItem.addEventListener('mouseover', () => menuItem.style.color = '#f1f1f1');
                menuItem.addEventListener('mouseout', () => menuItem.style.color = '#b1b1b1');
            }
    
            contextMenu.appendChild(menuItem);
        }      
        document.body.appendChild(contextMenu);
        
    }
    
    function toggleContextMenu(show = false, event) {
        console.log('Текущее состояние в toggleContextMenu 1 state.isContextMenuOpen:', state.isContextMenuOpen);

        if (state.isPopupOpen || state.isFullScreenPopupOpen || state.isPieMenuVisible) {
            return;
        }
        
        if (state.isContextMenuOpen) {
            closeAllMenus();
            
        }
    
        if (show && isCustomContextMenuEnabled && isInInteractiveZone(event.clientX, event.clientY)) {
            console.log('Текущее состояние в toggleContextMenu 2 state.isContextMenuOpen:', state.isContextMenuOpen);

            if (!document.getElementById("rmbMenuOverlay")) {
                document.body.appendChild(rmbMenuElements.overlay);
            }
            blur(rmbMenuElements.content, 1);
            rmbMenuElements.overlay.style.opacity = 0.5;
    
            createContextMenu(event);
        }
    }
    
    function createSubMenu(key, rect) {
        if (subMenu) {
            document.body.removeChild(subMenu);
        }
    
        subMenu = document.createElement("div");
        styleAndAppendSubMenu(subMenu, rect);
        const subMenuItems = menuStructure[key];
    
        for (const subItem of subMenuItems) {
            const menuItem = createSubMenuItems(subItem);
            subMenu.appendChild(menuItem);
        }
        document.body.appendChild(subMenu);
        console.log(`Creating sub-menu for ${key}.`);
    }
    
    function styleAndAppendSubMenu(menu, rect) {
        menu.classList.add("rmbMenu");
        menu.style.position = "absolute";
        menu.style.left = `${rect.right}px`;
        menu.style.top = `${rect.top}px`;
        menu.style.zIndex = "10000";
        menu.addEventListener('mouseleave', handleSubMenuMouseLeave);
    }
    
    function createSubMenuItems(subItem) {
        console.log('Текущее состояние в createSubMenuItems 1 state.isContextMenuOpen:', state.isContextMenuOpen);
        const menuItem = document.createElement("div");
        menuItem.textContent = subItem;
        menuItem.addEventListener('mouseover', () => menuItem.style.color = '#f1f1f1');
        menuItem.addEventListener('mouseout', () => menuItem.style.color = '#b1b1b1');
        menuItem.addEventListener("click", () => handleSubMenuItemClick(subItem));
        return menuItem;
    }
    
    
    function outsideClickHandler(event) {
        if (!subMenu || !subMenu.contains(event.target)) {
            closeAllMenus();
        }
    }
    
    function closeAllMenus() {
        console.log('Текущее состояние в closeAllMenus 1 state.isContextMenuOpen:', state.isContextMenuOpen);
        if (state.isContextMenuOpen) {
            rmbMenuElements.overlay.style.opacity = 0;
            blur(rmbMenuElements.content, 0);
            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
                console.log('same here hahaha.');
            }
            if (subMenu) {
                document.body.removeChild(subMenu);
                subMenu = null;
                console.log('ive no idea what is that.');
            }
            console.log('trying to close menu');
            document.removeEventListener("click", outsideClickHandler); 
        }
        console.log('isnt trying to close menu');
    }
    
    function handleContextMenu(event) {
        console.log('Текущее состояние в handleContextMenu 1 state.isContextMenuOpen:', state.isContextMenuOpen);
        if (isCustomContextMenuEnabled) {
            console.log('Текущее состояние в handleContextMenu 2 state.isContextMenuOpen:', state.isContextMenuOpen);
            event.preventDefault();
            toggleContextMenu(true, event);
            document.addEventListener("click", outsideClickHandler);
        }
    }

    function handleSubMenuMouseLeave() {
        document.body.removeChild(subMenu);
        subMenu = null;
        console.log('leave');
        console.log('Текущее состояние в handleSubMenuMouseLeave 1 state.isContextMenuOpen:', state.isContextMenuOpen);
    }

    function handleSubMenuItemClick(subItem) {
        console.log(`Выбран пункт: ${subItem}`);
        console.log('Текущее состояние в handleSubMenuItemClick 1 state.isContextMenuOpen:', state.isContextMenuOpen);
        closeAllMenus();
    }
    




    window.closeAllMenus = closeAllMenus;
    window.toggleContextMenu = toggleContextMenu;

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mousedown", outsideClickHandler);
});