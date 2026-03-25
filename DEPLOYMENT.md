# GitHub 部署指南

本指南将帮助您将此项目部署到 GitHub 仓库并通过 GitHub Actions 自动化构建和部署。

## 前置要求

- GitHub 账户
- Git 已安装
- 对 GitHub 基本操作的了解

## 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 **+** 图标，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**: `english-exam-prep`（或其他名称）
   - **Description**: `2025 同等学力英语全国统考备考测验工具`
   - **Visibility**: 选择 **Public** 或 **Private**
   - **Initialize this repository**: 不勾选（我们会推送现有代码）
4. 点击 **Create repository**

## 第二步：初始化本地 Git 仓库

在项目根目录执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加远程仓库（替换 USERNAME 和 REPO_NAME）
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: English exam prep tool"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

## 第三步：启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 **Settings**
2. 在左侧菜单中找到 **Pages**
3. 在 **Build and deployment** 部分：
   - **Source**: 选择 **GitHub Actions**
4. 保存设置

## 第四步：配置自动化部署（可选）

工作流文件已在 `.github/workflows/deploy.yml` 中配置。如需自定义域名：

1. 编辑 `.github/workflows/deploy.yml`
2. 找到 `cname:` 字段，添加您的域名：
   ```yaml
   cname: exam.example.com
   ```
3. 提交并推送更改

## 第五步：验证部署

1. 推送代码到 main 分支后，访问仓库的 **Actions** 标签
2. 查看工作流执行状态
3. 工作流完成后，访问 GitHub Pages URL：
   - 默认 URL: `https://USERNAME.github.io/REPO_NAME`
   - 自定义域名: `https://exam.example.com`

## 工作流说明

### 构建步骤

工作流会自动执行以下步骤：

1. **检出代码** — 获取最新的代码
2. **安装 Node.js** — 使用 Node.js 20.x
3. **安装 pnpm** — 使用 pnpm 10.4.1
4. **缓存依赖** — 加速后续构建
5. **安装依赖** — `pnpm install --frozen-lockfile`
6. **类型检查** — `pnpm check`
7. **构建项目** — `pnpm build`
8. **部署** — 推送到 GitHub Pages

### 触发条件

- **自动构建**: 推送到 `main` 分支或创建 Pull Request
- **自动部署**: 仅在推送到 `main` 分支时执行

## 常见问题

### Q: 如何查看构建日志？

A: 在仓库的 **Actions** 标签中点击最新的工作流运行，查看详细日志。

### Q: 部署失败怎么办？

A: 检查以下几点：
1. 代码是否有 TypeScript 错误（运行 `pnpm check`）
2. 依赖是否正确安装（检查 `pnpm-lock.yaml`）
3. 构建是否成功（运行 `pnpm build`）

### Q: 如何使用自定义域名？

A: 
1. 在 DNS 提供商处配置 CNAME 记录，指向 `USERNAME.github.io`
2. 在 `.github/workflows/deploy.yml` 中的 `cname` 字段添加您的域名
3. 提交并推送更改

### Q: 如何禁用自动部署？

A: 编辑 `.github/workflows/deploy.yml`，注释掉 `deploy` job 或修改 `if` 条件。

### Q: 部署后网站显示 404？

A: 
1. 确保 GitHub Pages 已启用
2. 检查工作流是否成功完成
3. 清除浏览器缓存
4. 等待 1-2 分钟让 DNS 生效

## 本地测试

在推送到 GitHub 前，建议本地测试：

```bash
# 安装依赖
pnpm install

# 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 后续更新

每次推送到 `main` 分支时，工作流会自动：
1. 构建最新代码
2. 运行测试和类型检查
3. 部署到 GitHub Pages

无需手动干预！

## 获取帮助

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
