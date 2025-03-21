# MCP Tools Development Scaffold

This is a scaffold tool for quickly creating MCP tool projects. It helps you rapidly set up a standard MCP tool project structure, supports TypeScript, and provides configuration options for Git repository and npm publishing.

## Features

- Interactive project creation process
- TypeScript/JavaScript support
- Automatic Git repository configuration
- npm package publishing support
- Integrated MCP SDK
- Standard project structure

## Installation

You can use this scaffold in two ways:

### Method 1: Using npx (Recommended)

```bash
npx mcp-tools-cli
```

### Method 2: Global Installation

```bash
npm install -g mcp-tools-template
mcp-tools-template
```

## Usage Steps

1. After running the scaffold command, you'll need to answer a series of questions to configure your project:

   - Project name: Your MCP tool project name
   - Project description: Brief project description
   - Author name: Project author
   - Email address: Author's email
   - Git repository configuration: Whether to use Git, and if so, provide repository URL
   - npm publishing configuration: Whether you plan to publish to npm
   - TypeScript support: Whether to use TypeScript for development

2. After configuration, the scaffold will automatically:

   - Create project directory structure
   - Initialize package.json
   - Configure TypeScript (if selected)
   - Create basic MCP server code
   - Initialize Git repository (if selected)
   - Install necessary dependencies

## Project Structure

```
├── src/
│   └── mcp-server.[ts|js]  # MCP server entry file
├── package.json
├── tsconfig.json           # TypeScript configuration (if using TS)
├── .gitignore
└── README.md
```

## Development Guide

1. Enter the project directory:
   ```bash
   cd your-project-name
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The MCP server will start at http://localhost:3000

## Dependencies

- @modelcontextprotocol/sdk: Core SDK for MCP protocol
- express: Web server framework
- TypeScript-related dependencies (if selected):
  - typescript
  - @types/express
  - @types/node

## Publishing Guide

### Publishing to npm

1. Ensure you're logged in to npm:
   ```bash
   npm login
   ```

2. Publish the package:
   ```bash
   npm publish
   ```

### Pushing to Git Repository

If you configured a Git repository during project creation:

```bash
git push origin main
```

## Important Notes

- Ensure you have the correct npm and Git permissions before publishing
- Remember to update the version number in package.json before publishing
- It's recommended to thoroughly test before publishing

## Support

If you encounter any issues while using this tool, please submit an Issue or Pull Request at [GitHub Repository](https://github.com/puchunjie/mcp-tools-cli).

## Contact

Author: puchunjie
Email: puchunjie@live.com