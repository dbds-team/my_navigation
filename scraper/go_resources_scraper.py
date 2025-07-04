#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Go语言资源爬虫
用于从各大网站爬取Go语言相关的学习资源、项目和文档
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin, urlparse
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class GoResourceScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.resources = {
            'official_docs': [],
            'tutorials': [],
            'books': [],
            'tools': [],
            'frameworks': [],
            'libraries': [],
            'blogs': [],
            'communities': [],
            'videos': [],
            'projects': []
        }

    def scrape_github_awesome_go(self):
        """爬取GitHub上的awesome-go项目"""
        try:
            logger.info("正在爬取 awesome-go...")
            url = "https://raw.githubusercontent.com/avelino/awesome-go/master/README.md"
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            content = response.text
            
            # 解析Markdown内容，提取链接
            links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
            
            for title, link in links:
                if 'github.com' in link:
                    self.resources['projects'].append({
                        'name': title,
                        'url': link,
                        'description': '',
                        'category': 'opensource'
                    })
            
            logger.info(f"从 awesome-go 获取了 {len(self.resources['projects'])} 个项目")
            
        except Exception as e:
            logger.error(f"爬取 awesome-go 失败: {e}")

    def scrape_go_dev_resources(self):
        """爬取Go官方和社区资源"""
        official_resources = [
            {
                'name': 'Go官方网站',
                'url': 'https://golang.org/',
                'description': 'Go语言官方网站',
                'category': 'official'
            },
            {
                'name': 'Go文档',
                'url': 'https://golang.org/doc/',
                'description': 'Go语言官方文档',
                'category': 'official'
            },
            {
                'name': 'Go包管理',
                'url': 'https://pkg.go.dev/',
                'description': 'Go包和模块文档',
                'category': 'official'
            },
            {
                'name': 'Go Playground',
                'url': 'https://play.golang.org/',
                'description': '在线Go代码运行环境',
                'category': 'tool'
            },
            {
                'name': 'Go博客',
                'url': 'https://blog.golang.org/',
                'description': 'Go官方技术博客',
                'category': 'blog'
            }
        ]
        
        self.resources['official_docs'].extend(official_resources)
        logger.info(f"添加了 {len(official_resources)} 个官方资源")

    def scrape_chinese_resources(self):
        """添加中文Go语言资源"""
        chinese_resources = [
            {
                'name': '地鼠文档',
                'url': 'https://www.topgoer.cn/',
                'description': 'Go语言中文学习网站',
                'category': 'tutorial'
            },
            {
                'name': 'Go语言中文网',
                'url': 'https://studygolang.com/',
                'description': '国内最大的Go语言社区',
                'category': 'community'
            },
            {
                'name': 'GoCN',
                'url': 'https://gocn.vip/',
                'description': 'Go中国技术社区',
                'category': 'community'
            },
            {
                'name': '李文周的博客',
                'url': 'https://www.liwenzhou.com/posts/Go/golang-menu/',
                'description': '系统性Go语言教程',
                'category': 'tutorial'
            },
            {
                'name': 'Go语言设计与实现',
                'url': 'https://draveness.me/golang/',
                'description': '深度解析Go语言实现原理',
                'category': 'tutorial'
            }
        ]
        
        for resource in chinese_resources:
            if resource['category'] == 'tutorial':
                self.resources['tutorials'].append(resource)
            elif resource['category'] == 'community':
                self.resources['communities'].append(resource)
        
        logger.info(f"添加了 {len(chinese_resources)} 个中文资源")

    def scrape_popular_frameworks(self):
        """爬取流行的Go框架"""
        frameworks = [
            {
                'name': 'Gin',
                'url': 'https://github.com/gin-gonic/gin',
                'description': '高性能HTTP Web框架',
                'category': 'web'
            },
            {
                'name': 'Echo',
                'url': 'https://github.com/labstack/echo',
                'description': '高性能、极简的Go Web框架',
                'category': 'web'
            },
            {
                'name': 'Beego',
                'url': 'https://github.com/beego/beego',
                'description': '用于快速开发的企业级应用框架',
                'category': 'web'
            },
            {
                'name': 'GORM',
                'url': 'https://github.com/go-gorm/gorm',
                'description': '功能丰富的Go ORM库',
                'category': 'database'
            },
            {
                'name': 'go-zero',
                'url': 'https://github.com/zeromicro/go-zero',
                'description': '云原生Go微服务框架',
                'category': 'microservice'
            }
        ]
        
        self.resources['frameworks'].extend(frameworks)
        logger.info(f"添加了 {len(frameworks)} 个框架")

    def scrape_learning_books(self):
        """收集Go学习书籍"""
        books = [
            {
                'name': 'Go程序设计语言',
                'url': 'https://github.com/golang-china/gopl-zh',
                'description': 'Go语言圣经中文版',
                'category': 'book'
            },
            {
                'name': 'Go入门指南',
                'url': 'https://github.com/unknwon/the-way-to-go_ZH_CN',
                'description': '《The Way to Go》中文版',
                'category': 'book'
            },
            {
                'name': 'Go Web编程',
                'url': 'https://github.com/astaxie/build-web-application-with-golang',
                'description': 'Go Web开发教程',
                'category': 'book'
            },
            {
                'name': 'Go语言高级编程',
                'url': 'https://github.com/chai2010/advanced-go-programming-book',
                'description': 'Go语言进阶教程',
                'category': 'book'
            }
        ]
        
        self.resources['books'].extend(books)
        logger.info(f"添加了 {len(books)} 本书籍")

    def scrape_dev_tools(self):
        """收集Go开发工具"""
        tools = [
            {
                'name': 'GoLand',
                'url': 'https://www.jetbrains.com/go/',
                'description': 'JetBrains出品的Go IDE',
                'category': 'ide'
            },
            {
                'name': 'VS Code',
                'url': 'https://code.visualstudio.com/',
                'description': '微软出品的轻量级编辑器',
                'category': 'editor'
            },
            {
                'name': 'golangci-lint',
                'url': 'https://github.com/golangci/golangci-lint',
                'description': 'Go代码检查工具',
                'category': 'linter'
            },
            {
                'name': 'air',
                'url': 'https://github.com/cosmtrek/air',
                'description': 'Go程序热重载工具',
                'category': 'development'
            }
        ]
        
        self.resources['tools'].extend(tools)
        logger.info(f"添加了 {len(tools)} 个工具")

    def validate_urls(self):
        """验证URL的有效性"""
        logger.info("开始验证URL...")
        for category, items in self.resources.items():
            valid_items = []
            for item in items:
                try:
                    response = self.session.head(item['url'], timeout=5)
                    if response.status_code < 400:
                        valid_items.append(item)
                    else:
                        logger.warning(f"无效URL: {item['url']} (状态码: {response.status_code})")
                except Exception as e:
                    logger.warning(f"URL验证失败: {item['url']} - {e}")
                time.sleep(0.5)  # 避免请求过于频繁
            
            self.resources[category] = valid_items
            logger.info(f"{category}: 保留 {len(valid_items)}/{len(items)} 个有效资源")

    def export_to_json(self, filename='go_resources.json'):
        """导出资源到JSON文件"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.resources, f, ensure_ascii=False, indent=2)
            logger.info(f"资源已导出到 {filename}")
        except Exception as e:
            logger.error(f"导出失败: {e}")

    def generate_html_snippet(self):
        """生成HTML代码片段"""
        html_snippets = []
        
        for category, items in self.resources.items():
            if not items:
                continue
                
            category_name = {
                'official_docs': '官方文档',
                'tutorials': '教程学习',
                'books': '学习书籍',
                'tools': '开发工具',
                'frameworks': 'Web框架',
                'libraries': '实用库',
                'blogs': '技术博客',
                'communities': '社区论坛',
                'videos': '视频教程',
                'projects': '开源项目'
            }.get(category, category)
            
            html = f"""
                    <div class="resource-category">
                        <h3 class="category-title">{category_name}</h3>
                        <ul class="resource-list">
"""
            
            for item in items[:10]:  # 限制每个分类最多10个
                description = item.get('description', '')
                if description:
                    description = f" - {description}"
                html += f'                            <li><a href="{item["url"]}" target="_blank">{item["name"]}</a>{description}</li>\n'
            
            html += """                        </ul>
                    </div>"""
            
            html_snippets.append(html)
        
        # 保存HTML片段到文件
        with open('html_snippets.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(html_snippets))
        
        logger.info("HTML代码片段已生成到 html_snippets.txt")

    def run(self):
        """运行爬虫"""
        logger.info("开始爬取Go语言资源...")
        
        # 执行各种爬取任务
        self.scrape_go_dev_resources()
        self.scrape_chinese_resources()
        self.scrape_popular_frameworks()
        self.scrape_learning_books()
        self.scrape_dev_tools()
        
        # 可选：爬取GitHub awesome-go（比较慢）
        # self.scrape_github_awesome_go()
        
        # 验证URL（可选，比较慢）
        # self.validate_urls()
        
        # 导出结果
        self.export_to_json()
        self.generate_html_snippet()
        
        total_resources = sum(len(items) for items in self.resources.values())
        logger.info(f"爬取完成！总共收集了 {total_resources} 个资源")

def main():
    scraper = GoResourceScraper()
    scraper.run()

if __name__ == "__main__":
    main()