// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有预览配置
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    
    if (isPreview) {
        const previewConfig = localStorage.getItem('previewConfig');
        if (previewConfig) {
            try {
                const parsedConfig = JSON.parse(previewConfig);
                // 临时替换配置
                Object.assign(appConfig, parsedConfig);
                console.log('已加载预览配置');
            } catch (error) {
                console.error('加载预览配置失败:', error);
            }
        }
    }
    
    initializePage();
});

// 初始化页面
function initializePage() {
    console.log('开始初始化页面');
    console.log('配置对象:', config);
    
    // 更新页面标题
    document.title = config.app.title;
    const titleElement = document.querySelector('.nav-title h1');
    if (titleElement) {
        titleElement.textContent = config.app.title;
    }

    // 初始化所有标签页的内容结构
    if (config.tabs && config.tabs.length > 0) {
        // 确保所有标签页都有内容对象
        config.tabs.forEach(tab => {
            if (!config.content[tab.id]) {
                console.warn(`标签页 ${tab.id} 没有对应的内容配置，创建空配置`);
                config.content[tab.id] = {
                    categories: []
                };
            }
        });
    }

    loadTabs();
    if (config.tabs && config.tabs.length > 0) {
        console.log('加载第一个标签页侧边栏:', config.tabs[0].id);
        loadSidebar(config.tabs[0].id);
    }
    initializeEventListeners();
}

// 加载标签页
function loadTabs() {
    const tabsContainer = document.querySelector('.nav-tabs');
    if (!tabsContainer) return;

    tabsContainer.replaceChildren(); // 清空现有内容

    if (!config.tabs || config.tabs.length === 0) return;
    
    console.log('加载标签页:', config.tabs); // 添加调试信息
    
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
    console.log('切换标签页:', tabId);
    
    // 更新标签页状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });

    // 加载对应的侧边栏
    loadSidebar(tabId);

    // 清空内容区域
    const content = document.querySelector('.content');
    content.innerHTML = '';
    
    // 自动选择第一个子分类
    setTimeout(() => {
        const allSubHeaders = document.querySelectorAll('.nav-subgroup-header');
        let firstLeafFound = false;
        
        // 遍历所有子分类头部，找到第一个没有子菜单的
        for (let i = 0; i < allSubHeaders.length; i++) {
            const subHeader = allSubHeaders[i];
            if (!subHeader.querySelector('.submenu-icon')) {
                subHeader.click();
                firstLeafFound = true;
                break;
            }
        }
        
        // 如果没有找到叶子节点，点击第一个子分类
        if (!firstLeafFound && allSubHeaders.length > 0) {
            allSubHeaders[0].click();
        }
    }, 100); // 短暂延迟确保DOM已更新
}

// 加载侧边栏
function loadSidebar(tabId) {
    console.log('加载侧边栏，标签页ID:', tabId);
    
    const sidebar = document.querySelector('.category-nav');
    sidebar.innerHTML = '';

    // 从新的配置结构中获取内容
    const tabContent = config.content[tabId];
    console.log('标签页内容:', tabContent);
    
    if (!tabContent || !tabContent.categories) {
        console.error('标签页内容不存在或没有分类:', tabId);
        return;
    }

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

        // 递归创建多级导航
        function createSubcategories(subcategories, level = 0) {
            const container = document.createElement('div');
            container.className = `nav-level-${level}`;
            
            subcategories.forEach(subcategory => {
                const subgroup = document.createElement('div');
                subgroup.className = 'nav-subgroup';
                
                // 创建子分类头部
                const subHeader = document.createElement('div');
                subHeader.className = 'nav-subgroup-header';
                
                // 如果有子分类，添加展开/折叠图标
                if (subcategory.subcategories && subcategory.subcategories.length > 0) {
                    subHeader.innerHTML = `
                        <span>${subcategory.name}</span>
                        <i class="fas fa-chevron-right submenu-icon"></i>
                    `;
                } else {
                    subHeader.innerHTML = `<span>${subcategory.name}</span>`;
                }
                
                subgroup.appendChild(subHeader);
                
                // 如果有子分类，递归创建
                if (subcategory.subcategories && subcategory.subcategories.length > 0) {
                    const childrenContainer = createSubcategories(subcategory.subcategories, level + 1);
                    childrenContainer.style.display = 'none'; // 默认隐藏子菜单
                    subgroup.appendChild(childrenContainer);
                    
                    // 添加展开/折叠功能
                    subHeader.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const icon = subHeader.querySelector('.submenu-icon');
                        if (childrenContainer.style.display === 'none') {
                            childrenContainer.style.display = 'block';
                            icon.classList.remove('fa-chevron-right');
                            icon.classList.add('fa-chevron-down');
                        } else {
                            childrenContainer.style.display = 'none';
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-right');
                        }
                    });
                } else {
                    // 如果是最终节点，添加点击事件显示内容
                    subHeader.addEventListener('click', (e) => {
                        e.stopPropagation();
                        document.querySelectorAll('.nav-subgroup-header').forEach(sg => {
                            sg.classList.remove('active');
                        });
                        subHeader.classList.add('active');
                        showContent(tabId, category, subcategory);
                    });
                }
                
                container.appendChild(subgroup);
            });
            
            return container;
        }
        
        // 创建第一级子分类
        const subcategoriesContainer = createSubcategories(category.subcategories);
        content.appendChild(subcategoriesContainer);

        categoryGroup.appendChild(header);
        categoryGroup.appendChild(content);
        sidebar.appendChild(categoryGroup);

        // 添加折叠/展开功能
        header.addEventListener('click', () => {
            categoryGroup.classList.toggle('collapsed');
        });
    });

    // 默认点击第一个没有子分类的子分类
    const allSubHeaders = sidebar.querySelectorAll('.nav-subgroup-header');
    let firstLeafFound = false;
    
    // 遍历所有子分类头部，找到第一个没有子菜单的
    for (let i = 0; i < allSubHeaders.length; i++) {
        const subHeader = allSubHeaders[i];
        if (!subHeader.querySelector('.submenu-icon')) {
            subHeader.click();
            firstLeafFound = true;
            break;
        }
    }
    
    // 如果没有找到叶子节点，点击第一个子分类
    if (!firstLeafFound && allSubHeaders.length > 0) {
        allSubHeaders[0].click();
    }
}

// 显示内容 - 支持不同的内容类型
function showContent(tabId, category, subcategory) {
    const content = document.querySelector('.content');

    // 构建面包屑导航
    const breadcrumb = `${category.name} > ${subcategory.name}`;

    // 检查是否有内容类型，如果没有则显示默认消息
    if (!subcategory.contentType) {
        content.innerHTML = `
            <div class="content-header">
                <h2>${subcategory.name}</h2>
                <p class="breadcrumb">${breadcrumb}</p>
            </div>
            <div class="empty-content">
                <p>此分类暂无内容</p>
            </div>
        `;
        return;
    }

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
                            <th>链接</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subcategory.data ? subcategory.data.map(item => `
                            <tr>
                                <td class="tool-name">${item.name}</td>
                                <td class="tool-description">${item.description}</td>
                                <td class="tool-links">
                                    ${item.links.map(link => {
                                        // 根据链接类型选择合适的图标
                                        let icon = 'fas fa-external-link-alt';
                                        if (link.url.includes('github.com')) {
                                            icon = 'fab fa-github';
                                        } else if (link.url.includes('gitlab.com')) {
                                            icon = 'fab fa-gitlab';
                                        } else if (link.url.includes('gitee.com')) {
                                            icon = 'fab fa-git-alt';
                                        } else if (link.url.includes('youtube.com') || link.url.includes('youtu.be')) {
                                            icon = 'fab fa-youtube';
                                        } else if (link.url.includes('docs.') || link.url.endsWith('.md') || link.url.includes('documentation')) {
                                            icon = 'fas fa-book';
                                        } else if (link.url.includes('download') || link.url.endsWith('.zip') || link.url.endsWith('.tar.gz')) {
                                            icon = 'fas fa-download';
                                        }
                                        
                                        // 构建链接按钮 - 显示真实URL而不是文本
                                        return `
                                            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="tool-link" title="${link.url}">
                                                <i class="${icon}"></i>
                                                ${link.url}
                                            </a>
                                        `;
                                    }).join('')}
                                </td>
                            </tr>
                        `).join('') : '<tr><td colspan="3">暂无数据</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    } else if (subcategory.contentType === 'text') {
        // 文本类型内容 - 用于详细说明等
        const data = subcategory.data || { title: subcategory.name, description: '暂无描述', sections: [] };
        content.innerHTML = `
            <div class="content-header">
                <h2>${data.title}</h2>
                <p class="breadcrumb">${breadcrumb}</p>
                <p class="description">${data.description}</p>
            </div>
            <div class="text-content">
                ${data.sections && data.sections.length > 0 ? data.sections.map(section => `
                    <div class="content-section">
                        <h3>${section.title}</h3>
                        <ul class="content-list">
                            ${section.content.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('') : '<div class="empty-section">暂无内容</div>'}

                ${data.resources && data.resources.length > 0 ? `
                    <div class="resources-section">
                        <h3>相关资源</h3>
                        <div class="resource-links">
                            ${data.resources.map(resource => {
                                // 根据链接类型选择合适的图标
                                let icon = 'fas fa-link';
                                if (resource.url.includes('github.com')) {
                                    icon = 'fab fa-github';
                                } else if (resource.url.includes('gitlab.com')) {
                                    icon = 'fab fa-gitlab';
                                } else if (resource.url.includes('gitee.com')) {
                                    icon = 'fab fa-git-alt';
                                } else if (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')) {
                                    icon = 'fab fa-youtube';
                                } else if (resource.url.includes('docs.') || resource.url.endsWith('.md') || resource.url.includes('documentation')) {
                                    icon = 'fas fa-book';
                                } else if (resource.url.includes('download') || resource.url.endsWith('.zip') || resource.url.endsWith('.tar.gz')) {
                                    icon = 'fas fa-download';
                                }
                                
                                return `
                                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link" title="${resource.url}">
                                        <i class="${icon}"></i>
                                        ${resource.url}
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        // 未知内容类型
        content.innerHTML = `
            <div class="content-header">
                <h2>${subcategory.name}</h2>
                <p class="breadcrumb">${breadcrumb}</p>
            </div>
            <div class="unknown-content">
                <p>未知的内容类型: ${subcategory.contentType}</p>
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
                            (item.links && item.links.some(link => link.url.toLowerCase().includes(keyword)))
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
                                    ${result.item.links.map(link => {
                                        // 根据链接类型选择合适的图标
                                        let icon = 'fas fa-external-link-alt';
                                        if (link.url.includes('github.com')) {
                                            icon = 'fab fa-github';
                                        } else if (link.url.includes('gitlab.com')) {
                                            icon = 'fab fa-gitlab';
                                        } else if (link.url.includes('gitee.com')) {
                                            icon = 'fab fa-git-alt';
                                        } else if (link.url.includes('youtube.com') || link.url.includes('youtu.be')) {
                                            icon = 'fab fa-youtube';
                                        } else if (link.url.includes('docs.') || link.url.endsWith('.md') || link.url.includes('documentation')) {
                                            icon = 'fas fa-book';
                                        } else if (link.url.includes('download') || link.url.endsWith('.zip') || link.url.endsWith('.tar.gz')) {
                                            icon = 'fas fa-download';
                                        }
                                        
                                        // 构建链接按钮 - 显示真实URL而不是文本
                                        return `
                                            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="tool-link" title="${link.url}">
                                                <i class="${icon}"></i>
                                                ${link.url}
                                            </a>
                                        `;
                                    }).join('')}
                                </div>
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
    console.log('初始化事件监听');
    
    // 标签页切换
    document.querySelector('.nav-tabs').addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab-item');
        if (tabButton) {
            const tabId = tabButton.getAttribute('data-tab');
            console.log('点击标签页:', tabId);
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