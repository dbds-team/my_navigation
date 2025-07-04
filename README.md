# Gopher Navigator - Go语言学习导航站

一个专门为Go语言学习者打造的资源导航网站，收集整理了最全面、最实用的Go语言学习资源。

## 🌟 特性

- 📚 **丰富的资源分类** - 包含官方文档、教程学习、开发工具、社区论坛、开源项目等
- 🔍 **智能搜索功能** - 快速查找所需资源，支持关键词搜索
- 🎨 **现代化设计** - 参考topgoer.cn设计风格，美观易用
- 📱 **响应式布局** - 完美适配各种设备
- 🌙 **主题切换** - 支持明暗主题切换
- ⚡ **性能优化** - 纯静态网站，加载速度快
- 🚀 **GitHub Pages支持** - 一键部署到GitHub Pages

## 📁 项目结构

```
gopher-navigator/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── script.js       # 交互脚本
├── README.md           # 项目说明
└── docs/              # 文档目录
```

## 🚀 快速开始

### 本地预览

1. 克隆项目到本地：
```bash
git clone https://github.com/yourusername/gopher-navigator.git
cd gopher-navigator
```

2. 使用任意HTTP服务器启动项目：
```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx http-server

# 使用Live Server (VS Code插件)
# 右键index.html -> Open with Live Server
```

3. 浏览器访问 `http://localhost:8000`

### GitHub Pages部署

1. Fork这个项目到你的GitHub账户

2. 进入项目设置页面：
   - 点击仓库的 "Settings" 选项卡
   - 在左侧菜单中找到 "Pages"

3. 配置GitHub Pages：
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 "main" 分支
   - Folder: 选择 "/ (root)"
   - 点击 "Save"

4. 等待几分钟，你的网站将在 `https://yourusername.github.io/gopher-navigator` 上线

### 自定义域名（可选）

如果你有自己的域名，可以：

1. 在项目根目录创建 `CNAME` 文件
2. 在文件中写入你的域名，如：`gopher.example.com`
3. 在你的域名DNS设置中添加CNAME记录，指向 `yourusername.github.io`

## 🛠️ 功能说明

### 核心功能

- **分类导航**: 将Go语言资源按类别整理，方便查找
- **搜索功能**: 输入关键词快速定位相关资源
- **主题切换**: 支持明暗两种主题
- **返回顶部**: 长页面快速返回顶部
- **平滑滚动**: 页面内导航平滑滚动效果

### 快捷键

- `Ctrl/Cmd + K`: 快速打开搜索框
- `ESC`: 关闭搜索结果

### 交互特性

- 悬停效果和动画
- 响应式设计
- 无障碍访问支持
- 访问统计（本地存储）

## 📊 资源统计

本站目前收录了：
- 100+ 学习资源
- 20+ 资源分类
- 50+ 开源项目
- 30+ 实用工具

## 🤝 贡献指南

欢迎为这个项目贡献资源和代码！

### 添加新资源

1. Fork项目
2. 编辑 `index.html` 文件
3. 在相应的分类中添加新的资源链接
4. 提交Pull Request

### 报告问题

如果发现链接失效、分类错误或其他问题，请：
1. 提交Issue详细描述问题
2. 或直接提交Pull Request修复

### 建议新功能

欢迎在Issues中提出新功能建议。

## 📝 更新日志

### v1.0.0 (2024-01-15)
- 🎉 首次发布
- ✨ 基础导航功能
- 🔍 搜索功能
- 🎨 响应式设计
- 🌙 主题切换

## 🔗 相关链接

- [Go官方网站](https://golang.org/)
- [地鼠文档](https://www.topgoer.cn/)
- [Go语言中文网](https://studygolang.com/)

## 📄 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Go官方团队](https://golang.org/) - 创造了优秀的Go语言
- [地鼠文档](https://www.topgoer.cn/) - 设计灵感来源
- 所有Go语言社区贡献者

## 📞 联系方式

如果你有任何问题或建议，欢迎通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/yourusername/gopher-navigator/issues)
- Email: your.email@example.com

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！

🚀 Happy Coding with Go!
