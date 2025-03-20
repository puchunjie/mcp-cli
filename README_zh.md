# MCP工具开发脚手架

这是一个用于快速创建MCP工具项目的脚手架工具。它能帮助你快速搭建一个标准的MCP工具项目结构，支持TypeScript，并提供Git仓库和npm发布的配置选项。

## 功能特点

- 交互式项目创建过程
- 支持TypeScript/JavaScript
- 自动配置Git仓库
- 支持npm包发布
- 集成MCP SDK
- 标准的项目结构

## 安装

你可以通过以下两种方式使用该脚手架：

### 方式1：使用npx（推荐）

```bash
npx mcp-tools-template
```

### 方式2：全局安装

```bash
npm install -g mcp-tools-template
mcp-tools-template
```

## 使用步骤

1. 运行脚手架命令后，你需要回答一系列问题来配置你的项目：

   - 项目名称：你的MCP工具项目名称
   - 项目描述：简短的项目描述
   - 作者名称：项目作者
   - 邮箱地址：作者邮箱
   - Git仓库配置：是否使用Git，如果使用则需要提供仓库地址
   - npm发布配置：是否计划发布到npm
   - TypeScript支持：是否使用TypeScript开发

2. 配置完成后，脚手架会自动：

   - 创建项目目录结构
   - 初始化package.json
   - 配置TypeScript（如果选择使用）
   - 创建基础的MCP服务器代码
   - 初始化Git仓库（如果选择使用）
   - 安装必要的依赖

## 项目结构

```
├── src/
│   └── mcp-server.[ts|js]  # MCP服务器入口文件
├── bin/
├── package.json
├── tsconfig.json           # TypeScript配置（如果使用TS）
├── .gitignore
└── README.md
```

## 开发指南

1. 进入项目目录：
   ```bash
   cd 你的项目名称
   ```

2. 启动开发服务器：
   ```bash
   npm start
   ```

3. MCP服务器将在 http://localhost:3000 启动

## 依赖说明

- @modelcontextprotocol/sdk: MCP协议的核心SDK
- express: Web服务器框架
- TypeScript相关依赖（如果选择使用）：
  - typescript
  - @types/express
  - @types/node

## 发布说明

### 发布到npm

1. 确保你已经登录到npm：
   ```bash
   npm login
   ```

2. 发布包：
   ```bash
   npm publish
   ```

### 推送到Git仓库

如果你在创建项目时配置了Git仓库：

```bash
git push origin main
```

## 注意事项

- 确保你有正确的npm和Git权限再进行发布操作
- 发布前请确保更新package.json中的版本号
- 建议在发布前进行充分测试

## 支持

如果你在使用过程中遇到任何问题，请在[GitHub仓库](https://github.com/puchunjie/mcp-tools-cli)提交Issue或Pull Request。

## 联系方式

作者：puchunjie
邮箱：puchunjie@live.com