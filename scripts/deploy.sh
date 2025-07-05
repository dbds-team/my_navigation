#!/bin/bash

# Gopher Navigator 部署脚本
# 用于快速设置和部署 Go 语言导航站

set -e

echo "🚀 Gopher Navigator 部署脚本"
echo "================================="

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
    echo "📁 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Gopher Navigator"
fi

# 检查是否有远程仓库
if ! git remote | grep -q origin; then
    echo "📡 请设置 GitHub 远程仓库："
    echo "   git remote add origin https://github.com/yourusername/gopher-navigator.git"
    echo "   然后重新运行此脚本"
    exit 1
fi

# 检查 Python 环境（可选）
if command -v python3 &> /dev/null; then
    echo "🐍 检测到 Python3，你可以运行爬虫来更新资源"
    echo "   cd scraper && pip install -r requirements.txt && python go_resources_scraper.py"
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || true
git push origin main

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问你的网站："
echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com\///g' | sed 's/\.git//g' | sed 's/\//\.github\.io\//g')"
echo ""
echo "📚 如果这是第一次部署，请："
echo "   1. 访问 GitHub 仓库设置页面"
echo "   2. 找到 'Pages' 设置"
echo "   3. 选择 'main' 分支作为源"
echo "   4. 等待几分钟让 GitHub Pages 生效"
echo ""
echo "🎉 享受你的 Go 语言导航站吧！"