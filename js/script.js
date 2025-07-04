// 全局状态管理
const AppState = {
    currentMainTab: 'vuln',
    currentSubTab: 'vuln-web',
    theme: 'light',
    resources: {}
};

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 加载主题设置
    loadTheme();
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 加载资源数据
    loadResources();
    
    // 设置默认显示状态
    showDefaultContent();
    
    // 初始化搜索功能
    initializeSearch();
}

// 主题管理
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    AppState.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton();
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('theme', AppState.theme);
    updateThemeButton();
}

function updateThemeButton() {
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        themeButton.textContent = AppState.theme === 'light' ? '🌙' : '☀️';
    }
}

// 标签页切换功能
function switchMainTab(tabName) {
    // 更新活动标签按钮
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 隐藏所有侧边栏部分
    document.querySelectorAll('.sidebar-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示对应的侧边栏部分
    const sidebarSection = document.getElementById(`sidebar-${tabName}`);
    if (sidebarSection) {
        sidebarSection.style.display = 'block';
    }
    
    // 更新当前主标签状态
    AppState.currentMainTab = tabName;
    
    // 显示第一个子内容
    showFirstSubContent(tabName);
}

function showFirstSubContent(mainTab) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // 获取第一个导航链接并显示对应内容
    const firstLink = document.querySelector(`#sidebar-${mainTab} .nav-list a`);
    if (firstLink) {
        const contentId = firstLink.getAttribute('href').substring(1);
        showContent(contentId);
        
        // 设置活动状态
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
        });
        firstLink.classList.add('active');
    }
}

// 内容显示功能
function showContent(contentId) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // 显示指定内容
    const targetContent = document.getElementById(`content-${contentId}`);
    if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
    } else {
        // 如果内容不存在，显示占位符
        showPlaceholderContent(contentId);
    }
    
    // 更新侧边栏活动状态
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="#${contentId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // 更新当前子标签状态
    AppState.currentSubTab = contentId;
    
    // 在移动端关闭侧边栏
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
}

function showPlaceholderContent(contentId) {
    // 创建占位符内容
    const contentArea = document.querySelector('.content-area');
    const existingContent = document.querySelector('.content-section.active');
    
    if (existingContent) {
        existingContent.remove();
    }
    
    const placeholderHTML = `
        <div class="content-section active" id="content-${contentId}">
            <div class="content-header">
                <h2>${getContentTitle(contentId)}</h2>
                <button class="add-btn" onclick="showAddForm('${contentId}')">+ 添加资源</button>
            </div>
            <div class="placeholder">
                <p>🚧 此模块正在完善中，点击"添加资源"开始构建内容...</p>
            </div>
        </div>
    `;
    
    contentArea.innerHTML = placeholderHTML;
}

function getContentTitle(contentId) {
    const titleMap = {
        'vuln-web': 'Web漏洞挖掘',
        'vuln-binary': '二进制漏洞分析',
        'vuln-mobile': '移动应用安全',
        'vuln-cloud': '云安全',
        'vuln-iot': 'IoT安全',
        'vuln-tools': '漏洞工具',
        'vuln-platform': '练习平台',
        'vuln-writeup': '技术文章',
        'prog-go': 'Go语言',
        'prog-python': 'Python',
        'prog-javascript': 'JavaScript',
        'prog-java': 'Java',
        'prog-cpp': 'C/C++',
        'prog-rust': 'Rust',
        'sec-scanner': '漏洞扫描',
        'sec-analysis': '静态分析',
        'sec-forensics': '取证工具',
        'sec-network': '网络安全',
        'devops-docker': '容器技术',
        'devops-k8s': 'Kubernetes',
        'devops-monitor': '监控运维',
        'devops-cicd': 'CI/CD',
        'res-books': '技术书籍',
        'res-courses': '在线课程',
        'res-blogs': '技术博客',
        'res-papers': '学术论文'
    };
    
    return titleMap[contentId] || '未知内容';
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keydown', handleSearchKeydown);
    }
}

function openSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    
    if (searchOverlay && searchInput) {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
}

function closeSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    
    if (searchOverlay) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    clearSearchResults();
}

function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
        clearSearchResults();
        return;
    }
    
    if (query.length < 2) {
        return;
    }
    
    performSearch(query);
}

function handleSearchKeydown(event) {
    if (event.key === 'Escape') {
        closeSearch();
    }
}

function performSearch(query) {
    const results = [];
    
    // 搜索页面中的所有资源链接
    document.querySelectorAll('.resource-list a').forEach(link => {
        const title = link.textContent.toLowerCase();
        const description = link.nextElementSibling ? 
            link.nextElementSibling.textContent.toLowerCase() : '';
        
        if (title.includes(query) || description.includes(query)) {
            results.push({
                title: link.textContent.trim(),
                description: description,
                url: link.href,
                section: getSectionFromLink(link)
            });
        }
    });
    
    displaySearchResults(results, query);
}

function getSectionFromLink(link) {
    const contentSection = link.closest('.content-section');
    if (contentSection) {
        const header = contentSection.querySelector('.content-header h2');
        return header ? header.textContent : '未知分类';
    }
    return '未知分类';
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-placeholder">
                没有找到与 "${query}" 相关的资源
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result-item" style="padding: 12px; border-bottom: 1px solid var(--border-color);">
            <div style="margin-bottom: 4px;">
                <a href="${result.url}" target="_blank" style="color: var(--primary-color); font-weight: 500; text-decoration: none;">
                    ${highlightText(result.title, query)}
                </a>
                <span style="color: var(--text-muted); font-size: 12px; margin-left: 8px;">
                    ${result.section}
                </span>
            </div>
            <div style="color: var(--text-secondary); font-size: 13px;">
                ${highlightText(result.description, query)}
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: var(--accent-color); color: white; padding: 1px 3px; border-radius: 2px;">$1</mark>');
}

function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = '<div class="search-placeholder">输入关键词开始搜索</div>';
    }
}

// 添加资源功能
function showAddForm(category) {
    const addOverlay = document.getElementById('addOverlay');
    const categorySelect = document.getElementById('resourceCategory');
    
    if (addOverlay && categorySelect) {
        // 设置分类选项
        updateCategoryOptions(category);
        
        // 显示弹窗
        addOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 聚焦到第一个输入框
        const firstInput = document.getElementById('resourceName');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeAddForm() {
    const addOverlay = document.getElementById('addOverlay');
    const addForm = document.getElementById('addForm');
    
    if (addOverlay) {
        addOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (addForm) {
        addForm.reset();
    }
}

function updateCategoryOptions(currentCategory) {
    const categorySelect = document.getElementById('resourceCategory');
    if (!categorySelect) return;
    
    const categories = {
        'vuln-web': '基础漏洞类型,测试工具,学习资源',
        'vuln-binary': '逆向工程工具,漏洞利用技术,学习资源',
        'vuln-mobile': '移动安全工具,测试框架,学习资源',
        'vuln-cloud': '云安全工具,配置检查,安全评估',
        'vuln-iot': 'IoT工具,固件分析,协议测试',
        'vuln-tools': '扫描工具,分析工具,利用工具',
        'vuln-platform': '在线靶场,本地环境,竞赛平台',
        'vuln-writeup': '技术文章,实战案例,研究报告'
    };
    
    const currentCategories = categories[currentCategory] || '工具,资源,教程';
    const categoryList = currentCategories.split(',');
    
    categorySelect.innerHTML = '<option value="">选择分类</option>';
    categoryList.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.trim();
        option.textContent = cat.trim();
        categorySelect.appendChild(option);
    });
}

// 资源管理
function loadResources() {
    // 从localStorage加载用户添加的资源
    const savedResources = localStorage.getItem('userResources');
    if (savedResources) {
        try {
            AppState.resources = JSON.parse(savedResources);
            renderUserResources();
        } catch (e) {
            console.warn('Failed to load saved resources:', e);
        }
    }
}

function saveResources() {
    localStorage.setItem('userResources', JSON.stringify(AppState.resources));
}

function addResource(data) {
    if (!AppState.resources[AppState.currentSubTab]) {
        AppState.resources[AppState.currentSubTab] = {};
    }
    
    if (!AppState.resources[AppState.currentSubTab][data.category]) {
        AppState.resources[AppState.currentSubTab][data.category] = [];
    }
    
    AppState.resources[AppState.currentSubTab][data.category].push({
        name: data.name,
        url: data.url,
        description: data.description,
        addedAt: new Date().toISOString()
    });
    
    saveResources();
    renderUserResources();
}

function renderUserResources() {
    // 这里可以实现动态渲染用户添加的资源
    // 暂时先保存数据，后续可以扩展UI
}

// 事件监听器
function initializeEventListeners() {
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        
        // ESC 关闭弹窗
        if (e.key === 'Escape') {
            closeSearch();
            closeAddForm();
        }
    });
    
    // 点击遮罩关闭弹窗
    document.getElementById('searchOverlay')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSearch();
        }
    });
    
    document.getElementById('addOverlay')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAddForm();
        }
    });
    
    // 表单提交
    document.getElementById('addForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        handleAddResourceSubmit();
    });
    
    // 移动端响应
    window.addEventListener('resize', handleResize);
}

function handleAddResourceSubmit() {
    const form = document.getElementById('addForm');
    const formData = new FormData(form);
    
    const resourceData = {
        name: document.getElementById('resourceName').value.trim(),
        url: document.getElementById('resourceUrl').value.trim(),
        description: document.getElementById('resourceDescription').value.trim(),
        category: document.getElementById('resourceCategory').value
    };
    
    // 验证数据
    if (!resourceData.name || !resourceData.url || !resourceData.description || !resourceData.category) {
        alert('请填写所有必需的字段');
        return;
    }
    
    // 验证URL格式
    try {
        new URL(resourceData.url);
    } catch {
        alert('请输入有效的URL地址');
        return;
    }
    
    // 添加资源
    addResource(resourceData);
    
    // 关闭表单
    closeAddForm();
    
    // 显示成功消息
    showSuccessMessage('资源添加成功！');
    
    // 如果当前是占位符页面，刷新内容
    refreshCurrentContent();
}

function showSuccessMessage(message) {
    // 创建临时成功消息
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function refreshCurrentContent() {
    // 如果当前页面是占位符，可以在这里刷新内容
    const currentContent = document.querySelector('.content-section.active .placeholder');
    if (currentContent) {
        // 可以在这里添加刷新逻辑
        console.log('Content refreshed for:', AppState.currentSubTab);
    }
}

// 移动端支持
function handleResize() {
    if (window.innerWidth > 768) {
        // 桌面端：确保侧边栏显示
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
        }
    }
}

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
}

// 默认内容显示
function showDefaultContent() {
    // 默认显示漏洞挖掘 -> Web漏洞
    const defaultTab = 'vuln';
    const defaultContent = 'vuln-web';
    
    // 设置默认主标签
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchMainTab('${defaultTab}')"]`)?.classList.add('active');
    
    // 显示默认侧边栏
    document.querySelectorAll('.sidebar-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`sidebar-${defaultTab}`)?.setAttribute('style', 'display: block');
    
    // 显示默认内容
    showContent(defaultContent);
    
    // 设置默认侧边栏活动状态
    document.querySelector(`a[href="#${defaultContent}"]`)?.classList.add('active');
}

// 导出到全局作用域
window.switchMainTab = switchMainTab;
window.showContent = showContent;
window.toggleTheme = toggleTheme;
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.showAddForm = showAddForm;
window.closeAddForm = closeAddForm;