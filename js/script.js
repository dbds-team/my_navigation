// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 初始化页面
function initializePage() {
    // 更新页面标题
    document.title = config.app.title;
    const titleElement = document.querySelector('.nav-title h1');
    if (titleElement) {
        titleElement.textContent = config.app.title;
    }

    loadTabs();
    if (config.tabs && config.tabs.length > 0) {
        loadSidebar(config.tabs[0].id);
    }
    initializeEventListeners();
}

// 加载标签页
function loadTabs() {
    const tabsContainer = document.querySelector('.nav-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = ''; // 清空现有内容

    if (!config.tabs || config.tabs.length === 0) return;

    config.tabs.forEach(tab => {
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-item';
        tabButton.setAttribute('data-tab', tab.id);
        tabButton.innerHTML = `<i class="${tab.icon}"></i>${tab.name}`;
        tabButton.title = tab.description; // 添加工具提示
        tabsContainer.appendChild(tabButton);
    });

    // 激活第一个标签页
    const firstTab = document.querySelector('.tab-item');
    if (firstTab) {
        firstTab.classList.add('active');
    }
}

// 切换标签页
function switchTab(tabId) {
    // 更新标签页状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });

    // 加载对应的侧边栏
    loadSidebar(tabId);

    // 清空内容区域
    const content = document.querySelector('.content');
    content.innerHTML = '';
}

// 加载侧边栏
function loadSidebar(tabId) {
    const sidebar = document.querySelector('.category-nav');
    sidebar.innerHTML = '';

    // 从新的配置结构中获取内容
    const tabContent = config.content[tabId];
    if (!tabContent || !tabContent.categories) return;

    tabContent.categories.forEach(category => {
        const categoryGroup = document.createElement('div');
        categoryGroup.className = 'nav-group';

        const header = document.createElement('div');
        header.className = 'nav-group-header';
        header.innerHTML = `
            <i class="${category.icon}"></i>
            <span>${category.name}</span>
            <i class="fas fa-chevron-down"></i>
        `;

        const content = document.createElement('div');
        content.className = 'nav-group-content';

        category.subcategories.forEach(subcategory => {
            const subgroup = document.createElement('div');
            subgroup.className = 'nav-subgroup';
            subgroup.innerHTML = `
                <div class="nav-subgroup-header">
                    <span>${subcategory.name}</span>
                </div>
            `;

            subgroup.addEventListener('click', () => {
                document.querySelectorAll('.nav-subgroup').forEach(sg => {
                    sg.classList.remove('active');
                });
                subgroup.classList.add('active');
                showContent(tabId, category, subcategory);
            });

            content.appendChild(subgroup);
        });

        categoryGroup.appendChild(header);
        categoryGroup.appendChild(content);
        sidebar.appendChild(categoryGroup);

        // 添加折叠/展开功能
        header.addEventListener('click', () => {
            categoryGroup.classList.toggle('collapsed');
        });
    });

    // 默认点击第一个子分类
    const firstSubgroup = sidebar.querySelector('.nav-subgroup');
    if (firstSubgroup) {
        firstSubgroup.click();
    }
}

// 显示内容 - 支持不同的内容类型
function showContent(tabId, category, subcategory) {
    const content = document.querySelector('.content');

    // 构建面包屑导航
    const breadcrumb = `${category.name} > ${subcategory.name}`;

    if (subcategory.contentType === 'table') {
        // 表格类型内容 - 用于工具链接等
        content.innerHTML = `
            <div class="content-header">
                <h2>${subcategory.name}</h2>
                <p class="breadcrumb">${breadcrumb}</p>

            </div>
            <div class="table-container">
                <table class="tools-table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>描述</th>
                            <th>标签</th>
                            <th>链接</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subcategory.data.map(item => `
                            <tr>
                                <td class="tool-name">${item.name}</td>
                                <td class="tool-description">${item.description}</td>
                                <td class="tool-tags">
                                    ${item.tags ? item.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('') : ''}
                                </td>
                                <td class="tool-links">
                                    ${item.links.map(link => `
                                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="tool-link">
                                            <i class="fas fa-external-link-alt"></i>
                                            ${link.text}
                                        </a>
                                    `).join('')}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else if (subcategory.contentType === 'text') {
        // 文本类型内容 - 用于详细说明等
        const data = subcategory.data;
        content.innerHTML = `
            <div class="content-header">
                <h2>${data.title}</h2>
                <p class="breadcrumb">${breadcrumb}</p>
                <p class="description">${data.description}</p>
            </div>
            <div class="text-content">
                ${data.sections.map(section => `
                    <div class="content-section">
                        <h3>${section.title}</h3>
                        <ul class="content-list">
                            ${section.content.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                ${data.resources && data.resources.length > 0 ? `
                    <div class="resources-section">
                        <h3>相关资源</h3>
                        <div class="resource-links">
                            ${data.resources.map(resource => `
                                <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                    <i class="fas fa-link"></i>
                                    ${resource.title}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// 搜索工具 - 更新以支持新的数据结构
function searchTools(keyword) {
    if (!keyword.trim()) {
        return;
    }

    const searchResults = [];
    keyword = keyword.toLowerCase();

    // 遍历所有标签页的内容
    config.tabs.forEach(tab => {
        const tabContent = config.content[tab.id];
        if (!tabContent || !tabContent.categories) return;

        tabContent.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                if (subcategory.contentType === 'table' && subcategory.data) {
                    subcategory.data.forEach(item => {
                        if (
                            item.name.toLowerCase().includes(keyword) ||
                            item.description.toLowerCase().includes(keyword) ||
                            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(keyword)))
                        ) {
                            searchResults.push({
                                item,
                                category: category.name,
                                subcategory: subcategory.name,
                                tab: tab.name,
                                contentType: subcategory.contentType
                            });
                        }
                    });
                } else if (subcategory.contentType === 'text' && subcategory.data) {
                    const data = subcategory.data;
                    if (
                        data.title.toLowerCase().includes(keyword) ||
                        data.description.toLowerCase().includes(keyword) ||
                        data.sections.some(section =>
                            section.title.toLowerCase().includes(keyword) ||
                            section.content.some(content => content.toLowerCase().includes(keyword))
                        )
                    ) {
                        searchResults.push({
                            item: data,
                            category: category.name,
                            subcategory: subcategory.name,
                            tab: tab.name,
                            contentType: subcategory.contentType
                        });
                    }
                }
            });
        });
    });

    const content = document.querySelector('.content');
    content.innerHTML = `
        <div class="content-header">
            <h2>搜索结果</h2>
            <p class="search-info">关键词: "${keyword}" | 找到 ${searchResults.length} 个结果</p>
        </div>
        ${searchResults.length ? `
            <div class="search-results">
                ${searchResults.map(result => {
                    if (result.contentType === 'table') {
                        return `
                            <div class="search-result-item">
                                <h3>${result.item.name}</h3>
                                <p class="result-description">${result.item.description}</p>
                                <p class="result-path">${result.tab} > ${result.category} > ${result.subcategory}</p>
                                <div class="result-links">
                                    ${result.item.links.map(link => `
                                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="tool-link">
                                            <i class="fas fa-external-link-alt"></i>
                                            ${link.text}
                                        </a>
                                    `).join('')}
                                </div>
                                ${result.item.tags ? `
                                    <div class="result-tags">
                                        ${result.item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    } else {
                        return `
                            <div class="search-result-item">
                                <h3>${result.item.title}</h3>
                                <p class="result-description">${result.item.description}</p>
                                <p class="result-path">${result.tab} > ${result.category} > ${result.subcategory}</p>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        ` : '<div class="no-results"><p>未找到相关内容</p></div>'}
    `;
}

// 初始化事件监听
function initializeEventListeners() {
    // 标签页切换
    document.querySelector('.nav-tabs').addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab-item');
        if (tabButton) {
            const tabId = tabButton.getAttribute('data-tab');
            switchTab(tabId);
        }
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTools(e.target.value);
        }, 300);
    });
}

// 平滑滚动到指定部分
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 为快速导航卡片添加点击事件
const navCards = document.querySelectorAll('.nav-card');
navCards.forEach(card => {
    card.addEventListener('click', function() {
        const onclick = this.getAttribute('onclick');
        if (onclick) {
            const sectionId = onclick.match(/scrollToSection\('(.+)'\)/)[1];
            scrollToSection(sectionId);
        }
    });
});

// 导航链接平滑滚动
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// 页面滚动时的导航高亮
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100; // 偏移量

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// 监听滚动事件
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// 节流函数
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 搜索功能
function createSearchFeature() {
    // 创建搜索框
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="搜索资源..." class="search-input">
        <div id="searchResults" class="search-results"></div>
    `;

    // 将搜索框插入到快速导航区域
}

// 统计功能
function updateStats() {
    const resourceLinks = document.querySelectorAll('.resource-list a').length;
    const categories = document.querySelectorAll('.resource-category').length;
    const sections = document.querySelectorAll('.content-section').length;

    // 更新统计数字
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = resourceLinks + '+';
        statNumbers[1].textContent = categories + '+';
        statNumbers[2].textContent = sections + '+';
    }
}

// 动画效果
function addAnimations() {
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.resource-category, .nav-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 返回顶部按钮
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', '返回顶部');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTop);

    // 控制按钮显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// 主题切换功能
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', '切换主题');
    
    // 添加到导航栏
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const themeItem = document.createElement('li');
        themeItem.className = 'nav-item';
        themeItem.appendChild(themeToggle);
        navMenu.appendChild(themeItem);
    }

    // 检查本地存储的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// 访问统计
function trackVisits() {
    let visits = localStorage.getItem('siteVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('siteVisits', visits);
    
    console.log(`您是第 ${visits} 次访问本站`);
}

// 键盘快捷键
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + K 或 Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // ESC 关闭搜索结果
        if (e.key === 'Escape') {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        }
    });
}

// 添加额外的CSS样式
const additionalStyles = `
    .search-container {
        margin-bottom: 2rem;
        position: relative;
        max-width: 500px;
        margin: 0 auto 2rem;
    }

    .search-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .search-input:focus {
        border-color: #00ADD8;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    }

    .search-result-item {
        border-bottom: 1px solid #f0f0f0;
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-item a {
        display: block;
        padding: 1rem;
        text-decoration: none;
        color: #333;
        transition: background-color 0.3s ease;
    }

    .search-result-item a:hover {
        background-color: #f8f9fa;
    }

    .result-title {
        font-weight: 600;
        margin-bottom: 0.2rem;
    }

    .result-category {
        font-size: 0.8rem;
        color: #666;
    }

    .no-results {
        padding: 1rem;
        text-align: center;
        color: #666;
    }

    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #00ADD8;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        background: #0088a8;
        transform: translateY(-2px);
    }

    .theme-toggle {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    .theme-toggle:hover {
        background-color: rgba(0, 173, 216, 0.1);
    }

    .nav-link.active {
        color: #00ADD8;
    }

    .nav-link.active::after {
        width: 100%;
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .dark-theme {
        background-color: #1a1a1a;
        color: #e0e0e0;
    }

    .dark-theme .header {
        background: #2d2d2d;
    }

    .dark-theme .nav-link {
        color: #e0e0e0;
    }

    .dark-theme .search-input {
        background: #2d2d2d;
        color: #e0e0e0;
        border-color: #404040;
    }

    .dark-theme .search-results {
        background: #2d2d2d;
        border-color: #404040;
    }

    .dark-theme .search-result-item a {
        color: #e0e0e0;
    }

    .dark-theme .search-result-item a:hover {
        background-color: #404040;
    }

    @media (max-width: 768px) {
        .search-container {
            margin: 0 1rem 2rem;
        }
        
        .back-to-top {
            bottom: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
        }
    }
`;

// 将额外样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 数据存储
let knowledgeBase = {
    vuln: {
        rce: [
            {
                title: "Spring4Shell远程代码执行漏洞",
                severity: "high",
                description: "Spring Framework远程代码执行漏洞(CVE-2022-22965)",
                tags: ["Spring", "RCE", "Java"],
                links: {
                    analysis: "#",
                    poc: "#"
                }
            }
        ]
    }
};

// DOM元素
const elements = {
    categoryTabs: document.querySelector('.category-tabs'),
    sidebars: document.querySelectorAll('.sidebar'),
    contentSection: document.querySelector('.content'),
    searchInputs: document.querySelectorAll('.search-input'),
    addContentBtn: document.getElementById('addContentBtn'),
    darkModeBtn: document.getElementById('darkModeBtn'),
    modal: document.getElementById('addModal'),
    addContentForm: document.getElementById('addContentForm')
};

// 当前状态
let currentState = {
    tab: null,
    category: null,
    item: null
};

// 标签页状态记录
const tabStates = {};