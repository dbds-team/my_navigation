# 安全工具导航系统

一个专注于安全技术的知识库导航系统，包含漏洞挖掘、Web安全、逆向分析等多个领域的资源。

## 功能特点

- 🔍 **多层级导航**：支持多层级的知识分类，方便查找和管理
- 🔎 **实时搜索**：快速搜索功能，帮助您迅速定位所需内容
- 🛠️ **个性化配置**：可自定义的导航结构和内容展示
- 🎨 **美观界面**：响应式设计，支持暗黑模式
- ⚙️ **Golang配置编辑器**：基于Go语言的可视化配置编辑工具

## 快速开始

1. 克隆本仓库
```bash
git clone https://github.com/yourusername/security-navigation.git
cd security-navigation
```

2. 使用任意HTTP服务器运行
```bash
# 使用Python简易HTTP服务器
python -m http.server 8080
# 或使用Node.js的http-server
npx http-server
```

3. 在浏览器中访问 `http://localhost:8080`

## 部署到GitHub Pages

1. Fork本仓库到您的GitHub账号

2. 在仓库设置中启用GitHub Pages
   - 进入仓库设置 -> Pages
   - 选择分支（通常是main或master）
   - 保存设置

3. 几分钟后，您的网站将在 `https://yourusername.github.io/security-navigation` 上线

## 自定义配置

### 方法1：使用Golang配置编辑器

1. 进入配置编辑器目录并构建
```bash
cd config-editor
go build
./config-editor
```

2. 访问 `http://localhost:8080`
3. 使用可视化界面编辑配置
4. 保存配置（自动备份原配置文件）

### 方法2：直接编辑配置文件

1. 编辑 `js/config.js` 文件
2. 按照JSON格式添加或修改资源
3. 提交并推送更改

## 配置文件结构

```javascript
{
  "app": {
    "title": "安全知识库导航",
    "description": "专注于安全技术的知识库导航系统",
    "version": "2.0.0"
  },
  "tabs": [
    {
      "id": "security_tools",
      "name": "安全工具",
      "icon": "fas fa-shield-alt",
      "description": "收集和整理各类安全工具"
    },
    // 更多标签页...
  ],
  "content": {
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
              "contentType": "table",
              "data": [
                {
                  "name": "工具名称",
                  "description": "工具描述",
                  "links": [
                    { "text": "GitHub", "url": "https://github.com/example/tool" }
                  ],
                  "tags": ["标签1", "标签2"]
                }
                // 更多工具...
              ]
            }
            // 更多子分类...
          ]
        }
        // 更多分类...
      ]
    }
    // 更多标签页内容...
  }
}
```

## 技术栈

- 纯原生JavaScript（前端无框架依赖）
- Golang（配置编辑器后端）
- CSS3用于样式和动画
- Font Awesome图标库
- JSONEditor用于配置编辑器

## 贡献指南

欢迎提交Pull Request或Issue来改进这个项目！

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件
