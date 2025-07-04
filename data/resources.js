// 技术导航知识库 - 资源数据配置
// 您可以通过修改这个文件来添加新的技术资源

const TechResources = {
    // 漏洞挖掘分类
    vulnerability: {
        'vuln-web': {
            title: 'Web漏洞挖掘',
            icon: '🔍',
            categories: {
                '基础漏洞类型': [
                    {
                        name: 'OWASP Top 10',
                        url: 'https://owasp.org/www-project-top-ten/',
                        description: 'Web应用安全风险排行榜'
                    },
                    {
                        name: 'PortSwigger Web Security Academy',
                        url: 'https://portswigger.net/web-security',
                        description: '免费Web安全学习平台'
                    },
                    {
                        name: 'OWASP Cheat Sheet Series',
                        url: 'https://cheatsheetseries.owasp.org/',
                        description: '安全开发备忘录'
                    },
                    {
                        name: 'HackerOne Hacktivity',
                        url: 'https://hackerone.com/hacktivity',
                        description: '真实漏洞案例分享'
                    }
                ],
                '测试工具': [
                    {
                        name: 'SQLMap',
                        url: 'https://github.com/sqlmapproject/sqlmap',
                        description: '自动化SQL注入检测工具'
                    },
                    {
                        name: 'Burp Suite',
                        url: 'https://portswigger.net/burp',
                        description: 'Web应用安全测试平台'
                    },
                    {
                        name: 'OWASP ZAP',
                        url: 'https://github.com/zaproxy/zaproxy',
                        description: '开源Web应用安全扫描器'
                    },
                    {
                        name: 'Nikto',
                        url: 'https://github.com/sullo/nikto',
                        description: 'Web服务器漏洞扫描器'
                    }
                ],
                '学习资源': [
                    {
                        name: 'Awesome Web Security',
                        url: 'https://github.com/qazbnm456/awesome-web-security',
                        description: 'Web安全资源大全'
                    },
                    {
                        name: 'PentesterLab',
                        url: 'https://pentesterlab.com/',
                        description: 'Web渗透测试练习平台'
                    },
                    {
                        name: 'Web Security Testing Guide',
                        url: 'https://owasp.org/www-project-web-security-testing-guide/',
                        description: 'OWASP Web安全测试指南'
                    }
                ]
            }
        },
        'vuln-binary': {
            title: '二进制漏洞分析',
            icon: '🔧',
            categories: {
                '逆向工程工具': [
                    {
                        name: 'Radare2',
                        url: 'https://github.com/radareorg/radare2',
                        description: '开源逆向工程框架'
                    },
                    {
                        name: 'Ghidra',
                        url: 'https://ghidra-sre.org/',
                        description: 'NSA开源逆向工程工具'
                    },
                    {
                        name: 'IDA Pro',
                        url: 'https://www.hex-rays.com/products/ida/',
                        description: '专业逆向分析工具'
                    },
                    {
                        name: 'x64dbg',
                        url: 'https://x64dbg.com/',
                        description: 'Windows调试器'
                    }
                ],
                '漏洞利用技术': [
                    {
                        name: 'Pwntools',
                        url: 'https://github.com/Gallopsled/pwntools',
                        description: 'CTF框架和漏洞利用开发库'
                    },
                    {
                        name: 'PEDA',
                        url: 'https://github.com/longld/peda',
                        description: 'Python Exploit Development Assistance'
                    },
                    {
                        name: 'ROPgadget',
                        url: 'https://github.com/JonathanSalwan/ROPgadget',
                        description: 'ROP gadget搜索工具'
                    }
                ],
                '学习资源': [
                    {
                        name: 'Exploit Exercises',
                        url: 'https://exploit-exercises.lains.space/',
                        description: '二进制漏洞利用练习'
                    },
                    {
                        name: 'Modern Binary Exploitation',
                        url: 'https://github.com/RPISEC/MBE',
                        description: '现代二进制漏洞利用课程'
                    }
                ]
            }
        },
        'vuln-mobile': {
            title: '移动应用安全',
            icon: '📱',
            categories: {
                '移动安全工具': [
                    {
                        name: 'MobSF',
                        url: 'https://github.com/MobSF/Mobile-Security-Framework-MobSF',
                        description: '移动安全框架'
                    },
                    {
                        name: 'Frida',
                        url: 'https://frida.re/',
                        description: '动态代码插桩工具'
                    },
                    {
                        name: 'Objection',
                        url: 'https://github.com/sensepost/objection',
                        description: '运行时移动应用安全评估'
                    }
                ]
            }
        }
    },

    // 编程语言分类
    programming: {
        'prog-go': {
            title: 'Go语言',
            icon: '🐹',
            categories: {
                '官方文档': [
                    {
                        name: 'Go官方网站',
                        url: 'https://golang.org/',
                        description: 'Go语言官方网站'
                    },
                    {
                        name: 'Go包文档',
                        url: 'https://pkg.go.dev/',
                        description: 'Go包和模块文档'
                    }
                ],
                '学习资源': [
                    {
                        name: '地鼠文档',
                        url: 'https://www.topgoer.cn/',
                        description: 'Go语言中文学习网站'
                    },
                    {
                        name: 'Go语言中文网',
                        url: 'https://studygolang.com/',
                        description: '国内知名Go社区'
                    }
                ],
                'Web框架': [
                    {
                        name: 'Gin',
                        url: 'https://github.com/gin-gonic/gin',
                        description: '高性能HTTP Web框架'
                    },
                    {
                        name: 'Echo',
                        url: 'https://github.com/labstack/echo',
                        description: '高性能极简框架'
                    }
                ]
            }
        },
        'prog-python': {
            title: 'Python',
            icon: '🐍',
            categories: {
                '官方文档': [
                    {
                        name: 'Python官方文档',
                        url: 'https://docs.python.org/',
                        description: 'Python官方文档'
                    }
                ],
                '学习资源': [
                    {
                        name: 'Real Python',
                        url: 'https://realpython.com/',
                        description: 'Python深度教程'
                    }
                ]
            }
        }
    },

    // 安全工具分类
    security: {
        'sec-scanner': {
            title: '漏洞扫描',
            icon: '🔍',
            categories: {
                '网络扫描': [
                    {
                        name: 'Nmap',
                        url: 'https://nmap.org/',
                        description: '网络扫描和端口探测工具'
                    },
                    {
                        name: 'Masscan',
                        url: 'https://github.com/robertdavidgraham/masscan',
                        description: '高速TCP端口扫描器'
                    }
                ],
                'Web扫描': [
                    {
                        name: 'Nuclei',
                        url: 'https://github.com/projectdiscovery/nuclei',
                        description: '基于模板的漏洞扫描器'
                    },
                    {
                        name: 'Dirb',
                        url: 'https://github.com/v0re/dirb',
                        description: 'Web目录扫描器'
                    }
                ]
            }
        }
    },

    // 运维开发分类
    devops: {
        'devops-docker': {
            title: '容器技术',
            icon: '🐳',
            categories: {
                '容器基础': [
                    {
                        name: 'Docker官方文档',
                        url: 'https://docs.docker.com/',
                        description: 'Docker官方文档'
                    },
                    {
                        name: 'Dockerfile最佳实践',
                        url: 'https://docs.docker.com/develop/dev-best-practices/',
                        description: 'Docker开发最佳实践'
                    }
                ],
                '容器安全': [
                    {
                        name: 'Docker Bench Security',
                        url: 'https://github.com/docker/docker-bench-security',
                        description: 'Docker安全配置检查'
                    }
                ]
            }
        }
    },

    // 学习资源分类
    resources: {
        'res-books': {
            title: '技术书籍',
            icon: '📚',
            categories: {
                '安全类书籍': [
                    {
                        name: 'Web安全深度剖析',
                        url: 'https://book.douban.com/subject/25914556/',
                        description: 'Web安全经典教材'
                    },
                    {
                        name: '黑客攻防技术宝典',
                        url: 'https://book.douban.com/subject/10793814/',
                        description: 'Web应用安全权威指南'
                    }
                ],
                '编程类书籍': [
                    {
                        name: 'Go语言实战',
                        url: 'https://book.douban.com/subject/27015617/',
                        description: 'Go语言实战指南'
                    }
                ]
            }
        },
        'res-blogs': {
            title: '技术博客',
            icon: '✍️',
            categories: {
                '安全博客': [
                    {
                        name: 'PortSwigger博客',
                        url: 'https://portswigger.net/blog',
                        description: 'Web安全研究博客'
                    },
                    {
                        name: 'FreeBuf',
                        url: 'https://www.freebuf.com/',
                        description: '国内知名安全资讯平台'
                    }
                ]
            }
        }
    }
};

// 导出资源数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechResources;
} else if (typeof window !== 'undefined') {
    window.TechResources = TechResources;
}

// 使用说明：
// 1. 要添加新的资源，只需在对应分类下的categories中添加新的数组项
// 2. 每个资源需要包含：name（名称）、url（链接）、description（描述）
// 3. 要添加新的子分类，在对应主分类下添加新的键值对
// 4. 要添加新的主分类，参考现有结构添加新的顶级分类

// 示例：添加新的Web漏洞资源
/*
TechResources.vulnerability['vuln-web'].categories['基础漏洞类型'].push({
    name: '新工具名称',
    url: 'https://example.com',
    description: '工具描述'
});
*/