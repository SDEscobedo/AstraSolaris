<div align="center">

# 🌌 AstraSolaris

**An open-source platform for astronomical simulation, built around Astra—a domain-specific scripting language designed for describing space scenarios in plain English.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.12-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

[Website](https://astra-solaris.org) •
[Documentation](https://astra-solaris.org/docs) •
[Playground](https://astra-solaris.org/playground) •
[Explorer](https://astra-solaris.org/explorer)

</div>

---

## ✨ What is AstraSolaris?

AstraSolaris empowers scientists, educators, and space enthusiasts to create
interactive 3D visualizations of astronomical phenomena using **Astra**—a
human-readable scripting language that makes complex orbital mechanics
accessible to everyone.

```astra
# Visualize the inner solar system
Start space
  Sun
  Mercury
  Venus
  Earth
  Mars
End space

Start observer heliocentric
  show all orbits
  at distance 5 AU
End observer

Start output scene
```

**No server required.** Everything runs in your browser—deploy anywhere as
static files.

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🗣️ **Natural Language DSL** | Write space scenarios in plain English with the Astra language |
| 🌍 **Interactive 3D Scenes** | Real-time visualization powered by Three.js |
| 📡 **Scientific Accuracy** | High-precision ephemeris calculations via astronomy-engine |
| 📴 **Offline Ready** | Full offline support with service workers |
| 🚀 **Zero Backend** | 100% client-side—deploy to any static host |
| 📚 **Educational Focus** | Perfect for classrooms, presentations, and self-learning |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20.0.0 or higher
- [pnpm](https://pnpm.io/) 8.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/astra-solaris/astra-solaris.git
cd astra-solaris

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development URLs

| Application | URL |
|-------------|-----|
| 🌐 Website | http://localhost:5176 |
| 🔭 Explorer | http://localhost:5173 |
| ✏️ Playground | http://localhost:5174 |
| 🛰️ Orbital Elements | http://localhost:5175 |
| 📖 Documentation | http://localhost:5177 |

---

## 📦 Project Structure

```
astra-solaris/
├── apps/
│   ├── explorer/          # Solar System Explorer application
│   ├── playground/        # Interactive Astra code editor
│   ├── orbital-elements/  # Orbital mechanics visualizer
│   └── website/           # Project landing page
├── packages/
│   ├── core/              # Astra language runtime (lexer, parser, interpreter)
│   ├── engine/            # Three.js scene management and rendering
│   ├── terminal/          # Interactive terminal component
│   ├── editor/            # Monaco-based Astra editor
│   └── shared/            # Constants, utilities, and types
├── docs/                  # VitePress documentation
├── spec/                  # Astra language specification
├── assets/                # Textures, models, and data files
└── examples/              # Example Astra scripts
```

---

## 🛠️ Available Scripts

```bash
# Development
pnpm dev                  # Start all apps in dev mode
pnpm dev:website          # Start only the website

# Building
pnpm build                # Build all packages and apps
pnpm build:website        # Build only the website

# Testing
pnpm test                 # Run tests in watch mode
pnpm test:run             # Run tests once
pnpm test:coverage        # Generate coverage report

# Code Quality
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix linting issues
pnpm format               # Format code with Prettier
pnpm typecheck            # Run TypeScript type checking

# Documentation
pnpm docs:dev             # Start docs dev server
pnpm docs:build           # Build documentation
```

---

## 🌟 The Astra Language

Astra is designed to be readable by anyone, regardless of programming
experience. Here are some examples:

### Basic Scene

```astra
Start space
  Earth
  Moon
End space

Start observer geocentric
  show Moon orbit
  show labels
End observer

Start output scene
```

### Mission Visualization

```astra
Start space
  Earth
  Mars
End space

Start observer heliocentric
  show Earth orbit
  show Mars orbit
  at distance 3 AU
End observer

Start output scene
```

📖 [Read the full language specification →](spec/versions/1.0/README.md)

---

## 🤝 Contributing

We welcome contributions from everyone! AstraSolaris has multiple contribution
tracks:

### 🔬 Scientists & Educators

Review specifications, propose features, and ensure scientific accuracy.

### 💻 Developers

Build the runtime, improve performance, and create new features.

### 🎨 Content Creators

Create textures, 3D models, and educational materials.

**Getting started:**

1. Read our [Contributing Guide](.github/CONTRIBUTING.md)
2. Check out [open issues](https://github.com/astra-solaris/astra-solaris/issues)
3. Join the discussion in [GitHub Discussions](https://github.com/astra-solaris/astra-solaris/discussions)

---

## 🎯 Roadmap

- [x] Monorepo architecture setup
- [x] Project website
- [ ] Astra language lexer and parser
- [ ] Core interpreter implementation
- [ ] Three.js engine integration
- [ ] Explorer application
- [ ] Playground with live preview
- [ ] Offline support
- [ ] v2.0.0 release

---

## 📄 License

AstraSolaris is open source software licensed under the
[MIT License](LICENSE).

---

<div align="center">

**Built with 💫 by the AstraSolaris community**

[⬆ Back to top](#-astrasolaris)

</div>