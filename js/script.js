// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
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
        const quickNav = document.querySelector('.quick-nav .container');
        if (quickNav) {
            quickNav.insertBefore(searchContainer, quickNav.firstChild);
        }

        // 搜索功能实现
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    searchResults.style.display = 'none';
                    return;
                }

                // 搜索所有链接
                const allLinks = document.querySelectorAll('.resource-list a');
                const results = [];

                allLinks.forEach(link => {
                    const text = link.textContent.toLowerCase();
                    if (text.includes(query)) {
                        results.push({
                            title: link.textContent,
                            url: link.href,
                            category: link.closest('.resource-category')?.querySelector('.category-title')?.textContent || '未分类'
                        });
                    }
                });

                // 显示搜索结果
                if (results.length > 0) {
                    searchResults.innerHTML = results.slice(0, 10).map(result => `
                        <div class="search-result-item">
                            <a href="${result.url}" target="_blank">
                                <div class="result-title">${result.title}</div>
                                <div class="result-category">${result.category}</div>
                            </a>
                        </div>
                    `).join('');
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div class="no-results">未找到相关资源</div>';
                    searchResults.style.display = 'block';
                }
            });

            // 点击外部区域隐藏搜索结果
            document.addEventListener('click', function(e) {
                if (!searchContainer.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
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

    // 初始化所有功能
    function init() {
        createSearchFeature();
        updateStats();
        addAnimations();
        createBackToTopButton();
        createThemeToggle();
        trackVisits();
        setupKeyboardShortcuts();
        
        // 初始化导航高亮
        updateActiveNavLink();
        
        console.log('Gopher Navigator 已加载完成！');
    }

    // 执行初始化
    init();

    // 全局暴露scrollToSection函数
    window.scrollToSection = scrollToSection;
});

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