# TOMO ACADEMY Website - Setup Guide

## 🎯 Quick Start

This guide will help you set up the TOMO ACADEMY website on your local machine.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** version 16 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Git (for version control)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tomo-academy/TOMO-academy.git
cd TOMO-academy
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Three.js (for 3D graphics)
- Framer Motion (for animations)
- Lucide React (for icons)

### 3. Environment Configuration (Optional)

#### What is the Gemini API Key For?

The Gemini API key is used for:
- **AI Studio Deployment**: Hosting the app on Google's AI Studio platform
- **Future AI Features**: Potential interactive AI-powered Q&A or content generation
- **Development Integration**: Testing AI Studio specific features locally

**Important**: The website works 100% without the API key. All current features (3D visualizations, animations, content) are fully functional without it.

#### Setup (Only if deploying to AI Studio or using AI features):

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your Gemini API key
# Get your key from: https://aistudio.google.com/app/apikey
```

If you're just running the site locally or deploying to Vercel/Netlify, **skip this step entirely**.

### 4. Start Development Server

```bash
npm run dev
```

You should see output similar to:
```
  VITE v6.2.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open in Browser

Navigate to `http://localhost:5173` in your web browser.

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview production build locally |

## 📂 Project Structure Explained

```
TOMO-academy/
│
├── components/              # Reusable React components
│   ├── Diagrams.tsx        # Educational diagrams (Surface Code, Transformer, etc.)
│   └── QuantumScene.tsx    # 3D quantum computer visualizations
│
├── App.tsx                 # Main application with all pages
├── index.tsx               # Application entry point
├── index.html              # HTML template
├── index.css               # Global styles and Tailwind CSS
├── types.ts                # TypeScript type definitions
│
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript compiler options
├── package.json            # Project dependencies and scripts
├── metadata.json           # Site metadata for AI Studio
│
└── .gitignore             # Git ignore rules
```

## 🎨 Customization Guide

### Changing Colors

The site uses a custom color scheme defined in `App.tsx`:
- Primary: Stone shades (stone-50 to stone-900)
- Accent: Nobel Gold (#C5A059)
- Background: #F9F8F4

### Adding New Videos

Edit the `VIDEOS` array in `App.tsx`:

```typescript
const VIDEOS = [
  { 
    id: 13, 
    title: "Your Video Title", 
    views: "100K views", 
    duration: "15:30", 
    thumbnail: "bg-stone-900", 
    category: "Quantum", 
    featured: false 
  },
  // ... existing videos
];
```

### Updating Channel Statistics

Modify the `CHANNEL_STATS` array in `App.tsx`:

```typescript
const CHANNEL_STATS = [
  { label: "Subscribers", value: "250K+", icon: "👥" },
  // ... update values as needed
];
```

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Options

1. **Vercel** (Recommended)
   - Connect your GitHub repository
   - Vercel auto-detects Vite configuration
   - Automatic deployments on git push

2. **Netlify**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   - Requires base configuration in `vite.config.ts`
   - See Vite documentation for details

4. **AI Studio**
   - Already configured with metadata.json
   - Deploy directly from AI Studio interface

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing

Clear npm cache and try again:
```bash
npm cache clean --force
npm install
```

### TypeScript Errors

Ensure you have the latest TypeScript:
```bash
npm install -D typescript@latest
```

### Build Errors

Try removing node_modules and reinstalling:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 💬 Need Help?

- Check existing [GitHub Issues](https://github.com/tomo-academy/TOMO-academy/issues)
- Join our Discord community
- Watch our [YouTube channel](https://www.youtube.com/@TOMOACADEMY)

## 🎓 Learning Path

1. Start with the homepage to understand the structure
2. Explore `App.tsx` to see how pages are organized
3. Check `components/` for reusable UI elements
4. Modify content and see live changes
5. Experiment with adding new sections

---

**Happy Coding! 🚀**

Questions? Reach out to the TOMO ACADEMY community!
