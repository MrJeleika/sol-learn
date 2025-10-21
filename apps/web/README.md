# SOL Learn - Visual Solana Development Platform

**SOL Learn** is an interactive educational platform that makes Solana blockchain development accessible through visual programming. Using an intuitive node-based interface, learners can drag-and-drop components to build and understand Solana transactions, programs, and cryptographic operations. Whether you're new to Web3 or looking to deepen your Solana knowledge, SOL Learn transforms abstract blockchain concepts into tangible, interactive learning experiences.

### Key Features

- **Visual Node-Based Editor** - Drag-and-drop interface for building Solana workflows
- **Comprehensive Node Library** - Input, Transactions, Network, Programs, and Crypto nodes
- **Real-time Validation** - Type-safe connection validation between nodes
- **Multi-Select & Batch Operations** - Select and manage multiple nodes simultaneously

## Requirements for Installation

Before installing SOL Learn, ensure you have the following installed on your system:

- **Node.js** - v18.0.0 or higher
- **npm** - v9.0.0 or higher (or yarn/pnpm as alternatives)
- **Git** - For cloning the repository
- **Basic understanding of** - React, TypeScript, and Web3 concepts (recommended)

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/MrJeleika/sol-learn
cd solana-build
```

### 2. Navigate to the Web App

```bash
cd apps/web
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port).

### 5. Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
apps/web/
├── src/
│   ├── components/     # React components (nodes, UI, header)
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── constants/      # Configuration constants
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## Getting Started

1. Create your first workflow by dragging nodes from the menu onto the canvas
2. Connect nodes to build your Solana transaction flow
3. Use area select (click and drag) to select multiple nodes
4. Delete selected nodes with the Delete key
5. Explore different node types to understand blockchain concepts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.
