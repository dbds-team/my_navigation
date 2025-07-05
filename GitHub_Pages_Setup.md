# GitHub Pages 部署指南

## 🚨 解决 "Get Pages site failed" 错误

如果您遇到 `Error: Get Pages site failed` 错误，请按照以下步骤操作：

### 方法一：手动启用 GitHub Pages

1. **进入仓库设置页面**
   - 点击仓库顶部的 `Settings` 选项卡
   - 在左侧菜单中找到 `Pages`

2. **配置 Pages 设置**
   - **Source**: 选择 `GitHub Actions`
   - 保存设置

3. **检查权限**
   - 确保仓库是 Public 或者有 GitHub Pro/Teams 账户
   - 在 `Settings` → `Actions` → `General` 中：
     - 允许所有 Actions：`Allow all actions and reusable workflows`
     - Workflow permissions：选择 `Read and write permissions`
     - 勾选 `Allow GitHub Actions to create and approve pull requests`

### 方法二：使用简化的 GitHub Actions 配置

如果方法一不起作用，请使用以下简化配置：

```yaml
name: Static HTML Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      pages: write
      id-token: write
      
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
      
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: '.'
        
    - name: Deploy
      id: deployment
      uses: actions/deploy-pages@v4
```

### 方法三：传统分支部署方式

如果 GitHub Actions 方式仍有问题，可以使用传统的分支部署：

1. **创建 gh-pages 分支**
```bash
git checkout --orphan gh-pages
git rm -rf .
cp ../main-branch/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

2. **在仓库设置中**
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `gh-pages`
   - Folder: 选择 `/ (root)`

### 方法四：使用第三方 Action

使用更简单的第三方 Action：

```yaml
name: Deploy to Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🔧 常见问题解决

### 问题 1: 权限不足
**错误**: `Error: Resource not accessible by integration`

**解决方案**:
1. 检查仓库的 Actions 权限设置
2. 确保工作流有正确的 permissions 配置

### 问题 2: 仓库类型问题
**错误**: Private 仓库无法使用 GitHub Pages (免费版)

**解决方案**:
1. 将仓库设为 Public
2. 或升级到 GitHub Pro 账户

### 问题 3: 分支不存在
**错误**: `The branch main does not exist`

**解决方案**:
```bash
git branch -M main
git push -u origin main
```

### 问题 4: CNAME 冲突
**错误**: 自定义域名冲突

**解决方案**:
1. 删除 CNAME 文件
2. 重新配置域名设置

## 📋 部署前检查清单

- [ ] 仓库是 Public 或有 Pro 账户
- [ ] GitHub Pages 在仓库设置中已启用
- [ ] Actions 权限已正确配置
- [ ] 主分支名为 `main`
- [ ] 所有文件已提交并推送

## 🚀 快速部署命令

```bash
# 检查当前分支
git branch

# 确保在 main 分支
git checkout main

# 提交所有更改
git add .
git commit -m "Setup GitHub Pages"
git push origin main

# 手动触发 Actions (如果需要)
# 进入 GitHub 仓库 → Actions → 选择工作流 → Run workflow
```

## 📞 获取帮助

如果问题仍然存在：

1. 查看 GitHub Actions 运行日志
2. 检查 GitHub 状态页面：https://www.githubstatus.com/
3. 参考 GitHub Pages 官方文档：https://docs.github.com/en/pages

## ✅ 验证部署成功

部署成功后，您的网站将在以下地址可用：
```
https://your-username.github.io/repository-name
```

通常需要 5-10 分钟才能完全生效。