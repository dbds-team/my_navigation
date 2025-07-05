// 统一配置对象 - 所有数据的中心配置
const appConfig = {
    // 应用基本信息
    app: {
        title: "安全知识库导航",
        description: "专注于安全技术的知识库导航系统，包含漏洞挖掘、Web安全、逆向分析等多个领域的资源。",
        version: "2.0.0"
    },

    // 主页配置
    home: {
        welcome: "欢迎使用安全知识库导航系统",
        features: [
            {
                title: "多层级导航",
                icon: "mdi mdi-folder-multiple",
                description: "支持多层级的知识分类，方便查找和管理"
            },
            {
                title: "实时搜索",
                icon: "mdi mdi-magnify",
                description: "快速搜索功能，帮助您迅速定位所需内容"
            },
            {
                title: "个性化配置",
                icon: "mdi mdi-cog",
                description: "可自定义的导航结构和内容展示"
            }
        ],
        quickLinks: [
            {
                title: "最近更新",
                items: [
                    { title: "Web漏洞分析技巧", link: "#web/analysis" },
                    { title: "常见攻击方式总结", link: "#attack/summary" },
                    { title: "安全工具使用指南", link: "#tools/guide" }
                ]
            },
            {
                title: "热门推荐",
                items: [
                    { title: "SQL注入进阶", link: "#vuln/sqli/advanced" },
                    { title: "逆向分析基础", link: "#reverse/basic" },
                    { title: "安全开发实践", link: "#dev/security" }
                ]
            }
        ]
    },

    // 标签页配置 - 顶部导航标签
    tabs: [
        {
            id: "security_tools",
            name: "安全工具",
            icon: "fas fa-shield-alt",
            description: "收集和整理各类安全工具"
        },
        {
            id: "learning_resources",
            name: "学习资源",
            icon: "fas fa-book",
            description: "安全学习相关的教程和资料"
        },
        {
            id: "security_frameworks",
            name: "安全框架",
            icon: "fas fa-cubes",
            description: "各种安全开发和测试框架"
        },
        {
            id: "security_news",
            name: "安全资讯",
            icon: "fas fa-newspaper",
            description: "安全行业动态和资讯"
        },
        {
            id: "vulnerability_research",
            name: "漏洞研究",
            icon: "fas fa-bug",
            description: "漏洞挖掘和分析相关内容"
        }
    ],

    // 内容数据配置 - 支持不同的内容类型
    content: {
        // 安全工具标签页内容
        security_tools: {
            categories: [
                {
                    id: "recon",
                    name: "信息收集",
                    icon: "fas fa-search",
                    subcategories: [
                        {
                            id: "asset_discovery",
                            name: "资产发现",
                            contentType: "table", // 表格类型，显示工具链接
                            data: [
                                {
                                    name: "reconftw",
                                    description: "集成了30个工具的信息收集利器",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/six2dez/reconftw" }
                                    ],
                                    tags: ["信息收集", "自动化", "集成工具"]
                                },
                                {
                                    name: "linglong",
                                    description: "资产扫描监控扫描系统",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/awake1t/linglong" }
                                    ],
                                    tags: ["资产监控", "扫描系统"]
                                },
                                {
                                    name: "ARL(灯塔)",
                                    description: "快速侦察与目标关联的互联网资产，构建基础资产信息库",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/TophantTechnology/ARL" }
                                    ],
                                    tags: ["资产侦察", "信息库"]
                                }
                            ]
                        },
                        {
                            id: "subdomain",
                            name: "子域名收集",
                            contentType: "table",
                            data: [
                                {
                                    name: "InfoSearchAll",
                                    description: "集合了多个网络搜索平台，可以快速在多个网络搜索平台搜索信息并且合并筛选及导出",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/ExpLangcn/InfoSearchAll" }
                                    ],
                                    tags: ["多平台搜索", "信息收集"]
                                },
                                {
                                    name: "ThunderSearch",
                                    description: "使用EloomEye的第三方api-GUI界面",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/zcgyjx/ThunderSearch" }
                                    ],
                                    tags: ["GUI工具", "API接口"]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "vulnerability",
                    name: "漏洞检测",
                    icon: "fas fa-bug",
                    subcategories: [
                        {
                            id: "web_security",
                            name: "Web安全",
                            description: "Web应用安全测试工具",
                            contentType: "table",
                            data: [
                                {
                                    name: "waybackurls",
                                    description: "从第三方平台获取目标网页内容",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/tomnomnom/waybackurls" }
                                    ],
                                    tags: ["Web安全", "历史数据"]
                                },
                                {
                                    name: "gau",
                                    description: "从多个网站搜取目标相关信息",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/lc/gau" }
                                    ],
                                    tags: ["信息收集", "多源搜索"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 学习资源标签页内容
        learning_resources: {
            categories: [
                {
                    id: "tutorials",
                    name: "教程文档",
                    icon: "fas fa-book-open",
                    subcategories: [
                        {
                            id: "web_security_tutorials",
                            name: "Web安全教程",
                            description: "Web应用安全相关的学习教程",
                            contentType: "table",
                            data: [
                                {
                                    name: "OWASP Top 10",
                                    description: "Web应用安全风险学习指南",
                                    links: [
                                        { text: "官网", url: "https://owasp.org/www-project-top-ten/" },
                                        { text: "中文版", url: "https://owasp.org/Top10/zh_CN/" }
                                    ],
                                    tags: ["OWASP", "Web安全", "基础教程"]
                                },
                                {
                                    name: "Web安全学习笔记",
                                    description: "系统性的Web安全学习资料",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/websec/websec" }
                                    ],
                                    tags: ["学习笔记", "系统性"]
                                }
                            ]
                        },
                        {
                            id: "practice_platforms",
                            name: "实战平台",
                            description: "安全技能实战练习平台",
                            contentType: "table",
                            data: [
                                {
                                    name: "DVWA",
                                    description: "漏洞练习平台",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/digininja/DVWA" },
                                        { text: "在线版", url: "http://www.dvwa.co.uk/" }
                                    ],
                                    tags: ["靶场", "练习平台"]
                                },
                                {
                                    name: "WebGoat",
                                    description: "OWASP官方Web安全教学平台",
                                    links: [
                                        { text: "GitHub", url: "https://github.com/WebGoat/WebGoat" }
                                    ],
                                    tags: ["OWASP", "教学平台"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 安全框架标签页内容
        security_frameworks: {
            categories: [
                {
                    id: "development_frameworks",
                    name: "开发框架",
                    icon: "fas fa-code",
                    subcategories: [
                        {
                            id: "web_frameworks",
                            name: "Web安全框架",
                            description: "Web应用安全开发框架",
                            contentType: "table",
                            data: [
                                {
                                    name: "Spring Security",
                                    description: "Java安全框架",
                                    links: [
                                        { text: "官网", url: "https://spring.io/projects/spring-security" },
                                        { text: "文档", url: "https://docs.spring.io/spring-security/reference/" }
                                    ],
                                    tags: ["Java", "Spring", "认证授权"]
                                },
                                {
                                    name: "Django Security",
                                    description: "Python Django安全特性",
                                    links: [
                                        { text: "官方文档", url: "https://docs.djangoproject.com/en/stable/topics/security/" }
                                    ],
                                    tags: ["Python", "Django", "Web安全"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 安全资讯标签页内容
        security_news: {
            categories: [
                {
                    id: "news_sources",
                    name: "资讯来源",
                    icon: "fas fa-rss",
                    subcategories: [
                        {
                            id: "security_blogs",
                            name: "安全博客",
                            description: "知名安全博客和资讯网站",
                            contentType: "table",
                            data: [
                                {
                                    name: "FreeBuf",
                                    description: "国内知名网络安全媒体平台",
                                    links: [
                                        { text: "官网", url: "https://www.freebuf.com/" }
                                    ],
                                    tags: ["中文", "综合资讯"]
                                },
                                {
                                    name: "安全客",
                                    description: "360旗下安全媒体平台",
                                    links: [
                                        { text: "官网", url: "https://www.anquanke.com/" }
                                    ],
                                    tags: ["中文", "技术分析"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 漏洞研究标签页内容
        vulnerability_research: {
            categories: [
                {
                    id: "vulnerability_analysis",
                    name: "漏洞分析",
                    icon: "fas fa-microscope",
                    subcategories: [
                        {
                            id: "sql_injection",
                            name: "SQL注入",
                            description: "SQL注入漏洞相关研究和资料",
                            contentType: "text", // 文本类型，显示详细说明
                            data: {
                                title: "SQL注入漏洞研究",
                                description: "SQL注入是一种常见的Web应用安全漏洞，攻击者通过在应用程序的数据库查询中插入恶意SQL代码来获取、修改或删除数据库中的数据。",
                                sections: [
                                    {
                                        title: "基础概念",
                                        content: [
                                            "SQL注入的定义和工作原理",
                                            "常见的SQL注入类型：联合查询注入、布尔盲注、时间盲注等",
                                            "SQL注入的危害：数据泄露、数据篡改、权限提升等"
                                        ]
                                    },
                                    {
                                        title: "检测方法",
                                        content: [
                                            "手工检测：单引号测试、逻辑判断等",
                                            "自动化工具：SQLMap、Burp Suite等",
                                            "代码审计：静态分析和动态分析"
                                        ]
                                    },
                                    {
                                        title: "防护措施",
                                        content: [
                                            "参数化查询（预编译语句）",
                                            "输入验证和过滤",
                                            "最小权限原则",
                                            "WAF防护"
                                        ]
                                    }
                                ],
                                resources: [
                                    { title: "SQLMap官方文档", url: "https://sqlmap.org/" },
                                    { title: "OWASP SQL注入防护", url: "https://owasp.org/www-community/attacks/SQL_Injection" }
                                ]
                            }
                        },
                        {
                            id: "xss_analysis",
                            name: "XSS跨站脚本",
                            description: "XSS漏洞分析和防护",
                            contentType: "text",
                            data: {
                                title: "XSS跨站脚本攻击研究",
                                description: "跨站脚本攻击(XSS)是一种常见的Web安全漏洞，攻击者通过在网页中注入恶意脚本代码，当其他用户浏览该网页时，恶意脚本会在用户浏览器中执行。",
                                sections: [
                                    {
                                        title: "XSS类型",
                                        content: [
                                            "反射型XSS：恶意脚本通过URL参数等方式传入",
                                            "存储型XSS：恶意脚本被存储在服务器端",
                                            "DOM型XSS：通过修改DOM结构执行恶意脚本"
                                        ]
                                    },
                                    {
                                        title: "攻击载荷",
                                        content: [
                                            "基础载荷：<script>alert('XSS')</script>",
                                            "绕过过滤：大小写变换、编码绕过等",
                                            "高级载荷：Cookie窃取、键盘记录等"
                                        ]
                                    }
                                ],
                                resources: [
                                    { title: "XSS防护指南", url: "https://owasp.org/www-community/attacks/xss/" }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};

// 导出统一配置对象，供其他文件使用
// 为了向后兼容，保留原有的变量名
const config = appConfig;