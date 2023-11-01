document.addEventListener("DOMContentLoaded", function () {
    let contextMenu = null;
    let subMenu = null;
    let isCustomContextMenuEnabled = true;
    let isContextMenuOpen = false;

    const rmbMenuElements = {
        content: document.getElementById("content"),
        overlay: document.getElementById("rmbMenuOverlay")
    };

    const interactiveZone = {
        startX: window.innerWidth * 0.15,
        endX: window.innerWidth * 0.85,
        startY: window.innerHeight * 0.15,
        endY: window.innerHeight * 0.85
    };
    
    const menuStructure = {
        "Body": ["Body1", "Body2", "Body3", "Body4", "Body5"],
        "Hands": ["Hands1", "Hands2", "Hands3", "Hands4", "Hands5"],
        "Legs": ["Legs1", "Legs2", "Legs3", "Legs4", "Legs5"],
        "Hair": ["Hair1", "Hair2", "Hair3", "Hair4", "Hair5"],
        "Face": ["Face1", "Face2", "Face3", "Face4", "Face5"],
        "Export": ["Png", "Fbx"]
    };

    function isInInteractiveZone(x, y) {
        return x >= interactiveZone.startX && x <= interactiveZone.endX && y >= interactiveZone.startY && y <= interactiveZone.endY;
    }

    function createContextMenu(event) {
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
                menuItem.addEventListener('mouseover', function(event) {
                    createSubMenu(key, menuItem.getBoundingClientRect());
                });
    
                menuItem.addEventListener('mouseout', function(event) {
                    if (subMenu && !subMenu.contains(event.relatedTarget) && !this.contains(event.relatedTarget)) {
                        document.body.removeChild(subMenu);
                        subMenu = null;
                    }
                });
            }
            
            menuItem.addEventListener('mouseover', function() {
                this.style.color = '#f1f1f1'; 
            });
        
            menuItem.addEventListener('mouseout', function() {
                this.style.color = '#b1b1b1'; 
            });
        
            contextMenu.appendChild(menuItem);
        }      

        document.body.appendChild(contextMenu);
    }

    function toggleContextMenu(show = false, event) {
        if (isContextMenuOpen) {
            rmbMenuElements.overlay.style.opacity = 0;
            rmbMenuElements.content.classList.remove("blur");
            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
            }
            isContextMenuOpen = false;
        }

        if (show) {
            if (!isCustomContextMenuEnabled || !isInInteractiveZone(event.clientX, event.clientY)) {
                return;
            }

            if (!document.getElementById("rmbMenuOverlay")) {
                document.body.appendChild(rmbMenuElements.overlay);
            }
            rmbMenuElements.content.classList.add("blur");
            rmbMenuElements.overlay.style.opacity = 0.5;

            createContextMenu(event);
            isContextMenuOpen = true;
        }
    }

    function createSubMenu(key, rect) {
        if (subMenu) {
            document.body.removeChild(subMenu);
        }
    
        subMenu = document.createElement("div");
        subMenu.classList.add("rmbMenu");
        subMenu.style.position = "absolute";
        subMenu.style.left = `${rect.right}px`;  // This ensures the submenu is to the right of the main menu item
        subMenu.style.top = `${rect.top}px`;
        subMenu.style.zIndex = "10000";
    
        subMenu.addEventListener('mouseleave', handleSubMenuMouseLeave);
    
        const subMenuItems = menuStructure[key];
        for (const subItem of subMenuItems) {
            const menuItem = document.createElement("div");
            menuItem.textContent = subItem;
    
            menuItem.addEventListener('mouseover', function() {
                this.style.color = '#f1f1f1';
            });
    
            menuItem.addEventListener('mouseout', function() {
                this.style.color = '#b1b1b1';
            });
    
            subMenu.appendChild(menuItem);
        }
    
        document.body.appendChild(subMenu);
    }
    
    

    function handleSubMenuMouseLeave() {
        document.body.removeChild(subMenu);
        subMenu = null;
    }

    rmbMenuElements.overlay.addEventListener("click", function() {
        toggleContextMenu(false);
    });    

    document.addEventListener("contextmenu", function (event) {
        if (isCustomContextMenuEnabled) {
            event.preventDefault();  
            toggleContextMenu(true, event);
        }
    });

    document.addEventListener("click", function(event) {
        if (isContextMenuOpen && contextMenu && !contextMenu.contains(event.target)) {
            toggleContextMenu(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            toggleContextMenu();
        }
    });
});
