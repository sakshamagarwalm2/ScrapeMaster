# 🚀 Scrape-Master

A powerful, modern web scraping workflow automation platform built with Next.js 14 and TypeScript. Design, execute, and monitor complex web scraping workflows through an intuitive visual interface.

[![Watch the video](https://github.com/sakshamagarwalm2/ScrapeMaster/blob/main/public/Recording%202025-01-03%20194726.mp4)

## 📚 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

Scrape-Master is an enterprise-grade web scraping automation platform that revolutionizes how developers and businesses handle web data extraction. Through its visual workflow editor, users can design complex scraping pipelines without writing code, while advanced users can extend functionality through custom nodes and scripts.

## ✨ Key Features

### Visual Workflow Editor
- **Node-Based Interface**: Drag-and-drop workflow creation
- **Real-time Validation**: Instant feedback on workflow validity
- **Custom Node Types**:
  - Browser Control Nodes
  - Data Extraction Nodes
  - Transformation Nodes
  - Export Nodes

### Workflow Execution
- **Live Monitoring**: Real-time execution status and progress
- **Error Handling**: Automatic retry mechanisms and error recovery
- **Execution History**: Detailed logs and execution timeline
- **Resource Management**: Automatic browser instance handling

### Data Processing
- **Smart Extraction**: CSS selector and XPath support
- **Data Transformation**: Built-in data cleaning and formatting
- **Export Options**: Multiple output formats (JSON, CSV, etc.)
- **Data Validation**: Schema-based validation using Zod

### Platform Features
- **User Management**: Role-based access control
- **Credit System**: Usage-based billing integration
- **Workflow Templates**: Pre-built workflow templates
- **API Access**: RESTful API for programmatic control

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Components**: 
  - Radix UI for accessible components
  - Tailwind CSS for styling
  - shadcn/ui for pre-built components
- **State Management**: 
  - TanStack Query for server state
  - React Flow for workflow visualization
- **Form Handling**: 
  - React Hook Form
  - Zod for validation

### Backend
- **Runtime**: Node.js with TypeScript
- **Database**: Prisma ORM with SQLite
- **Authentication**: Clerk for user management
- **Web Scraping**: 
  - Puppeteer for browser automation
  - Cheerio for HTML parsing

## 🏗 Architecture

### Component Architecture
```
├── Core Engine
│   ├── Workflow Executor
│   ├── Node Registry
│   └── State Manager
├── User Interface
│   ├── Workflow Editor
│   ├── Execution Monitor
│   └── Dashboard
└── Services
    ├── Authentication
    ├── Database
    └── Task Queue
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git
- SQLite (included)
- A Clerk account for authentication

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/scrape-master.git
cd scrape-master
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL="file:./dev.db"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Start Development Server**
```bash
npm run dev
```

## 📘 Usage Guide

### Creating Your First Workflow

1. **Access the Dashboard**
   - Navigate to `/workflows`
   - Click "Create New Workflow"

2. **Design the Workflow**
   - Add a "Launch Browser" node
   - Connect to a "Page Navigation" node
   - Add extraction nodes as needed

3. **Configure Nodes**
   - Set URL targets
   - Configure extraction rules
   - Define output formats

4. **Test and Execute**
   - Use the "Test" button for dry runs
   - Monitor execution in real-time
   - View results in the execution log

### Advanced Features

- **Custom Node Development**
- **Workflow Templates**
- **API Integration**
- **Batch Processing**

## 🔐 Authentication

### Setup with Clerk

1. Create a Clerk application
2. Configure authentication settings:
   - Enable email/password
   - Configure OAuth providers (optional)
   - Set up webhooks
3. Add credentials to `.env.local`

### User Management
- Role-based access control
- Team collaboration features
- Usage tracking

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode

## 🔧 Troubleshooting

Common issues and solutions:

- **Browser Launch Fails**: Check Puppeteer dependencies
- **Database Connection**: Verify SQLite file permissions
- **Authentication Issues**: Validate Clerk credentials

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ by Sak_HKRM

