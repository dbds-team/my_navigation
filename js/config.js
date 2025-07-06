// 统一配置对象 - 所有数据的中心配置
// 注意: 这个文件可以被外部编辑器修改，请保持JSON格式有效
const appConfig = {
    // 应用基本信息
    "app": {
        "title": "安全知识库导航",
        "description": "专注于安全技术的知识库导航系统，包含漏洞挖掘、Web安全、逆向分析等多个领域的资源。",
        "version": "2.0.0"
    },

    // 主页配置
    "home": {
        "welcome": "欢迎使用安全知识库导航系统",
        "features": [
            {
                "title": "多层级导航",
                "icon": "mdi mdi-folder-multiple",
                "description": "支持多层级的知识分类，方便查找和管理"
            },
            {
                "title": "实时搜索",
                "icon": "mdi mdi-magnify",
                "description": "快速搜索功能，帮助您迅速定位所需内容"
            },
            {
                "title": "个性化配置",
                "icon": "mdi mdi-cog",
                "description": "可自定义的导航结构和内容展示"
            }
        ],
        "quickLinks": [
            {
                "title": "最近更新",
                "items": [
                    { "title": "Web漏洞分析技巧", "link": "#web/analysis" },
                    { "title": "常见攻击方式总结", "link": "#attack/summary" },
                    { "title": "安全工具使用指南", "link": "#tools/guide" }
                ]
            },
            {
                "title": "热门推荐",
                "items": [
                    { "title": "SQL注入进阶", "link": "#vuln/sqli/advanced" },
                    { "title": "逆向分析基础", "link": "#reverse/basic" },
                    { "title": "安全开发实践", "link": "#dev/security" }
                ]
            }
        ]
    },

    // 标签页配置 - 顶部导航标签
    "tabs": [
        {
            "id": "security_tools",
            "name": "安全工具",
            "icon": "fas fa-shield-alt",
            "description": "收集和整理各类安全工具"
        },
        {
            "id": "learning_resources",
            "name": "学习资源",
            "icon": "fas fa-book",
            "description": "安全学习相关的教程和资料"
        },
        {
            "id": "security_frameworks",
            "name": "安全框架",
            "icon": "fas fa-cubes",
            "description": "各种安全开发和测试框架"
        },
        {
            "id": "security_news",
            "name": "安全资讯",
            "icon": "fas fa-newspaper",
            "description": "安全行业动态和资讯"
        },
        {
            "id": "vulnerability_research",
            "name": "漏洞研究",
            "icon": "fas fa-bug",
            "description": "漏洞挖掘和分析相关内容"
        },
        {
            "id": "vulnerability_research1",
            "name": "漏洞研究111222",
            "icon": "fas fa-bug",
            "description": "漏洞挖掘和分析相关内容"
        }
    ],

    // 内容数据配置 - 支持不同的内容类型
    "content": {
        // 安全工具标签页内容
        "security_tools": {
            "categories": [
                {
                    "id": "recon",
                    "name": "信息收集",
                    "icon": "fas fa-search",
                    "subcategories": [
                        {
                            "id": "asset_discovery",
                            "name": "资产发现",
                            "contentType": "table", // 表格类型，显示工具链接
                            "data": [
                                {
                                    "name": "reconftw",
                                    "description": "集成了30个工具的信息收集利器",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/six2dez/reconftw" }
                                    ],
                                    "tags": ["信息收集", "自动化", "集成工具"]
                                },
                                {
                                    "name": "linglong",
                                    "description": "资产扫描监控扫描系统",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/awake1t/linglong" }
                                    ],
                                    "tags": ["资产监控", "扫描系统"]
                                },
                                {
                                    "name": "ARL(灯塔)",
                                    "description": "快速侦察与目标关联的互联网资产，构建基础资产信息库",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/TophantTechnology/ARL" }
                                    ],
                                    "tags": ["资产侦察", "信息库"]
                                }
                            ]
                        },
                        {
                            "id": "subdomain",
                            "name": "子域名收集",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "InfoSearchAll",
                                    "description": "集合了多个网络搜索平台，可以快速在多个网络搜索平台搜索信息并且合并筛选及导出",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/ExpLangcn/InfoSearchAll" }
                                    ],
                                    "tags": ["多平台搜索", "信息收集"]
                                },
                                {
                                    "name": "ThunderSearch",
                                    "description": "使用EloomEye的第三方api-GUI界面",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/zcgyjx/ThunderSearch" }
                                    ],
                                    "tags": ["GUI工具", "API接口"]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "vulnerability",
                    "name": "漏洞检测",
                    "icon": "fas fa-bug",
                    "subcategories": [
                        {
                            "id": "web_security",
                            "name": "Web安全",
                            "description": "Web应用安全测试工具",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "waybackurls",
                                    "description": "从第三方平台获取目标网页内容",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/tomnomnom/waybackurls" }
                                    ],
                                    "tags": ["Web安全", "历史数据"]
                                },
                                {
                                    "name": "gau",
                                    "description": "从多个网站搜取目标相关信息",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/lc/gau" }
                                    ],
                                    "tags": ["信息收集", "多源搜索"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 学习资源标签页内容
        "learning_resources": {
            "categories": [
                {
                    "id": "tutorials",
                    "name": "教程文档",
                    "icon": "fas fa-book-open",
                    "subcategories": [
                        {
                            "id": "web_security_tutorials",
                            "name": "Web安全教程",
                            "description": "Web应用安全相关的学习教程",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "OWASP Top 10",
                                    "description": "Web应用安全风险学习指南",
                                    "links": [
                                        { "text": "官网", "url": "https://owasp.org/www-project-top-ten/" },
                                        { "text": "中文版", "url": "https://owasp.org/Top10/zh_CN/" }
                                    ],
                                    "tags": ["OWASP", "Web安全", "基础教程"]
                                },
                                {
                                    "name": "Web安全学习笔记",
                                    "description": "系统性的Web安全学习资料",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/websec/websec" }
                                    ],
                                    "tags": ["学习笔记", "系统性"]
                                }
                            ]
                        },
                        {
                            "id": "practice_platforms",
                            "name": "实战平台",
                            "description": "安全技能实战练习平台",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "DVWA",
                                    "description": "漏洞练习平台",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/digininja/DVWA" },
                                        { "text": "在线版", "url": "http://www.dvwa.co.uk/" }
                                    ],
                                    "tags": ["靶场", "练习平台"]
                                },
                                {
                                    "name": "WebGoat",
                                    "description": "OWASP官方Web安全教学平台",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/WebGoat/WebGoat" }
                                    ],
                                    "tags": ["OWASP", "教学平台"]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 安全框架标签页内容
        "security_frameworks": {
            "categories": [
                {
                    "id": "web_frameworks",
                    "name": "Web安全框架",
                    "icon": "fas fa-code",
                    "subcategories": [
                        {
                            "id": "php_frameworks",
                            "name": "PHP安全框架",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "Laravel Security",
                                    "description": "Laravel框架的安全最佳实践",
                                    "links": [
                                        { "text": "官网", "url": "https://laravel.com/docs/security" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 安全资讯标签页内容
        "security_news": {
            "categories": [
                {
                    "id": "news_sources",
                    "name": "资讯来源",
                    "icon": "fas fa-newspaper",
                    "subcategories": [
                        {
                            "id": "security_blogs",
                            "name": "安全博客",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "FreeBuf",
                                    "description": "国内领先的网络安全行业门户",
                                    "links": [
                                        { "text": "官网", "url": "https://www.freebuf.com/" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 漏洞研究标签页内容
        "vulnerability_research": {
            "categories": [
                {
                    "id": "vuln_databases",
                    "name": "漏洞库",
                    "icon": "fas fa-database",
                    "subcategories": [
                        {
                            "id": "cve",
                            "name": "CVE",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "CVE官方数据库",
                                    "description": "通用漏洞披露平台",
                                    "links": [
                                        { "text": "官网", "url": "https://cve.mitre.org/" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // 漏洞研究111222标签页内容
        "vulnerability_research1": {
            "categories": [
                {
                    "id": "web_vulns",
                    "name": "Web漏洞",
                    "icon": "fas fa-globe",
                    "subcategories": [
                        {
                            "id": "injection_vulns",
                            "name": "注入类漏洞",
                            "subcategories": [
                                {
                                    "id": "sql_injection",
                                    "name": "SQL注入",
                                    "subcategories": [
                                        {
                                            "id": "sql_injection_basic",
                                            "name": "基础SQL注入",
                                            "contentType": "table",
                                            "data": [
                                                {
                                                    "name": "sqlmap",
                                                    "description": "自动化SQL注入和数据库接管工具",
                                                    "links": [
                                                        { "text": "GitHub", "url": "https://github.com/sqlmapproject/sqlmap" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "id": "sql_injection_advanced",
                                            "name": "高级SQL注入",
                                            "contentType": "table",
                                            "data": [
                                                {
                                                    "name": "NoSQLMap",
                                                    "description": "NoSQL数据库自动化注入工具",
                                                    "links": [
                                                        { "text": "GitHub", "url": "https://github.com/codingo/NoSQLMap" }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "command_injection",
                                    "name": "命令注入",
                                    "contentType": "table",
                                    "data": [
                                        {
                                            "name": "commix",
                                            "description": "自动化命令注入利用工具",
                                            "links": [
                                                { "text": "GitHub", "url": "https://github.com/commixproject/commix" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "xss_vulns",
                            "name": "XSS跨站脚本",
                            "subcategories": [
                                {
                                    "id": "reflected_xss",
                                    "name": "反射型XSS",
                                    "contentType": "table",
                                    "data": [
                                        {
                                            "name": "XSStrike",
                                            "description": "高级XSS检测套件",
                                            "links": [
                                                { "text": "GitHub", "url": "https://github.com/s0md3v/XSStrike" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "stored_xss",
                                    "name": "存储型XSS",
                                    "contentType": "table",
                                    "data": [
                                        {
                                            "name": "DOMPurify",
                                            "description": "XSS防御库",
                                            "links": [
                                                { "text": "GitHub", "url": "https://github.com/cure53/DOMPurify" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "mobile_vulns",
                    "name": "移动应用漏洞",
                    "icon": "fas fa-mobile-alt",
                    "subcategories": [
                        {
                            "id": "android_vulns",
                            "name": "Android漏洞",
                            "subcategories": [
                                {
                                    "id": "android_webview",
                                    "name": "WebView漏洞",
                                    "contentType": "table",
                                    "data": [
                                        {
                                            "name": "MobSF",
                                            "description": "移动安全框架",
                                            "links": [
                                                { "text": "GitHub", "url": "https://github.com/MobSF/Mobile-Security-Framework-MobSF" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "ios_vulns",
                            "name": "iOS漏洞",
                            "contentType": "table",
                            "data": [
                                {
                                    "name": "idb",
                                    "description": "iOS应用安全评估工具",
                                    "links": [
                                        { "text": "GitHub", "url": "https://github.com/dmayer/idb" }
                                    ]
                                }
                            ]
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

// 为了支持外部编辑器，提供加载和保存配置的功能
function loadConfigFromJSON(jsonString) {
    try {
        const newConfig = JSON.parse(jsonString);
        // 将新配置合并到现有配置中
        Object.assign(appConfig, newConfig);
        return true;
    } catch (error) {
        console.error('加载配置失败:', error);
        return false;
    }
}

function getConfigAsJSON() {
    return JSON.stringify(appConfig, null, 2);
}