document.addEventListener("DOMContentLoaded", function() {
    const githubUser = 'eameameam';
    const githubRepo = 'Site';
    const githubPath = '';
    let currentPath = '';
    
    const baseFoldersInfo = [
        { name: 'Scripts', path: '', image: 'Scripts.png', description: 'Description for Scripts' },
        { name: 'ETimebookmarksToClips', path: '', image: 'Resources/Tools/ETimebookmarksToClips.png', description: 'Description for ETimebookmarksToClips' },
      ];

    let toolsPopupContent = {
        selectedFile: null // You will need to set this based on some logic
    };
    
    function loadHierarchy() {
        currentPath = githubPath; // Initialize currentPath with the root path
        getGithubRepoFiles(githubUser, githubRepo, currentPath);
    }
    
    function loadFileContent(fullPath) {
        loadFileFromGithub(githubUser, githubRepo, fullPath);
    }
    
    function loadFileFromGithub(user, repo, filePath) {
        fetch(`https://api.github.com/repos/${user}/${repo}/contents/${filePath}`)
            .then(response => response.json())
            .then(data => {
                if (data.content) {
                    const content = atob(data.content);
                    const codePanel = document.querySelector('.code-panel');
                    codePanel.innerHTML = '';
                    const pre = document.createElement('pre');
                    pre.textContent = content;
                    codePanel.appendChild(pre);
                }
            })
            .catch(error => console.error('Ошибка при загрузке файла с GitHub:', error));
    }
    
    function getGithubRepoFiles(user, repo, path) {
        fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const hierarchyPanel = document.querySelector('.hierarchy-content'); // Обновленный селектор
                    hierarchyPanel.innerHTML = '';
                    data.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.textContent = item.name;
                        itemElement.classList.add(item.type); // Add class for styling (file or dir)
    
                        // If the item is a directory, assign a click handler to expand the directory contents
                        if (item.type === 'dir') {
                            itemElement.onclick = function () {
                                currentPath = `${path}/${item.name}`; // Update the current path
                                getGithubRepoFiles(user, repo, currentPath);
                            };
                        } else if (item.type === 'file') { // If the item is a file, load its content
                            itemElement.onclick = function () {
                                loadFileContent(`${path}/${item.name}`);
                            };
                        }
    
                        hierarchyPanel.appendChild(itemElement); // Add the element to the hierarchy panel
                    });
                }
            })
            .catch(error => console.error('Ошибка при загрузке данных из GitHub:', error));
    }

    window.createToolsPopupContent = function() {
        const toolsPopup = document.createElement('div');
        toolsPopup.className = 'tools-popup-content';
        toolsPopup.style.display = 'flex';
        toolsPopup.style.flexDirection = 'column';
        toolsPopup.style.height = '90vh';
    
        const header = window.createPopupHeader('_tools');
        toolsPopup.appendChild(header);
    
        const columnsContainer = document.createElement('div');
        columnsContainer.style.display = 'flex';
    
        const leftPanel = document.createElement('div');
        leftPanel.className = 'hierarchy-panel tools-popup-content';
        leftPanel.style.flex = '1';
        leftPanel.style.display = 'flex';
        leftPanel.style.flexDirection = 'column';
        leftPanel.style.height = '80vh';
    
        const centerPanel = document.createElement('div');
        centerPanel.className = 'code-panel';
        centerPanel.style.flex = '4';
    
        const rightPanel = document.createElement('div');
        rightPanel.className = 'preview-panel';
        rightPanel.style.flex = '2';
        rightPanel.style.display = 'flex';
        rightPanel.style.flexDirection = 'column'; 
        rightPanel.style.alignItems = 'flex-start';
    
        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';
        navContainer.style.paddingBottom = '10px';
      
        const hierarchyContainer = document.createElement('div');
        hierarchyContainer.className = 'hierarchy-content';
        hierarchyContainer.style.flex = '1';
        hierarchyContainer.style.overflowY = 'auto';

        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.style.marginRight = '5px';
        backButton.style.padding = '5px';
        backButton.style.fontSize = '1rem';
        backButton.onclick = function() {
            if (currentPath && currentPath !== githubPath) {
                const lastSlashIndex = currentPath.lastIndexOf('/');
                currentPath = lastSlashIndex > 0 ? currentPath.substring(0, lastSlashIndex) : '';
                getGithubRepoFiles(githubUser, githubRepo, currentPath);
            }
        };
        
        const homeButton = document.createElement('button');
        homeButton.textContent = 'Home';
        homeButton.style.padding = '5px';
        homeButton.style.fontSize = '1rem';
        homeButton.onclick = function() {
            createInitialHierarchy(hierarchyContainer);
        };

        navContainer.appendChild(homeButton);
        navContainer.appendChild(backButton);

        const createInitialHierarchy = function(container) {
            container.innerHTML = ''; // Очистка текущего содержимого
            baseFoldersInfo.forEach(folder => {
              const folderElement = document.createElement('div');
              folderElement.className = 'folder';
              folderElement.textContent = folder.name;
              folderElement.style.cursor = 'pointer';
              folderElement.onclick = function() {
                if (folder.path) {
                  currentPath = folder.path;
                  getGithubRepoFiles(githubUser, githubRepo, currentPath);
                } else {
                  displayImageAndDescription(rightPanel, folder.image, folder.description);
                }
              };
              container.appendChild(folderElement);
            });
          };
                  
        createInitialHierarchy(hierarchyContainer);

        leftPanel.appendChild(navContainer);
        leftPanel.appendChild(hierarchyContainer);
        
        columnsContainer.appendChild(leftPanel);
        columnsContainer.appendChild(centerPanel);
        columnsContainer.appendChild(rightPanel);
      
        toolsPopup.appendChild(columnsContainer);

        const toolsDiv = document.getElementById('_tools');
        if (toolsDiv) {
            toolsDiv.appendChild(toolsPopup);
        }
    
        return toolsPopup;
    };
    


    function displayImageAndDescription(panel, imageSrc, descriptionText) {
        panel.innerHTML = ''; // Очищаем содержимое панели
        const image = new Image();
        image.src = imageSrc;
        const descElement = document.createElement('p');
        descElement.textContent = descriptionText;
        descElement.style.color = 'white';
        descElement.style.textAlign = 'center';
        descElement.style.fontSize = '1rem';
        panel.appendChild(image);
        panel.appendChild(descElement);
    }
    
    
    window.createPopupHeader = function(popupName) {
        const header = document.createElement('div');
        header.className = 'popup-header';
        header.style.display = 'flex';
        header.style.justifyContent = 'flex-start';
        header.style.alignItems = 'center';
        header.style.height = '10%'; 
    
        const logo = document.createElement('img');
        logo.src = `Resources/${popupName}Header.png`;
        logo.alt = 'Logo';
        logo.style.height = '90%';
    
        const descriptionText = popupName === '_tools' ? 
            "Comprehensive suite of tools crafted for rigging, animation, and seamless integration between Maya and Unity. " +
            "Features one-click solutions for data transfer, animator-friendly visualization in 3D space, " +
            "and a host of utilities for efficient rig manipulation. Designed to streamline the workflow for 3D artists and animators." : 
            "Your Description Here";
    
        const description = document.createElement('span');
        description.textContent = descriptionText; 
        description.style.marginLeft = '1rem';
        description.style.color = 'white';
        description.style.fontSize = '1rem';
    
        header.appendChild(logo);
        header.appendChild(description);
    
        return header;
    };

});
