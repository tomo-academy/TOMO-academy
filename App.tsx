/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { Menu, X, BookOpen, Youtube, PlayCircle, ExternalLink, MessageSquare, Mail } from 'lucide-react';
import { fetchChannelStats, fetchChannelVideos, formatNumber, getTopicsDistribution, type VideoData, type ChannelStats } from './services/youtube';
// Types
type PageType = 'home' | 'videos' | 'community' | 'privacy' | 'terms';
// --- FALLBACK DATA (used if API fails) ---
const FALLBACK_VIDEOS = [
  { id: '1', title: "Frequency Polygon in Probability and Statistics - Part 2", views: "48 views", duration: "3:13", thumbnail: "bg-stone-900", category: "Statistics", featured: true, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '2', title: "Cumulative Frequency (Ogives) - Part 3", views: "67 views", duration: "7:34", thumbnail: "bg-[#1a1a1a]", category: "Statistics", featured: true, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '3', title: "Why Learn C Programming - Part 3", views: "21 views", duration: "6:10", thumbnail: "bg-stone-800", category: "Programming", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '4', title: "Basics of C Programming - Part 2", views: "21 views", duration: "5:11", thumbnail: "bg-stone-700", category: "Programming", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '5', title: "Frequency Curve in Probability - Part 4", views: "47 views", duration: "5:23", thumbnail: "bg-[#C5A059]", category: "Statistics", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '6', title: "Less Than & More Than Ogives - Part 5", views: "17 views", duration: "4:25", thumbnail: "bg-stone-600", category: "Statistics", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '7', title: "Introduction to Probability and Statistics (Tamil)", views: "26 views", duration: "7:31", thumbnail: "bg-stone-900", category: "Statistics", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '8', title: "Intro to Computer Programming Language - Part 1", views: "12 views", duration: "1:16", thumbnail: "bg-[#1a1a1a]", category: "Programming", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '9', title: "Types of Charts - Part 3", views: "12 views", duration: "6:41", thumbnail: "bg-stone-800", category: "Visualization", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '10', title: "Data and Task Abstraction in Visualization - Part 4", views: "14 views", duration: "3:48", thumbnail: "bg-stone-700", category: "Visualization", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '11', title: "Dimensions and Measures - Part 5", views: "11 views", duration: "6:21", thumbnail: "bg-[#C5A059]", category: "Visualization", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
  { id: '12', title: "Intro to Computer Programming Language - Part 2", views: "10 views", duration: "3:01", thumbnail: "bg-stone-600", category: "Programming", featured: false, publishedAt: '', description: '', thumbnailUrl: '' },
];
const FALLBACK_CHANNEL_STATS = [
  { label: "Content Focus", value: "Beginner", icon: "📚" },
  { label: "Format", value: "Series", icon: "🎓" },
  { label: "Languages", value: "Tamil/EN", icon: "/language-cropped.svg" },
  { label: "Access", value: "Free", icon: "✨" },
];
const FALLBACK_TOPICS = [
  { name: "Statistics & Probability", count: 8, color: "bg-stone-900" },
  { name: "C Programming", count: 5, color: "bg-[#C5A059]" },
  { name: "Data Visualization", count: 4, color: "bg-stone-700" },
  { name: "Computer Science Basics", count: 3, color: "bg-stone-600" },
];
const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[200px] hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-lg text-stone-900 text-center mb-2">{name}</h3>
      <div className="w-8 h-0.5 bg-nobel-gold mb-3 opacity-60"></div>
      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};
// --- PAGES ---
const HomePage = ({
  scrollToSection,
  channelStats,
  displayChannelStats,
  topics
}: {
  scrollToSection: (id: string) => void;
  channelStats: ChannelStats | null;
  displayChannelStats: any[];
  topics: any[];
}) => (
  <>
    {/* Hero Section */}
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
       
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.5)_50%,rgba(249,248,244,0.2)_100%)]" />
        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-stone-200 bg-white/50 backdrop-blur-sm rounded-full shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-stone-600 uppercase">New Breakdown Available</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            TOMO ACADEMY
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-stone-700 font-light leading-relaxed mb-4 italic">
            "Building foundations, one concept at a time."
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-base text-stone-600 mb-2">
              Beginner-friendly tutorials in Programming, Statistics & Data Visualization
            </p>
            <p className="text-sm text-stone-500">
              C Programming • Probability & Statistics • Data Visualization • Bilingual (Tamil/English)
            </p>
          </div>
          <p className="max-w-xl mx-auto text-sm md:text-base text-stone-500 font-medium tracking-wide mb-12 uppercase">
             Step-by-step series for self-paced learning in STEM
          </p>
         
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button onClick={() => scrollToSection('deep-dive')} className="px-8 py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl font-medium tracking-wide flex items-center justify-center gap-2 cursor-pointer">
                <BookOpen size={18} />
                Read the Analysis
             </button>
             <a href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-full hover:bg-stone-50 transition-all shadow-sm hover:shadow-md font-medium tracking-wide flex items-center justify-center gap-2">
                <PlayCircle size={18} />
                Watch Video
             </a>
          </div>
        </div>
    </header>
    <main>
        {/* About Tomo Academy */}
        <section id="about" className="py-20 bg-white border-b border-stone-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="w-12 h-1 bg-nobel-gold mx-auto mb-8"></div>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Making Programming & Statistics Accessible for Everyone</h2>
                    <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-4xl mx-auto">
                        <strong>TOMO ACADEMY</strong> is an emerging educational platform dedicated to foundational concepts in programming, statistics, probability, and data visualization. We make complex topics accessible for beginners through step-by-step explanations in short, focused videos that build progressively. With a bilingual approach (Tamil and English), we serve students and self-learners seeking clear introductions to technical subjects in STEM fields.
                    </p>
                </div>
                {/* Channel Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {displayChannelStats.map((stat, idx) => (
                        <div key={idx} className="text-center p-6 bg-stone-50 rounded-xl border border-stone-200">
                            {typeof stat.icon === 'string' && stat.icon.startsWith('/') ? (
                                <img src={stat.icon} alt={`${stat.label} icon`} className="w-12 h-12 mx-auto mb-2" />
                            ) : (
                                <div className="text-4xl mb-2">{stat.icon}</div>
                            )}
                            <div className="text-3xl font-serif font-bold text-stone-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-stone-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <img src="/c-cropped.svg" alt="C Programming icon" className="w-12 h-12 mx-auto mb-2" />
                        <h3 className="font-serif text-xl mb-2">C Programming Basics</h3>
                        <p className="text-sm text-stone-500">Learn C programming from scratch - the foundation for modern systems programming.</p>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <img src="/statistics-cropped.svg" alt="Statistics icon" className="w-12 h-12 mx-auto mb-2" />
                        <h3 className="font-serif text-xl mb-2">Statistics & Probability</h3>
                        <p className="text-sm text-stone-500">Master frequency distributions, histograms, polygons, and cumulative frequency curves (ogives).</p>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <img src="/data-visualization-cropped.svg" alt="Data Visualization icon" className="w-12 h-12 mx-auto mb-2" />
                        <h3 className="font-serif text-xl mb-2">Data Visualization</h3>
                        <p className="text-sm text-stone-500">Understand chart types, dimensions, measures, and effective data representation techniques.</p>
                    </div>
                </div>
            </div>
        </section>
        {/* Introduction to the Deep Dive */}
        <section id="deep-dive" className="py-24 bg-[#F9F8F4]">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Featured Series</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Statistics & Probability Mastery</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              <p className="text-sm text-stone-500 italic">
                Complete series on frequency distributions, graphical representations, and data analysis techniques
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">U</span>nderstanding data through visual representation is fundamental to statistics. Our comprehensive series covers <strong>frequency distributions</strong>, starting with histograms and progressing to more sophisticated tools like frequency polygons and ogives.
              </p>
              <p>
                Learn practical techniques like adjusting for <strong className="text-stone-900 font-medium">unequal class intervals</strong> by calculating frequency density, smoothing frequency polygons into curves, and constructing cumulative frequency curves (ogives) for determining medians and quartiles. Each video builds on the previous one, making complex statistical concepts accessible through real-world examples like salary distributions and worker wages.
              </p>
            </div>
          </div>
        </section>
        {/* The Science: Frequency Distributions */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> CONCEPT 01
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Frequency Polygons & Curves</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           A <strong>frequency polygon</strong> is created by joining the midpoints of the tops of rectangles in a histogram. This smooths the histogram into a polygon shape, making it easier to visualize trends in data distributions.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            When you have unequal class intervals, you must adjust by calculating <strong>frequency density</strong> - dividing the frequency by the interval size. For example, if you have 40 frequencies in an interval of 10, the density is 4. This standardization allows for accurate curve plotting and comparison.
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>
        {/* The Science: Cumulative Frequency */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern */}
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                           CONCEPT 02: PRACTICAL TECHNIQUE
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Ogives (Cumulative Frequency Curves)</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            <strong>Less-than ogives</strong> start from upper class limits and cumulatively add frequencies, creating a rising curve. <strong>More-than ogives</strong> work from lower limits, subtracting frequencies for a declining pattern.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            These curves enable practical calculations like finding the median using Q1 = N/4 on cumulative tables. For example, in a sample dataset, this might yield a median value around 115. Ogives are essential tools for quartile determination and statistical analysis.
                        </p>
                     </div>
                </div>
            </div>
        </section>
        {/* The Science: C Programming */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Why Learn C Programming?</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        C is the foundation of modern systems programming, offering speed and efficiency that underpins languages like C++, Java, and Python. Our series explains how C serves as the backbone for operating systems, embedded systems, and high-performance applications - making it an essential skill for aspiring programmers.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>
        {/* Impact */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Simulation of the Sycamore Processor environment</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">LEARNING APPROACH</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Hands-On, Step-by-Step Learning</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        TOMO ACADEMY employs a practical, problem-solving pedagogy with each series building progressively from Part 1 through Part 5 (or more). Videos start with "Hi guys, welcome to our channel" and dive into real examples like salary distributions for frequency densities or worker wages for histograms.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        Our modular structure facilitates sequential mastery - you won't move to frequency curves until you understand frequency polygons. With bilingual content (Tamil and English), we enhance accessibility for regional learners while maintaining universal appeal for STEM students worldwide.
                    </p>
                   
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Our modular structure facilitates sequential mastery, making complex statistical concepts and programming fundamentals accessible through practical, real-world examples."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— TOMO ACADEMY Teaching Philosophy</span>
                    </div>
                </div>
             </div>
        </section>
        {/* Course Series */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">OUR COURSE SERIES</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Structured Learning Paths</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Each series builds progressively with multiple parts, ensuring you master fundamentals before advancing to complex concepts.</p>
                </div>
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <img src="/statistics-cropped.svg" alt="Statistics Series icon" className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="font-serif text-2xl mb-3 text-stone-900">Statistics Series</h3>
                        <ul className="text-sm text-stone-600 space-y-2">
                            <li>• Frequency Distributions</li>
                            <li>• Histograms & Polygons</li>
                            <li>• Frequency Curves</li>
                            <li>• Ogives (Less-than & More-than)</li>
                            <li>• Practical Applications</li>
                        </ul>
                    </div>
                   
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <img src="/c-cropped.svg" alt="C Programming icon" className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="font-serif text-2xl mb-3 text-stone-900">C Programming</h3>
                        <ul className="text-sm text-stone-600 space-y-2">
                            <li>• Introduction to Programming</li>
                            <li>• Why Learn C?</li>
                            <li>• C Language Basics</li>
                            <li>• Systems Programming</li>
                            <li>• Practical Examples</li>
                        </ul>
                    </div>
                   
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <img src="/data-visualization-cropped.svg" alt="Data Visualization icon" className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="font-serif text-2xl mb-3 text-stone-900">Data Visualization</h3>
                        <ul className="text-sm text-stone-600 space-y-2">
                            <li>• Chart Types</li>
                            <li>• Data & Task Abstraction</li>
                            <li>• Dimensions & Measures</li>
                            <li>• Effective Representation</li>
                            <li>• Best Practices</li>
                        </ul>
                    </div>
                </div>
               
                <div className="text-center mt-12 flex justify-center">
                    <a href="https://www.youtube.com/@TOMOACADEMY/videos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900 pb-1">
                      <span>View all series on YouTube</span>
                      <ExternalLink size={14} />
                    </a>
                </div>
           </div>
        </section>
        {/* Our Teaching Philosophy */}
        <section className="py-24 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Our Approach</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">How TOMO ACADEMY Works</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        We follow a rigorous three-step process to transform complex research into accessible education
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">1</div>
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">Start Simple</h3>
                        <p className="text-stone-600">
                            We begin with foundational concepts, ensuring you have a solid base before moving to advanced topics. Part 1 always covers the basics.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-nobel-gold rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">2</div>
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">Practice with Examples</h3>
                        <p className="text-stone-600">
                            Real-world examples like salary distributions, worker wages, and practical datasets make abstract concepts tangible and memorable.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">3</div>
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">Build Progressively</h3>
                        <p className="text-stone-600">
                            Each part builds on the previous one - from histograms to polygons to curves to ogives - ensuring mastery at every stage.
                        </p>
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <a href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-medium shadow-lg hover:bg-stone-800 transition-all">
                        <Youtube size={20} />
                        Watch Our Videos
                    </a>
                </div>
            </div>
        </section>
    </main>
  </>
);
const VideosPage = ({ videos, topics, loading }: { videos: VideoData[]; topics: any[]; loading: boolean }) => (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9F8F4]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Video Library</div>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Latest Tutorials</h2>
                <p className="max-w-2xl mx-auto text-lg text-stone-600 mb-8">
                    Watch our step-by-step tutorials covering C Programming, Statistics, Probability, and Data Visualization fundamentals.
                </p>
               
                {/* Topic Tags */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {topics.map((topic, idx) => (
                        <div key={idx} className={`px-4 py-2 ${topic.color} text-white rounded-full text-sm font-medium flex items-center gap-2`}>
                            <span>{topic.name}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{topic.count}</span>
                        </div>
                    ))}
                </div>
            </div>
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
                    <p className="mt-4 text-stone-600">Loading videos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
                            {video.thumbnailUrl ? (
                                <div className="aspect-video w-full relative overflow-hidden bg-stone-100">
                                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                        <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={64} />
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                                        {video.duration}
                                    </div>
                                </div>
                            ) : (
                                <div className={`aspect-video w-full ${video.thumbnail} relative flex items-center justify-center`}>
                                    <PlayCircle className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={64} />
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                                        {video.duration}
                                    </div>
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-nobel-gold bg-stone-900 px-2 py-1 rounded-sm">
                                        {video.category}
                                    </span>
                                    <span className="text-xs text-stone-400">{video.views}</span>
                                </div>
                                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-nobel-gold transition-colors line-clamp-2">{video.title}</h3>
                            </div>
                        </a>
                    ))}
                </div>
            )}
            <div className="mt-20 text-center">
                 <a href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF0000] text-white rounded-full font-medium shadow-md hover:bg-red-700 transition-colors">
                    <Youtube size={20} />
                    Visit Official Channel
                 </a>
            </div>
        </div>
    </div>
);
const CommunityPage = () => (
    <div className="min-h-screen pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
                 <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">Join The Scholars</h2>
                 <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                    Tomo Academy isn't just a channel; it's a community of curious minds. Connect with researchers, students, and enthusiasts.
                 </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div className="bg-[#F9F8F4] p-10 rounded-2xl border border-stone-200 flex flex-col items-start">
                     <div className="p-4 bg-stone-900 text-white rounded-lg mb-6"><MessageSquare size={32} /></div>
                     <h3 className="font-serif text-3xl text-stone-900 mb-4">Discord Community</h3>
                     <p className="text-stone-600 mb-8 leading-relaxed">
                        Join 15,000+ members discussing the latest papers, sharing study resources, and debugging code together.
                     </p>
                     <button className="mt-auto px-6 py-3 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors font-medium">
                        Join Server
                     </button>
                 </div>
                
                 <div className="bg-[#F9F8F4] p-10 rounded-2xl border border-stone-200 flex flex-col items-start">
                     <div className="p-4 bg-nobel-gold text-white rounded-lg mb-6"><Mail size={32} /></div>
                     <h3 className="font-serif text-3xl text-stone-900 mb-4">The Abstract</h3>
                     <p className="text-stone-600 mb-8 leading-relaxed">
                        Our weekly newsletter summarizing the top 3 papers you need to know about, delivered straight to your inbox every Sunday.
                     </p>
                     <div className="w-full flex gap-2">
                         <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:border-nobel-gold" />
                         <button className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium">
                            Subscribe
                         </button>
                     </div>
                 </div>
            </div>
           
             <div className="bg-stone-900 rounded-2xl p-12 text-center text-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="relative z-10">
                    <h3 className="font-serif text-3xl mb-4">Support Independent Education</h3>
                    <p className="text-stone-400 mb-8 max-w-xl mx-auto">
                        Your support helps us create high-quality animations and keep our content free for everyone.
                    </p>
                    <button className="px-8 py-4 bg-nobel-gold text-stone-900 rounded-full font-bold hover:bg-yellow-600 transition-colors">
                        Become a Patron
                    </button>
                 </div>
             </div>
             {/* Educational Resources */}
             <div className="mt-16">
                <h3 className="font-serif text-3xl text-stone-900 mb-8 text-center">Free Educational Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-stone-200">
                        <div className="text-3xl mb-4">📚</div>
                        <h4 className="font-serif text-xl mb-3 text-stone-900">Paper Library</h4>
                        <p className="text-sm text-stone-600 mb-4">Curated collection of groundbreaking research papers with our summaries and notes.</p>
                        <button className="text-stone-900 font-medium text-sm hover:text-nobel-gold transition-colors">Browse Papers →</button>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-200">
                        <div className="text-3xl mb-4">📝</div>
                        <h4 className="font-serif text-xl mb-3 text-stone-900">Study Guides</h4>
                        <p className="text-sm text-stone-600 mb-4">Downloadable study guides and notes for every video we produce.</p>
                        <button className="text-stone-900 font-medium text-sm hover:text-nobel-gold transition-colors">Download Guides →</button>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-200">
                        <div className="text-3xl mb-4">💻</div>
                        <h4 className="font-serif text-xl mb-3 text-stone-900">Code Examples</h4>
                        <p className="text-sm text-stone-600 mb-4">Python notebooks and implementations of algorithms we discuss.</p>
                        <button className="text-stone-900 font-medium text-sm hover:text-nobel-gold transition-colors">View on GitHub →</button>
                    </div>
                </div>
             </div>
        </div>
    </div>
);
const LegalPage = ({ docType }: { docType: 'privacy' | 'terms' }) => (
    <div className="min-h-screen pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
            <h1 className="font-serif text-4xl text-stone-900 mb-8 border-b border-stone-200 pb-6">
                {docType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h1>
            <div className="prose prose-stone prose-lg text-stone-600">
                <p>Last updated: October 24, 2024</p>
               
                {docType === 'privacy' ? (
                    <>
                        <p>At Tomo Academy, accessible from tomo.academy, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Tomo Academy and how we use it.</p>
                        <h3>Log Files</h3>
                        <p>Tomo Academy follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
                        <h3>Cookies and Web Beacons</h3>
                        <p>Like any other website, Tomo Academy uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                    </>
                ) : (
                     <>
                        <h3>1. Terms</h3>
                        <p>By accessing this Website, accessible from tomo.academy, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.</p>
                        <h3>2. Use License</h3>
                        <p>Permission is granted to temporarily download one copy of the materials on Tomo Academy's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul>
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose or for any public display;</li>
                            <li>attempt to reverse engineer any software contained on Tomo Academy's Website;</li>
                        </ul>
                        <h3>3. Disclaimer</h3>
                        <p>All the materials on Tomo Academy's Website are provided "as is". Tomo Academy makes no warranties, may it be expressed or implied, therefore negates all other warranties.</p>
                    </>
                )}
            </div>
        </div>
    </div>
);
// --- MAIN APP COMPONENT ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [videos, setVideos] = useState<VideoData[]>(FALLBACK_VIDEOS);
  const [channelStats, setChannelStats] = useState<ChannelStats | null>(null);
  const [topics, setTopics] = useState(FALLBACK_TOPICS);
  const [loading, setLoading] = useState(true);
  // Fetch YouTube data on mount
  useEffect(() => {
    async function loadYouTubeData() {
      setLoading(true);
      try {
        // Fetch channel stats and videos in parallel
        const [stats, vids] = await Promise.all([
          fetchChannelStats(),
          fetchChannelVideos(12)
        ]);
        if (stats) {
          setChannelStats(stats);
        }
        if (vids && vids.length > 0) {
          setVideos(vids);
          setTopics(getTopicsDistribution(vids));
        }
      } catch (error) {
        console.error('Error loading YouTube data:', error);
        // Fallback data is already set
      } finally {
        setLoading(false);
      }
    }
    loadYouTubeData();
  }, []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Create dynamic channel stats for display
  const displayChannelStats = channelStats ? [
    { label: "Subscribers", value: formatNumber(channelStats.subscriberCount) + '+', icon: "/subscribers-cropped.svg" },
    { label: "Total Views", value: formatNumber(channelStats.viewCount), icon: "/view-cropped.svg" },
    { label: "Videos", value: channelStats.videoCount, icon: "/video-cropped.svg" },
    { label: "Languages", value: "Tamil/EN", icon: "/language-cropped.svg" },
  ] : FALLBACK_CHANNEL_STATS;
  const navigateTo = (page: PageType) => {
      setCurrentPage(page);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToSection = (id: string) => {
      if (currentPage !== 'home') {
          setCurrentPage('home');
          // Allow render cycle to switch to home before scrolling
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          }, 100);
      } else {
          const element = document.getElementById(id);
          if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
      }
      setMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white flex flex-col">
     
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-4 border-b border-stone-200' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src="/logo.png" alt="TOMO ACADEMY" className="w-10 h-10 rounded-lg shadow-sm object-cover" />
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-lg tracking-wide leading-none transition-opacity ${scrolled ? 'text-stone-900' : 'text-stone-900 md:text-stone-800'}`}>
                TOMO ACADEMY
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Learn • Grow • Excel</span>
            </div>
          </div>
         
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <button onClick={() => navigateTo('home')} className={`hover:text-nobel-gold transition-colors uppercase ${currentPage === 'home' ? 'text-stone-900 font-bold' : ''}`}>Home</button>
            <button onClick={() => navigateTo('videos')} className={`hover:text-nobel-gold transition-colors uppercase ${currentPage === 'videos' ? 'text-stone-900 font-bold' : ''}`}>Videos</button>
            <button onClick={() => navigateTo('community')} className={`hover:text-nobel-gold transition-colors uppercase ${currentPage === 'community' ? 'text-stone-900 font-bold' : ''}`}>Community</button>
           
            <a
              href="https://www.youtube.com/@TOMOACADEMY"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#FF0000] text-white rounded-full hover:bg-red-700 transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Youtube size={16} fill="currentColor" />
              Subscribe
            </a>
          </div>
          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <button onClick={() => navigateTo('home')} className="hover:text-nobel-gold transition-colors uppercase">Home</button>
            <button onClick={() => navigateTo('videos')} className="hover:text-nobel-gold transition-colors uppercase">Videos</button>
            <button onClick={() => navigateTo('community')} className="hover:text-nobel-gold transition-colors uppercase">Community</button>
            <a href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="hover:text-nobel-gold transition-colors uppercase">YouTube Channel</a>
        </div>
      )}
      {/* Page Content */}
      <div className="flex-grow">
          {currentPage === 'home' && <HomePage scrollToSection={scrollToSection} channelStats={channelStats} displayChannelStats={displayChannelStats} topics={topics} />}
          {currentPage === 'videos' && <VideosPage videos={videos} topics={topics} loading={loading} />}
          {currentPage === 'community' && <CommunityPage />}
          {(currentPage === 'privacy' || currentPage === 'terms') && <LegalPage docType={currentPage} />}
      </div>
      <footer className="bg-stone-900 text-stone-400 py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-6">
                         <img src="/logo.png" alt="TOMO ACADEMY" className="w-10 h-10 rounded-lg shadow-sm object-cover" />
                         <span className="text-white font-serif font-bold text-2xl">TOMO ACADEMY</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        Tomo Academy is a digital education platform committed to democratizing access to cutting-edge scientific knowledge. We visualize the invisible.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 rounded-full hover:bg-[#FF0000] hover:text-white transition-colors">
                            <Youtube size={20} />
                        </a>
                        <button onClick={() => navigateTo('community')} className="p-2 bg-stone-800 rounded-full hover:bg-[#5865F2] hover:text-white transition-colors">
                            <MessageSquare size={20} />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-12 text-sm">
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => navigateTo('home')} className="hover:text-nobel-gold transition-colors text-left">Home</button></li>
                            <li><button onClick={() => navigateTo('videos')} className="hover:text-nobel-gold transition-colors text-left">Videos</button></li>
                            <li><button onClick={() => navigateTo('community')} className="hover:text-nobel-gold transition-colors text-left">Community</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => navigateTo('privacy')} className="hover:text-nobel-gold transition-colors text-left">Privacy Policy</button></li>
                            <li><button onClick={() => navigateTo('terms')} className="hover:text-nobel-gold transition-colors text-left">Terms of Service</button></li>
                        </ul>
                    </div>
                </div>
            </div>
           
            <div className="border-t border-stone-800 mt-16 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
                    <div>© 2025 TOMO ACADEMY. All rights reserved.</div>
                    <div className="flex items-center gap-2">
                        <span>Designed with</span>
                        <span className="text-red-500 animate-pulse">❤</span>
                        <span>by</span>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-nobel-gold transition-colors font-semibold">
                            <img src="/AJ.svg" alt="AJ STUDIOZ" className="h-4 w-auto" />
                            <span>AJ STUDIOZ</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
