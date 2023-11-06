document.addEventListener("DOMContentLoaded", function() {
    const githubUser = 'eameameam';
    const githubRepo = 'Site';
    const githubPath = '';
    let toolsPopupContent = {
        selectedFile: null // You will need to set this based on some logic
    };
    
    function loadHierarchy() {
        getGithubRepoFiles(githubUser, githubRepo, githubPath);
    }

    function loadFileContent(fileName) {
        const filePath = fileName ? `${githubPath}/${fileName}` : githubPath;
        loadFileFromGithub(githubUser, githubRepo, filePath);
    }

    function loadFileFromGithub(user, repo, filePath) {
        fetch(`https://api.github.com/repos/${user}/${repo}/contents/${filePath}`)
            .then(response => response.json())
            .then(data => {
                if(data.content) {
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
                    const hierarchyPanel = document.querySelector('.hierarchy-panel');
                    hierarchyPanel.innerHTML = ''; // Очистить текущее содержимое панели
                    data.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.textContent = item.name;
                        itemElement.classList.add(item.type); // Добавить класс для стилизации (file или dir)
    
                        // Если элемент является папкой, назначаем ему обработчик для раскрытия содержимого папки
                        if (item.type === 'dir') {
                            itemElement.onclick = function() { getGithubRepoFiles(user, repo, `${path}/${item.name}`); };
                        } else if (item.type === 'file') { // Если элемент является файлом, загружаем его содержимое
                            itemElement.onclick = function() { loadFileContent(item.name); };
                        }
    
                        hierarchyPanel.appendChild(itemElement); // Добавить элемент в панель иерархии
                    });
                }
            })
            .catch(error => console.error('Ошибка при загрузке данных из GitHub:', error));
    }

    
    window.loadPreviewAndDescription = function(fileName, popupName) {
        const previewBlock = document.createElement('div');
        previewBlock.style.display = 'flex';
        previewBlock.style.flexDirection = 'column';
        previewBlock.style.alignItems = 'center';
        previewBlock.style.justifyContent = 'center';
        previewBlock.style.height = '100%';
    
        const imagePreview = document.createElement('img');
        const currentFolder = getCurrentFolderName() || 'default';
        imagePreview.src = currentFolder === 'site' 
            ? `Resources/Tools/sitePreview.png` 
            : `Resources/Tools/${popupName}Header.png`;
        imagePreview.alt = 'Preview';
        imagePreview.style.width = '100%'; 
        imagePreview.style.height = 'auto'; 
        imagePreview.style.marginBottom = '1rem'; 
    
        const description = document.createElement('p');
        description.textContent = 'Описание файла: ' + fileName;
        description.style.color = 'white';
        description.style.textAlign = 'center';
        description.style.fontSize = '1rem';
    
        previewBlock.appendChild(imagePreview);
        previewBlock.appendChild(description);
    
        return previewBlock;
    };
    
    window.createToolsPopupContent = function() {
        const toolsPopup = document.createElement('div');
        toolsPopup.className = 'tools-popup-content';
        toolsPopup.style.display = 'flex';
        toolsPopup.style.flexDirection = 'column';
        toolsPopup.style.height = '100vh';
    
        const header = window.createPopupHeader('_tools');
        toolsPopup.appendChild(header);
    
        const columnsContainer = document.createElement('div');
        columnsContainer.style.display = 'flex';
    
        const leftPanel = document.createElement('div');
        leftPanel.className = 'hierarchy-panel';
        leftPanel.style.flex = '1';
    
        const centerPanel = document.createElement('div');
        centerPanel.className = 'code-panel';
        centerPanel.style.flex = '4';
    
        const rightPanel = document.createElement('div');
        rightPanel.className = 'preview-panel';
        rightPanel.style.flex = '2';
        rightPanel.style.display = 'flex'; // Установка flex для выравнивания содержимого
        rightPanel.style.flexDirection = 'column'; // Вертикальное направление содержимого
        rightPanel.style.alignItems = 'flex-start'; // Выравнивание содержимого по верху
    
        const previewBlock = window.loadPreviewAndDescription(toolsPopupContent.selectedFile, '_tools');
        rightPanel.appendChild(previewBlock);
    
        columnsContainer.appendChild(leftPanel);
        columnsContainer.appendChild(centerPanel);
        columnsContainer.appendChild(rightPanel);
    
        toolsPopup.appendChild(columnsContainer);
    
        loadHierarchy();
        loadFileContent(toolsPopupContent.selectedFile);
        // Эта строка ниже уже не нужна, так как мы уже добавили previewBlock выше
        // loadPreviewAndDescription(toolsPopupContent.selectedFile, '_tools');
    
        const toolsDiv = document.getElementById('_tools');
        if (toolsDiv) {
            toolsDiv.appendChild(toolsPopup);
        }
    
        return toolsPopup;
    };
    
    
    function getCurrentFolderName() {
        // Функция должна определить текущую папку.
        // Это псевдокод, необходимо реализовать логику в соответствии с вашим окружением
        const path = window.location.pathname;
        const folderName = path.substring(path.lastIndexOf('/')+1);
        return folderName;
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
