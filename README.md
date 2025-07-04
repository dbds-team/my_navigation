# 技术导航知识库 - Tech Navigation Hub

一个专为技术人员打造的综合性资源导航系统，以漏洞挖掘为主，涵盖编程语言、安全工具、运维开发等多个技术领域。

## 🌟 特性

- � **专业安全导向** - 以漏洞挖掘为核心，涵盖Web安全、二进制分析、移动安全等
- � **知识库架构** - 顶部标签页 + 左侧导航栏 + 内容区域，类似专业文档站点
- �🔍 **智能搜索功能** - Ctrl+K快速搜索，支持关键词高亮
- ➕ **便捷资源管理** - 可视化添加新资源，支持本地存储
- 🎨 **现代化设计** - 简洁美观的界面，减少滚动需求
- 📱 **响应式布局** - 完美适配桌面和移动设备
- 🌙 **主题切换** - 支持明暗主题切换
- ⚡ **高性能** - 纯静态网站，快速加载
- 🚀 **易于部署** - 一键部署到GitHub Pages

## 📁 项目结构

```
tech-navigation-hub/
├── index.html              # 主页面文件
├── css/
│   └── style.css           # 样式文件
├── js/
│   └── script.js           # 交互脚本
├── data/
│   └── resources.js        # 资源数据配置
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions部署
├── README.md               # 项目说明
├── USAGE_GUIDE.md          # 详细使用指南
└── LICENSE                 # 许可证
```

## 🚀 快速开始

### 本地预览

1. 克隆项目到本地：
```bash
git clone https://github.com/yourusername/tech-navigation-hub.git
cd tech-navigation-hub
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

#### 方法一：自动部署 (推荐)

1. Fork这个项目到你的GitHub账户

2. 进入项目设置页面：
   - 点击仓库的 "Settings" 选项卡
   - 在左侧菜单中找到 "Pages"

3. 配置GitHub Pages：
   - **Source**: 选择 "GitHub Actions"
   - 保存设置

4. 检查权限设置：
   - 进入 "Settings" → "Actions" → "General"
   - Workflow permissions: 选择 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"

5. 推送代码到main分支，GitHub Actions会自动部署

#### 方法二：如果遇到部署错误

如果看到 "Get Pages site failed" 错误：

1. **使用备用配置**：将 `.github/workflows/deploy-alternative.yml` 重命名为 `deploy.yml`

2. **或者使用传统分支部署**：
   - 在仓库设置中，Source 选择 "Deploy from a branch" 
   - Branch 选择 "main"，Folder 选择 "/ (root)"

3. **详细故障排除**：参考 `GitHub_Pages_Setup.md` 文件

#### 验证部署
网站将在 `https://yourusername.github.io/gopher-navigator` 上线，通常需要5-10分钟生效。

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

本知识库目前收录了：
- 🔐 漏洞挖掘：Web安全、二进制分析、移动安全、云安全等
- 💻 编程语言：Go、Python、JavaScript、Java、C/C++、Rust等
- 🛠️ 安全工具：扫描器、分析工具、取证工具、网络安全工具
- 🚀 运维开发：Docker、Kubernetes、监控、CI/CD等
- 📚 学习资源：技术书籍、在线课程、技术博客、学术论文

支持用户自定义添加和管理资源！

## 🤝 贡献指南

欢迎为这个项目贡献资源和代码！

### 添加新资源

**方式一：通过界面添加（推荐）**
1. 打开对应技术分类页面
2. 点击"+ 添加资源"按钮
3. 填写资源信息并提交

**方式二：修改配置文件**
1. Fork项目
2. 编辑 `data/resources.js` 文件
3. 在相应分类中添加新资源
4. 提交Pull Request

详细说明请参考 [USAGE_GUIDE.md](USAGE_GUIDE.md)

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
