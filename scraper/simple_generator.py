#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简化的Go语言资源生成器
不需要外部依赖，直接生成常用的Go语言学习资源
"""

import json

def generate_go_resources():
    """生成Go语言学习资源"""
    resources = {
        "official_docs": [
            {
                "name": "Go官方网站",
                "url": "https://golang.org/",
                "description": "Go语言官方网站"
            },
            {
                "name": "Go中文官网", 
                "url": "https://go-zh.org/",
                "description": "Go语言中文官方站点"
            },
            {
                "name": "Go文档",
                "url": "https://golang.org/doc/",
                "description": "Go语言官方文档"
            },
            {
                "name": "Go包文档",
                "url": "https://pkg.go.dev/",
                "description": "Go包和模块文档"
            },
            {
                "name": "Go语言规范",
                "url": "https://golang.org/ref/spec",
                "description": "Go语言规范文档"
            }
        ],
        "tutorials": [
            {
                "name": "地鼠文档",
                "url": "https://www.topgoer.cn/",
                "description": "Go语言中文学习网站"
            },
            {
                "name": "Go语言中文网",
                "url": "https://studygolang.com/",
                "description": "国内知名Go社区"
            },
            {
                "name": "李文周的博客",
                "url": "https://www.liwenzhou.com/posts/Go/golang-menu/",
                "description": "系统性Go教程"
            },
            {
                "name": "Go入门指南",
                "url": "https://github.com/unknwon/the-way-to-go_ZH_CN",
                "description": "经典入门书籍"
            },
            {
                "name": "Go Web编程",
                "url": "https://github.com/astaxie/build-web-application-with-golang",
                "description": "Web开发教程"
            }
        ],
        "advanced": [
            {
                "name": "Go语言设计与实现",
                "url": "https://draveness.me/golang/",
                "description": "深度剖析Go语言"
            },
            {
                "name": "Go语言原本",
                "url": "https://golang.design/under-the-hood/",
                "description": "Go语言源码解析"
            },
            {
                "name": "极客兔兔",
                "url": "https://geektutu.com/",
                "description": "7天系列教程"
            },
            {
                "name": "Go语言高级编程",
                "url": "https://github.com/chai2010/advanced-go-programming-book",
                "description": "Go语言进阶指南"
            },
            {
                "name": "煎鱼的Go专栏",
                "url": "https://golang3.eddycjy.com/",
                "description": "实战经验分享"
            }
        ],
        "frameworks": [
            {
                "name": "Gin",
                "url": "https://github.com/gin-gonic/gin",
                "description": "高性能HTTP Web框架"
            },
            {
                "name": "Beego",
                "url": "https://github.com/beego/beego",
                "description": "企业级Web框架"
            },
            {
                "name": "Echo",
                "url": "https://github.com/labstack/echo",
                "description": "高性能极简框架"
            },
            {
                "name": "Gorilla Mux",
                "url": "https://github.com/gorilla/mux",
                "description": "强大的路由器"
            },
            {
                "name": "Chi",
                "url": "https://github.com/go-chi/chi",
                "description": "轻量级路由器"
            }
        ],
        "databases": [
            {
                "name": "GORM",
                "url": "https://github.com/go-gorm/gorm",
                "description": "功能丰富的ORM库"
            },
            {
                "name": "XORM",
                "url": "https://github.com/go-xorm/xorm",
                "description": "简单强大的ORM"
            },
            {
                "name": "SQLx",
                "url": "https://github.com/jmoiron/sqlx",
                "description": "扩展database/sql"
            },
            {
                "name": "Upper.io",
                "url": "https://github.com/upper/db",
                "description": "数据访问层"
            },
            {
                "name": "SQLBoiler",
                "url": "https://github.com/volatiletech/sqlboiler",
                "description": "代码生成ORM"
            }
        ],
        "microservices": [
            {
                "name": "Kratos",
                "url": "https://github.com/go-kratos/kratos",
                "description": "B站开源微服务框架"
            },
            {
                "name": "go-zero",
                "url": "https://github.com/zeromicro/go-zero",
                "description": "云原生微服务框架"
            },
            {
                "name": "Go Kit",
                "url": "https://github.com/go-kit/kit",
                "description": "微服务工具包"
            },
            {
                "name": "Micro",
                "url": "https://github.com/micro/micro",
                "description": "微服务开发框架"
            },
            {
                "name": "Go Chassis",
                "url": "https://github.com/go-chassis/go-chassis",
                "description": "华为微服务框架"
            }
        ],
        "tools": [
            {
                "name": "GoLand",
                "url": "https://www.jetbrains.com/go/",
                "description": "JetBrains专业IDE"
            },
            {
                "name": "VS Code",
                "url": "https://code.visualstudio.com/",
                "description": "微软开发的编辑器"
            },
            {
                "name": "LiteIDE",
                "url": "http://liteide.org/",
                "description": "轻量级Go IDE"
            },
            {
                "name": "Go Playground",
                "url": "https://play.golang.org/",
                "description": "在线运行Go代码"
            },
            {
                "name": "JSON-to-Go",
                "url": "https://mholt.github.io/json-to-go/",
                "description": "JSON转Go结构体"
            }
        ],
        "communities": [
            {
                "name": "Go语言中文网",
                "url": "https://studygolang.com/",
                "description": "最大的中文Go社区"
            },
            {
                "name": "GoCN",
                "url": "https://gocn.vip/",
                "description": "Go中国技术社区"
            },
            {
                "name": "Golang中国",
                "url": "https://www.golangtc.com/",
                "description": "Go语言社区"
            },
            {
                "name": "Reddit r/golang",
                "url": "https://www.reddit.com/r/golang/",
                "description": "Go语言讨论区"
            },
            {
                "name": "Stack Overflow",
                "url": "https://stackoverflow.com/questions/tagged/go",
                "description": "技术问答"
            }
        ],
        "interview": [
            {
                "name": "Go面试题集",
                "url": "https://www.topgoer.cn/docs/gomianshiti/gomianshiti-1cpgf5f10q2q0",
                "description": "地鼠文档面试题"
            },
            {
                "name": "Go Questions",
                "url": "https://github.com/qcrao/Go-Questions",
                "description": "Go语言知识图谱"
            },
            {
                "name": "Interview Go",
                "url": "https://github.com/lifei6671/interview-go",
                "description": "Go面试题集合"
            },
            {
                "name": "Go程序员面试笔试宝典",
                "url": "https://golang.design/go-questions/",
                "description": "面试宝典"
            }
        ]
    }
    
    return resources

def generate_html_sections(resources):
    """生成HTML代码段"""
    category_names = {
        "official_docs": "官方文档",
        "tutorials": "入门教程", 
        "advanced": "进阶学习",
        "frameworks": "Web框架",
        "databases": "数据库ORM",
        "microservices": "微服务框架",
        "tools": "开发工具",
        "communities": "社区论坛",
        "interview": "面试准备"
    }
    
    html_sections = []
    
    for category, items in resources.items():
        if not items:
            continue
            
        category_title = category_names.get(category, category)
        
        html = f"""                    <div class="resource-category">
                        <h3 class="category-title">{category_title}</h3>
                        <ul class="resource-list">"""
        
        for item in items:
            description = item.get('description', '')
            if description:
                description = f" - {description}"
            html += f"""
                            <li><a href="{item['url']}" target="_blank">{item['name']}</a>{description}</li>"""
        
        html += """
                        </ul>
                    </div>"""
        
        html_sections.append(html)
    
    return html_sections

def main():
    print("🚀 生成Go语言学习资源...")
    
    # 生成资源
    resources = generate_go_resources()
    
    # 导出JSON
    with open('go_resources.json', 'w', encoding='utf-8') as f:
        json.dump(resources, f, ensure_ascii=False, indent=2)
    
    # 生成HTML片段
    html_sections = generate_html_sections(resources)
    with open('html_sections.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(html_sections))
    
    # 统计信息
    total_resources = sum(len(items) for items in resources.values())
    
    print(f"✅ 生成完成！")
    print(f"📊 统计信息：")
    print(f"   - 总资源数: {total_resources}")
    print(f"   - 分类数: {len(resources)}")
    print(f"   - JSON文件: go_resources.json")
    print(f"   - HTML片段: html_sections.txt")
    
    print(f"\n📂 分类详情：")
    for category, items in resources.items():
        print(f"   - {category}: {len(items)}个资源")

if __name__ == "__main__":
    main()