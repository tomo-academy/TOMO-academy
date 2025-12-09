# Project Cards Feature

## Overview
A stylish and compact project cards component showcasing three TOMO projects built by AJ STUDIOZ. The component features modern design with smooth animations, hover effects, and responsive layout.

## Implementation Details

### Files Created/Modified

1. **components/ProjectCards.tsx** (New)
   - Main component file containing the project cards grid
   - Displays 3 projects with images, descriptions, and features
   - Responsive design: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

2. **App.tsx** (Modified)
   - Added import for ProjectCards component
   - Integrated ProjectCards section in HomePage after "Our Teaching Philosophy"

3. **index.css** (Modified)
   - Added `.line-clamp-3` utility class for text truncation

### Projects Showcased

#### 1. TOMO Vibecoding Tool
- **Website**: https://dev-aj-tool.vercel.app/
- **Image**: `/dev-aj-tool-vercel-app-1024x768desktop-acda78.png`
- **Category**: AI Development Tool
- **Key Features**:
  - Multi Pages: Dynamic routing, navigation, and SEO-ready websites
  - Auto Deploy: Instant live updates without CI/CD setup
  - Free Hosting: Global CDN for fast performance
  - Open Source Models: Powered by Llama, Mistral, CodeLlama
  - Hugging Face Integration: Access to advanced models and datasets
  - Blazing Fast UX: Edge computing and caching

#### 2. TOMO Bot - AI Assistant
- **Website**: https://workflow-one-gamma.vercel.app/
- **Image**: `/workflow-one-gamma-vercel-app-1024x768desktop-f1ea93.png`
- **Category**: AI Assistant
- **Key Features**:
  - Send Thank You: Quickly generate and send thank-you emails
  - Professional Email: Assist in writing polished professional correspondence
  - Compose Email: Streamline email creation and management

#### 3. TOMO Academy - Internal Management Tool
- **Website**: https://www.meow.tomoacademy.site/
- **Image**: Placeholder (fallback SVG used if image not found)
- **Category**: Staff Portal
- **Key Features**:
  - Team Management: Digital employee profiles with ID cards and QR codes
  - Content Hub: Track YouTube uploads, scheduling, and performance metrics
  - Task Board: Kanban-style project management
  - Analytics: Insights into channel performance and team productivity
  - Secure Access: Role-based permissions with Firebase authentication
  - Automation: Workflows for onboarding, notifications, and reporting

## Design Features

### Visual Design
- **Card Layout**: Clean, modern cards with rounded corners (2xl radius)
- **Color Scheme**: White cards with stone borders, nobel-gold accents
- **Typography**: Serif headings with sans-serif body text
- **Spacing**: Generous padding and margin for breathing room

### Interactions & Animations
- **Hover Effects**:
  - Card lifts up (-translate-y-2) and shadow increases
  - Border changes to nobel-gold
  - Image scales to 110%
  - Title color transitions to nobel-gold
  - Visit button gets enhanced shadow
- **Entry Animations**: 
  - Fade-in-up animation with staggered delays (150ms between cards)
- **Image Fallback**: 
  - SVG placeholder displays if image fails to load

### Responsive Behavior
- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: 2-column grid
- **Desktop (> 1024px)**: 3-column grid
- **Max Width**: Container constrained to 7xl (80rem) for optimal readability

### Category Icons
- AI Development Tool: Code icon
- AI Assistant: Mail icon
- Staff Portal: Users icon

## Technical Details

### Component Structure
```
ProjectCards
├── Section Header
│   ├── Decorative divider
│   ├── Title
│   └── Description
├── Cards Grid
│   └── Project Card (×3)
│       ├── Image Container
│       │   ├── Project screenshot
│       │   ├── Category badge
│       │   └── Gradient overlay
│       ├── Content Container
│       │   ├── Title
│       │   ├── Description
│       │   ├── Features list (first 3)
│       │   └── Visit button
│       └── Decorative corner accent
└── Bottom CTA
    ├── Credit text
    └── Coming soon badge
```

### CSS Classes Used
- Tailwind utility classes for styling
- Custom animations: `animate-fade-in-up`
- Custom utilities: `line-clamp-2`, `line-clamp-3`
- Nobel color palette: `nobel-gold` (#C5A059)

### Accessibility
- Semantic HTML structure
- Alt text for images
- External link indicators
- Proper heading hierarchy
- Keyboard-accessible buttons/links
- Screen reader-friendly text

## Future Enhancements

### Potential Additions
1. **Filtering**: Add category/tag filters
2. **Search**: Enable project search functionality
3. **Sorting**: Sort by date, popularity, or category
4. **Pagination**: For when more projects are added
5. **Detail View**: Modal or dedicated page for each project
6. **Metrics**: Display usage stats or testimonials
7. **Video Demos**: Embed video previews on hover
8. **Tech Stack**: Display technologies used in each project

### Performance Optimizations
1. **Lazy Loading**: Implement intersection observer for images
2. **Image Optimization**: Use WebP format with fallbacks
3. **Code Splitting**: Dynamic imports for the component
4. **Preloading**: Preload critical images on page load

## Development Notes

### Running the Project
```bash
cd "E:\New folder (89)\TOMO-academy"
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### Project Structure
```
TOMO-academy/
├── components/
│   ├── ProjectCards.tsx    (NEW)
│   ├── QuantumScene.tsx
│   └── Diagrams.tsx
├── public/
│   ├── dev-aj-tool-vercel-app-1024x768desktop-acda78.png
│   └── workflow-one-gamma-vercel-app-1024x768desktop-f1ea93.png
├── App.tsx                  (MODIFIED)
└── index.css                (MODIFIED)
```

## Credits

**Developed by**: AJ STUDIOZ  
**Design System**: TOMO Academy Brand Guidelines  
**Color Palette**: Nobel Gold (#C5A059), Stone shades  
**Fonts**: Playfair Display (Serif), Inter (Sans-serif)

---

*Last Updated: December 9, 2025*
