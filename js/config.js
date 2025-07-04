// 主页面内容配置
const homeConfig = {
    title: "安全知识库导航",
    welcome: "欢迎使用安全知识库导航系统",
    description: "这是一个专注于安全技术的知识库导航系统，包含漏洞挖掘、Web安全、逆向分析等多个领域的资源。",
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
};

// 导航配置
const navigationConfig = {
    // 漏洞挖掘导航
    vuln: {
        name: "漏洞挖掘",
        icon: "mdi mdi-bug",
        groups: [
            {
                title: "Web漏洞",
                icon: "mdi mdi-web",
                subgroups: [
                    {
                        title: "注入漏洞",
                        icon: "mdi mdi-database",
                        categories: [
                            {
                                title: "SQL注入",
                                items: [
                                    {
                                        title: "基础知识",
                                        section: "sqli-basic",
                                        content: {
                                            description: "SQL注入基础知识和原理介绍",
                                            details: [
                                                "SQL注入的定义和原理",
                                                "常见的SQL注入类型",
                                                "SQL注入的危害和影响"
                                            ],
                                            resources: [
                                                { title: "SQL注入测试方法", url: "#" },
                                                { title: "SQL注入防护措施", url: "#" }
                                            ]
                                        }
                                    },
                                    {
                                        title: "高级技巧",
                                        section: "sqli-advanced",
                                        content: {
                                            description: "高级SQL注入技术和绕过方法",
                                            details: [
                                                "盲注技术详解",
                                                "时间注入技巧",
                                                "防护绕过方法"
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                title: "NoSQL注入",
                                items: [
                                    {
                                        title: "MongoDB注入",
                                        section: "nosqli-mongo",
                                        content: {
                                            description: "MongoDB注入漏洞分析",
                                            details: [
                                                "MongoDB注入原理",
                                                "常见攻击向量",
                                                "防护措施"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "文件操作",
                        icon: "mdi mdi-file",
                        categories: [
                            {
                                title: "文件上传",
                                items: [
                                    {
                                        title: "基础知识",
                                        section: "upload-basic",
                                        content: {
                                            description: "文件上传漏洞基础",
                                            details: [
                                                "文件上传漏洞原理",
                                                "常见绕过技术",
                                                "安全防护方案"
                                            ]
                                        }
                                    },
                                    {
                                        title: "绕过技巧",
                                        section: "upload-bypass",
                                        content: {
                                            description: "文件上传防护绕过技巧",
                                            details: [
                                                "MIME类型绕过",
                                                "后缀名绕过",
                                                "内容检测绕过"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "系统漏洞",
                icon: "mdi mdi-desktop-tower",
                subgroups: [
                    {
                        title: "权限提升",
                        icon: "mdi mdi-account-key",
                        categories: [
                            {
                                title: "Linux提权",
                                items: [
                                    {
                                        title: "内核漏洞",
                                        section: "linux-kernel",
                                        content: {
                                            description: "Linux内核漏洞利用",
                                            details: [
                                                "内核漏洞分析",
                                                "EXP开发",
                                                "防护措施"
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                title: "Windows提权",
                                items: [
                                    {
                                        title: "系统服务",
                                        section: "windows-service",
                                        content: {
                                            description: "Windows服务漏洞利用",
                                            details: [
                                                "服务漏洞分析",
                                                "权限提升方法",
                                                "修复方案"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // Web安全导航
    web: {
        name: "Web安全",
        icon: "mdi mdi-web",
        groups: [
            {
                title: "安全开发",
                icon: "mdi mdi-code-tags",
                subgroups: [
                    {
                        title: "前端安全",
                        icon: "mdi mdi-language-html5",
                        categories: [
                            {
                                title: "XSS防护",
                                items: [
                                    {
                                        title: "CSP配置",
                                        section: "csp-config",
                                        content: {
                                            description: "内容安全策略配置指南",
                                            details: [
                                                "CSP基础概念",
                                                "配置最佳实践",
                                                "常见错误分析"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "后端安全",
                        icon: "mdi mdi-server",
                        categories: [
                            {
                                title: "认证授权",
                                items: [
                                    {
                                        title: "JWT实践",
                                        section: "jwt-practice",
                                        content: {
                                            description: "JWT认证最佳实践",
                                            details: [
                                                "JWT工作原理",
                                                "安全配置指南",
                                                "常见漏洞防护"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// 页面配置
const pageConfig = {
    title: "安全工具导航",
    description: "收集和整理各类安全工具"
};

// 顶部标签页配置
const tabs = [
    {
        id: "tools",
        name: "安全工具",
        icon: "mdi-tools"
    },
    {
        id: "resources",
        name: "学习资源",
        icon: "mdi-book-open-page-variant"
    },
    {
        id: "frameworks",
        name: "安全框架",
        icon: "mdi-shield-check"
    },
    {
        id: "news",
        name: "安全资讯",
        icon: "mdi-newspaper"
    }
];

// 侧边栏分类配置
const navCategories = {
    "tools": [
        {
            id: "recon",
            name: "信息收集",
            icon: "mdi-magnify",
            subcategories: [
                {
                    id: "asset_discovery",
                    name: "资产发现",
                    description: "用于发现和收集目标资产信息的工具"
                },
                {
                    id: "subdomain",
                    name: "子域名收集",
                    description: "专注于子域名发现和收集的工具"
                },
                {
                    id: "port_scan",
                    name: "端口扫描",
                    description: "端口扫描和服务识别工具"
                }
            ]
        },
        {
            id: "vulnerability",
            name: "漏洞检测",
            icon: "mdi-bug",
            subcategories: [
                {
                    id: "vulnerability_scan",
                    name: "漏洞扫描",
                    description: "用于发现安全漏洞的扫描工具"
                },
                {
                    id: "web_security",
                    name: "Web安全",
                    description: "Web应用安全测试工具"
                }
            ]
        },
        {
            id: "mobile",
            name: "移动安全",
            icon: "mdi-cellphone",
            subcategories: [
                {
                    id: "mobile_security",
                    name: "移动应用",
                    description: "移动应用安全测试工具"
                },
                {
                    id: "reverse_engineering",
                    name: "逆向工程",
                    description: "移动应用逆向分析工具"
                }
            ]
        },
        {
            id: "defense",
            name: "防御加固",
            icon: "mdi-shield-lock",
            subcategories: [
                {
                    id: "waf",
                    name: "WAF",
                    description: "Web应用防火墙"
                },
                {
                    id: "ids_ips",
                    name: "入侵检测",
                    description: "入侵检测与防御系统"
                }
            ]
        }
    ],
    "resources": [
        {
            id: "tutorials",
            name: "教程文档",
            icon: "mdi-file-document",
            subcategories: [
                {
                    id: "beginner",
                    name: "入门指南",
                    description: "安全测试入门教程"
                },
                {
                    id: "advanced",
                    name: "进阶教程",
                    description: "高级安全技术教程"
                }
            ]
        }
    ],
    "frameworks": [
        {
            id: "security_frameworks",
            name: "安全框架",
            icon: "mdi-view-grid",
            subcategories: [
                {
                    id: "development",
                    name: "开发框架",
                    description: "安全开发框架"
                },
                {
                    id: "testing",
                    name: "测试框架",
                    description: "安全测试框架"
                }
            ]
        }
    ],
    "news": [
        {
            id: "security_news",
            name: "安全动态",
            icon: "mdi-newspaper",
            subcategories: [
                {
                    id: "latest",
                    name: "最新动态",
                    description: "安全行业最新动态"
                },
                {
                    id: "events",
                    name: "安全会议",
                    description: "安全会议与活动"
                }
            ]
        }
    ]
};

// 分类数据
const categories = [
    {
        id: "asset_discovery",
        name: "资产发现",
        description: "用于发现和收集目标资产信息的工具"
    },
    {
        id: "vulnerability_scan",
        name: "漏洞扫描",
        description: "用于发现安全漏洞的扫描工具"
    },
    {
        id: "web_security",
        name: "Web安全",
        description: "Web应用安全测试工具"
    },
    {
        id: "mobile_security",
        name: "移动安全",
        description: "移动应用安全测试工具"
    }
];

// 工具数据
const toolsData = {
    "asset_discovery": [
        {
            name: "reconftw",
            description: "集成了30个工具的信息收集利器",
            url: "https://github.com/six2dez/reconftw"
        },
        {
            name: "linglong",
            description: "资产扫描监控扫描系统",
            url: "https://github.com/awake1t/linglong"
        },
        {
            name: "LangSrcCurise",
            description: "SRC子域名资产监控",
            url: "https://github.com/LangziFun/LangSrcCurise"
        },
        {
            name: "ARL(灯塔)",
            description: "快速侦察与目标关联的互联网资产，构建基础资产信息库",
            url: "https://github.com/TophantTechnology/ARL"
        },
        {
            name: "InfoSearchAll",
            description: "集合了多个网络搜索平台，可以快速在多个网络搜索平台搜索信息并且合并筛选及导出",
            url: "https://github.com/ExpLangcn/InfoSearchAll"
        },
        {
            name: "ThunderSearch",
            description: "使用EloomEye的第方api-GUI界面",
            url: "https://github.com/zcgyjx/ThunderSearch"
        },
        {
            name: "fofa_viewer",
            description: "一个简单实用的FOFA客户端 by-flashine",
            url: "https://github.com/wgpsec/fofa_viewer"
        },
        {
            name: "IEyes",
            description: "icp备案查询，企业资产快速收集工具",
            url: "https://github.com/0x0D/IEyes"
        }
    ],
    "mobile_security": [
        {
            name: "AppInfoScanner",
            description: "移动端(Android、iOS、WEB、H5、静态资站)信息收集扫描工具",
            url: "https://github.com/kelvinBen/AppInfoScanner"
        },
        {
            name: "apkleaks",
            description: "apk检查工具可提取包内url等信息",
            url: "https://github.com/dwisiswant0/apkleaks"
        }
    ],
    "web_security": [
        {
            name: "waybackurls",
            description: "从第三方平台获取目标网页内容",
            url: "https://github.com/tomnomnom/waybackurls"
        },
        {
            name: "gau",
            description: "从多个网站搜取目标相关信息",
            url: "https://github.com/lc/gau"
        },
        {
            name: "Grecon",
            description: "集成GoogleHacking面板来进行信息收集",
            url: "https://github.com/TebbaaX/GRecon"
        }
    ],
    "vulnerability_scan": [
        {
            name: "ENScan_GO",
            description: "一款基于各大企业信息API的工具",
            url: "https://github.com/wgpsec/ENScan_GO"
        },
        {
            name: "ARL-plus-docker",
            description: "基于斗象灯塔ARL修改后的版本，增加源版，增加了OneForAll、中央数据库，修改了altDns",
            url: "https://github.com/ki9mu/ARL-plus-docker"
        },
        {
            name: "ARL-Finger-ADD",
            description: "灯塔（最新版）指纹添加脚本！",
            url: "https://github.com/loecho-sec/ARL-Finger-ADD"
        }
    ]
};

const config = {
    tabs: [
        {
            id: 'security_tools',
            name: '安全工具',
            icon: 'fas fa-shield-alt',
            categories: [
                {
                    name: '信息收集',
                    subcategories: [
                        {
                            name: '资产发现',
                            tools: [
                                {
                                    name: 'reconftw',
                                    description: '集成了30个工具的信息收集利器',
                                    links: [
                                        {
                                            text: 'GitHub',
                                            url: 'https://github.com/six2dez/reconftw'
                                        }
                                    ]
                                },
                                {
                                    name: 'linglong',
                                    description: '资产扫描监控扫描系统',
                                    links: [
                                        {
                                            text: 'GitHub',
                                            url: 'https://github.com/awake1t/linglong'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: '子域名收集',
                            tools: [
                                {
                                    name: 'InfoSearchAll',
                                    description: '集合了多个网络搜索平台，可以快速在多个网络搜索平台搜索信息并且合并筛选及导出',
                                    links: [
                                        {
                                            text: 'GitHub',
                                            url: 'https://github.com/ExpLangcn/InfoSearchAll'
                                        }
                                    ]
                                },
                                {
                                    name: 'ThunderSearch',
                                    description: '使用EloomEye的第方api-GUI界面',
                                    links: [
                                        {
                                            text: 'GitHub',
                                            url: 'https://github.com/zcgyjx/ThunderSearch'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '漏洞扫描',
                    subcategories: [
                        {
                            name: 'Web扫描器',
                            tools: [
                                {
                                    name: 'Acunetix',
                                    description: '专业的Web应用漏洞扫描工具',
                                    links: [
                                        {
                                            text: '官网',
                                            url: 'https://www.acunetix.com/'
                                        }
                                    ]
                                },
                                {
                                    name: 'Nessus',
                                    description: '全面的网络漏洞扫描工具',
                                    links: [
                                        {
                                            text: '官网',
                                            url: 'https://www.tenable.com/products/nessus'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'learning_resources',
            name: '学习资源',
            icon: 'fas fa-book',
            categories: [
                {
                    name: '在线教程',
                    subcategories: [
                        {
                            name: 'Web安全',
                            tools: [
                                {
                                    name: 'OWASP Top 10',
                                    description: 'Web应用安全风险学习',
                                    links: [
                                        {
                                            text: '官网',
                                            url: 'https://owasp.org/www-project-top-ten/'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '实验平台',
                    subcategories: [
                        {
                            name: '靶场环境',
                            tools: [
                                {
                                    name: 'DVWA',
                                    description: '漏洞练习平台',
                                    links: [
                                        {
                                            text: 'GitHub',
                                            url: 'https://github.com/digininja/DVWA'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'security_frameworks',
            name: '安全框架',
            icon: 'fas fa-cubes',
            categories: [
                {
                    name: '开发框架',
                    subcategories: [
                        {
                            name: 'Web框架',
                            tools: [
                                {
                                    name: 'Spring Security',
                                    description: 'Java安全框架',
                                    links: [
                                        {
                                            text: '官网',
                                            url: 'https://spring.io/projects/spring-security'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}; 