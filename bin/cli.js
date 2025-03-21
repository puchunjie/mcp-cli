#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 定义问题列表
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称:',
    validate: input => input.trim().length > 0 || '项目名称不能为空'
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述:'
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入作者名称:'
  },
  {
    type: 'input',
    name: 'email',
    message: '请输入邮箱:',
    validate: input => /\S+@\S+\.\S+/.test(input) || '请输入有效的邮箱地址'
  },
  {
    type: 'confirm',
    name: 'useGit',
    message: '是否使用Git仓库?',
    default: true
  },
  {
    type: 'input',
    name: 'gitRepo',
    message: '请输入Git仓库地址:',
    when: answers => answers.useGit
  },
  {
    type: 'confirm',
    name: 'useNpm',
    message: '是否发布到npm?',
    default: true
  },
  {
    type: 'confirm',
    name: 'useTypescript',
    message: '是否使用TypeScript?',
    default: false
  }
];

// 主函数
async function init() {
  console.log(chalk.blue('欢迎使用MCP工具脚手架!'));
  
  try {
    // 收集用户输入
    const answers = await inquirer.prompt(questions);
    
    // 创建项目目录
    const projectDir = path.join(process.cwd(), answers.projectName);
    if (fs.existsSync(projectDir)) {
      console.error(chalk.red('错误: 项目目录已存在'));
      process.exit(1);
    }
    fs.mkdirSync(projectDir);

    // 创建项目基础结构
    fs.mkdirSync(path.join(projectDir, 'src'));

    // 生成package.json
    const packageJson = {
      name: answers.projectName,
      version: '1.0.0',
      description: answers.description,
      main: answers.useTypescript ? 'dist/mcp-server.js' : 'src/mcp-server.js',

      scripts: {
        start: answers.useTypescript ? 'tsc && node dist/mcp-server.js' : 'node src/mcp-server.js',
        build: answers.useTypescript ? 'tsc' : 'echo "No build step needed"',
        prepublishOnly: answers.useTypescript ? 'npm run build' : 'echo "No build step needed"'
      },
      keywords: ['mcp', 'tools'],
      author: answers.author,
      license: 'ISC',
      dependencies: {
        '@modelcontextprotocol/sdk': '^1.4.1'
      },
      devDependencies: answers.useTypescript ? {
        '@types/node': '^20.11.24',
        'typescript': '^5.3.3'
      } : {}
    };

    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // 如果使用TypeScript，创建tsconfig.json
    if (answers.useTypescript) {
      const tsConfig = {
        compilerOptions: {
          target: 'es2018',
          module: 'commonjs',
          outDir: './dist',
          rootDir: './src',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true
        },
        include: ['src/**/*'],
        exclude: ['node_modules']
      };
      fs.writeFileSync(
        path.join(projectDir, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
      );
    }

    // 创建基础MCP服务器文件
    const serverFileContent = answers.useTypescript
      ? `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create the MCP server
const server = new McpServer({
  name: "${answers.projectName}",
  version: "1.0.0",
});

// 在这里添加你的MCP服务逻辑
// server.tool("create_document", {}, (params) => {
//   // 写你的工具实现
// });

// Use standard input/output as transport layer
const transport = new StdioServerTransport();
server.connect(transport).catch(error => {
  console.error("Failed to connect transport:", error);
  process.exit(1);
});

console.log("${answers.projectName} MCP 服务器已启动");
`
      : `const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");

// Create the MCP server
const server = new McpServer({
  name: "${answers.projectName}",
  version: "1.0.0",
});

// 在这里添加你的MCP服务逻辑
// server.tool("create_document", {}, (params) => {
//   // 写你的工具实现
// });

// Use standard input/output as transport layer
const transport = new StdioServerTransport();
server.connect(transport).catch(error => {
  console.error("Failed to connect transport:", error);
  process.exit(1);
});

console.log("${answers.projectName} MCP 服务器已启动");
`;

    fs.writeFileSync(
      path.join(projectDir, 'src', `mcp-server.${answers.useTypescript ? 'ts' : 'js'}`),
      serverFileContent
    );

    // 创建README.md
    const readmeContent = `# ${answers.projectName}\n\n${answers.description}\n\n## 安装\n\n\`\`\`bash\nnpm install\n\`\`\`\n\n## 使用\n\n\`\`\`bash\nnpm start\n\`\`\`\n`;
    fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);

    // 创建.gitignore
    const gitignoreContent = `node_modules/\ndist/\n.DS_Store\n`;
    fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent);

    // 初始化Git仓库
    if (answers.useGit) {
      process.chdir(projectDir);
      execSync('git init');
      execSync('git add .');
      execSync('git commit -m "Initial commit"');
      if (answers.gitRepo) {
        execSync(`git remote add origin ${answers.gitRepo}`);
        console.log(chalk.blue('\nGit仓库已初始化并配置远程仓库'));
      }
    }

    // 安装依赖
    console.log(chalk.blue('\n📦 正在安装依赖...'));
    process.chdir(projectDir);
    execSync('npm install', { stdio: 'inherit' });

    console.log(chalk.green('\n✅ 项目创建成功!'));
    console.log(chalk.blue(`\n📁 项目位置: ${projectDir}`));
    console.log(chalk.blue('👉 开始使用:'));
    console.log(`  cd ${answers.projectName}`);
    console.log('  npm start');
  } catch (error) {
    console.error(chalk.red('错误:'), error);
    process.exit(1);
  }
}

// 执行主函数
init();