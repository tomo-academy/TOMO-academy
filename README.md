<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎓 TOMO ACADEMY - Official Website

Welcome to the official website repository for **TOMO ACADEMY**, an educational YouTube channel dedicated to demystifying cutting-edge scientific research in Quantum Computing, Artificial Intelligence, and Advanced Physics.

## 🌟 About TOMO ACADEMY

TOMO ACADEMY is an emerging educational platform dedicated to making programming, statistics, and data visualization accessible for beginners. With a bilingual approach (Tamil and English), we serve students and self-learners seeking clear, step-by-step introductions to STEM fundamentals.

### Course Series:
- 💻 **C Programming** - From basics to systems programming fundamentals
- 📊 **Statistics & Probability** - Frequency distributions, histograms, polygons, ogives
- 📈 **Data Visualization** - Chart types, dimensions, measures, and best practices
- 🎓 **Beginner-Friendly** - Short, focused videos that build progressively

**Visit the channel:** [youtube.com/@TOMOACADEMY](https://www.youtube.com/@TOMOACADEMY)

View the app in AI Studio: https://ai.studio/apps/drive/1WftGJcu4biWc260rjO6uQ40s95rwdCoU

## 🚀 Run Locally

**Prerequisites:** Node.js 16+ and npm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/tomo-academy/TOMO-academy.git
   cd TOMO-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys**

   **YouTube API (Recommended for live data):**
   - Copy `.env.local.example` to `.env.local`
   - Get your YouTube API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
     - Enable YouTube Data API v3
     - Create credentials (API key)
   - Find your Channel ID from your YouTube channel URL or About page
   - Add to `.env.local`:
     ```
     VITE_YOUTUBE_API_KEY=your_youtube_api_key
     VITE_YOUTUBE_CHANNEL_ID=your_channel_id
     ```
   
   **Gemini API (Optional - for AI Studio deployment):**
   - Get your Gemini API key from [AI Studio](https://aistudio.google.com/app/apikey)
   - Add to `.env.local`:
     ```
     GEMINI_API_KEY=your_gemini_api_key
     ```
   
   **Note:** The website works with fallback data if YouTube API is not configured, but real-time data is much better!

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Three.js** - 3D Visualizations
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling (configured via index.css)

## 📁 Project Structure

```
TOMO-academy/
├── components/           # React components
│   ├── Diagrams.tsx     # Educational diagrams
│   └── QuantumScene.tsx # 3D quantum visualizations
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── index.css            # Global styles & Tailwind
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies & scripts
└── metadata.json        # Site metadata
```

## 🎨 Features

### Current Features
- ✅ **Live YouTube Integration** - Real-time video data and statistics via YouTube Data API v3
- ✅ **Dynamic Channel Stats** - Auto-updating subscriber count, view count, and video count
- ✅ **Smart Video Categorization** - Automatic categorization into Programming, Statistics, and Visualization
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Fallback Data** - Works offline with static data if API is unavailable
- ✅ **Interactive 3D Visualizations** - Engaging visual elements
- ✅ **Topic-based Navigation** - Filter content by category
- ✅ **Bilingual Support** - Content in Tamil and English
- ✅ **Series-based Learning** - Progressive part-by-part tutorials

### Featured Content Series
- **Statistics & Probability** - Frequency distributions, histograms, polygons, ogives
- **C Programming** - Fundamentals, systems programming basics
- **Data Visualization** - Chart types, dimensions, measures
- **Practical Examples** - Real-world datasets and applications

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🎨 Design enhancements

Please open an issue or submit a pull request.

## 📺 Join Our Community

- **YouTube**: [@TOMOACADEMY](https://www.youtube.com/@TOMOACADEMY) - 250K+ subscribers
- **Discord**: Join 15,000+ learners discussing papers
- **Newsletter**: Weekly research summaries

## 📄 License

This project is licensed under the Apache-2.0 License. See individual file headers for details.

## 🙏 Acknowledgments

- Research papers from Nature, Science, and leading conferences
- Google DeepMind and Google Quantum AI teams
- Our amazing community of learners worldwide

---

<div align="center">
Made with ❤️ by TOMO ACADEMY | Demystifying the future, one paper at a time
</div>
