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
    

    function loadPreviewAndDescription(fileName) {
        // Ваш код для загрузки превью и описания файла
    }

    window.createToolsPopupContent = function() {

        const toolsPopup = document.createElement('div');
        toolsPopup.className = 'tools-popup-content';
    
        // Style the popup container
        toolsPopup.style.display = 'flex'; // This will align the child divs in a row
        toolsPopup.style.color = 'white'; // Set default text color to white

        // Create and style the panels
        const leftPanel = document.createElement('div');
        leftPanel.className = 'hierarchy-panel';
        leftPanel.style.flex = '1'; // This ensures the div takes up 1/3 of the space

        const centerPanel = document.createElement('div');
        centerPanel.className = 'code-panel';
        centerPanel.style.flex = '1'; // Same as above

        const rightPanel = document.createElement('div');
        rightPanel.className = 'preview-panel';
        rightPanel.style.flex = '1'; // Same as above

        // Append the panels
        toolsPopup.appendChild(leftPanel);
        toolsPopup.appendChild(centerPanel);
        toolsPopup.appendChild(rightPanel);
    
        loadHierarchy();
        loadFileContent(toolsPopupContent.selectedFile);
        loadPreviewAndDescription(toolsPopupContent.selectedFile);
    
        const toolsDiv = document.getElementById('_tools');
        if (toolsDiv) {
            toolsDiv.appendChild(toolsPopup);
        }
    
        return toolsPopup;
    };
    
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
    
});
