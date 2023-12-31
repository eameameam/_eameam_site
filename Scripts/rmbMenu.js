document.addEventListener("DOMContentLoaded", function() {
        
    let contextMenu = null;
    let subMenu = null;
    let isCustomContextMenuEnabled = true;

    const menuStructure = {
        "Body": ["Body1", "Body2", "Body3", "Body4", "Body5"],
        "Hands": ["Hands1", "Hands2", "Hands3", "Hands4", "Hands5"],
        "Legs": ["Legs1", "Legs2", "Legs3", "Legs4", "Legs5"],
        "Hair": ["Hair1", "Hair2", "Hair3", "Hair4", "Hair5"],
        "Face": ["Face1", "Face2", "Face3", "Face4", "Face5"],
        "Export": ["Png", "Fbx"]
    };

    function createContextMenu(event) {
        toggleState('isContextMenuOpen');
        state.isContextMenuOpen = true;
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
        if (state.isPopupOpen || state.isFullScreenPopupOpen || state.isPieMenuVisible) {
            return;
        }

        if (state.isContextMenuOpen) {
            closeAllMenus();
        }

        if (show && isCustomContextMenuEnabled && isInInteractiveZone(event.clientX, event.clientY)) {
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
        if (state.isContextMenuOpen) {
            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
            }
            if (subMenu) {
                document.body.removeChild(subMenu);
                subMenu = null;
            }
            document.removeEventListener("click", outsideClickHandler); 

        }
    }

    function handleContextMenu(event) {
        if (isCustomContextMenuEnabled) {
            event.preventDefault();
            toggleContextMenu(true, event);
            document.addEventListener("click", outsideClickHandler);
        }
    }


    function handleSubMenuMouseLeave() {
        document.body.removeChild(subMenu);
        subMenu = null;
    }

    function handleSubMenuItemClick(subItem) {
        console.log(`Выбран пункт: ${subItem}`);
        closeAllMenus();
        toggleState();
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mousedown", outsideClickHandler);
});