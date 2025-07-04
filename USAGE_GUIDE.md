# 技术导航知识库使用指南

## 🎯 项目概述

技术导航知识库是一个专为技术人员打造的资源导航系统，特别适合：
- 安全研究人员
- 渗透测试工程师
- 开发工程师
- 运维工程师

## 🚀 主要特性

### 1. 知识库风格设计
- **顶部标签页**：快速切换不同技术领域
- **左侧导航栏**：展示详细的子分类目录
- **右侧内容区**：呈现具体的技术资源
- **最小化滚动**：通过分页布局减少滚动需求

### 2. 核心功能
- ✨ **智能搜索**：Ctrl+K 快速搜索所有资源
- 🌙 **主题切换**：支持明暗两种主题
- 📱 **响应式设计**：完美适配桌面和移动设备
- ➕ **资源管理**：方便添加和管理技术资源
- 💾 **本地存储**：用户添加的资源自动保存

## 📋 使用说明

### 基本导航
1. **主分类切换**：点击顶部标签页（漏洞挖掘、编程语言、安全工具等）
2. **子分类选择**：使用左侧导航栏选择具体技术领域
3. **资源浏览**：在右侧内容区查看详细资源列表

### 快捷键
- `Ctrl/Cmd + K`：打开搜索框
- `ESC`：关闭弹窗
- 鼠标点击空白区域：关闭弹窗

### 搜索功能
- 输入关键词自动搜索
- 支持搜索资源名称和描述
- 显示资源所属分类
- 高亮匹配关键词

### 添加资源
1. 点击任意页面的"+ 添加资源"按钮
2. 填写资源信息：
   - **资源名称**：工具或资源的名称
   - **链接地址**：有效的URL地址
   - **描述**：简要说明资源用途
   - **分类**：选择合适的分类
3. 点击"添加资源"完成

## 🛠️ 扩展和定制

### 方法一：修改数据配置文件（推荐）

编辑 `data/resources.js` 文件：

```javascript
// 添加新的Web漏洞资源
TechResources.vulnerability['vuln-web'].categories['基础漏洞类型'].push({
    name: '新工具名称',
    url: 'https://example.com',
    description: '工具描述'
});

// 添加新的分类
TechResources.vulnerability['vuln-web'].categories['新分类'] = [
    {
        name: '工具1',
        url: 'https://example1.com',
        description: '工具1描述'
    }
];
```

### 方法二：通过界面添加（简单）

1. 打开对应的技术分类页面
2. 点击"+ 添加资源"按钮
3. 填写表单信息
4. 资源会自动保存到浏览器本地存储

### 方法三：直接编辑HTML（高级）

编辑 `index.html` 文件，在对应的 `.resource-list` 中添加：

```html
<li>
    <a href="https://example.com" target="_blank">
        <strong>新工具名称</strong>
    </a>
    <span class="description">工具描述</span>
</li>
```

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
├── USAGE_GUIDE.md          # 使用指南
└── LICENSE                 # 许可证
```

## 🎨 主题定制

### 修改颜色主题

编辑 `css/style.css` 中的CSS变量：

```css
:root {
    --primary-color: #3b82f6;     /* 主要颜色 */
    --secondary-color: #64748b;   /* 次要颜色 */
    --accent-color: #06b6d4;      /* 强调颜色 */
    --background-color: #ffffff;  /* 背景颜色 */
    --surface-color: #f8fafc;     /* 表面颜色 */
    --border-color: #e2e8f0;      /* 边框颜色 */
}
```

### 添加新的主分类

1. **更新HTML导航**：在 `.main-tabs .tabs-container` 中添加新按钮
2. **添加侧边栏**：在 `.sidebar-content` 中添加新的 `.sidebar-section`
3. **创建内容区域**：在 `.content-area` 中添加对应的 `.content-section`
4. **更新JavaScript**：在 `js/script.js` 中添加相应的处理逻辑

## 📱 移动端优化

- 侧边栏在移动端自动隐藏
- 触摸友好的按钮和链接
- 响应式网格布局
- 优化的触摸交互

## 🔧 技术栈

- **前端框架**：原生HTML/CSS/JavaScript
- **设计系统**：CSS变量 + 响应式设计
- **数据存储**：LocalStorage + 配置文件
- **部署方式**：GitHub Pages
- **版本控制**：Git

## 🤝 贡献指南

### 添加新资源
1. Fork 这个项目
2. 修改 `data/resources.js` 文件
3. 测试功能是否正常
4. 提交 Pull Request

### 报告问题
- 在 GitHub Issues 中描述问题
- 包含浏览器版本和操作系统信息
- 提供复现步骤

### 功能建议
- 在 Issues 中提出新功能需求
- 详细描述功能用途和实现思路

## 📊 使用统计

项目会在浏览器本地记录：
- 访问次数
- 添加的资源数量
- 主题偏好设置
- 搜索历史（不上传到服务器）

## 🔒 隐私说明

- 所有用户数据仅存储在本地浏览器中
- 不收集或上传任何个人信息
- 不使用第三方跟踪脚本
- 开源透明，可自行审查代码

## 🆘 常见问题

### Q: 如何备份我添加的资源？
A: 打开浏览器开发者工具，在控制台运行：
```javascript
console.log(localStorage.getItem('userResources'));
```
复制输出的JSON数据保存即可。

### Q: 如何导入之前备份的资源？
A: 在控制台运行：
```javascript
localStorage.setItem('userResources', '您的备份JSON数据');
location.reload();
```

### Q: 页面加载缓慢怎么办？
A: 项目是纯静态页面，通常加载很快。如果遇到问题：
1. 检查网络连接
2. 清除浏览器缓存
3. 尝试使用其他浏览器

### Q: 如何部署到自己的服务器？
A: 1. 下载所有文件
2. 上传到Web服务器
3. 确保服务器支持静态文件访问
4. 访问 index.html 即可

---

💡 **提示**：如果您觉得这个项目有用，请给个Star⭐支持一下！