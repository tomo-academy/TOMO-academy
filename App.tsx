
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { Menu, X, BookOpen, Youtube, PlayCircle, ExternalLink, MessageSquare, Mail } from 'lucide-react';

// Types
type PageType = 'home' | 'videos' | 'community' | 'privacy' | 'terms';

// --- MOCK DATA ---
const VIDEOS = [
  { id: 1, title: "AlphaQubit: The Noise Barrier", views: "125K views", duration: "14:20", thumbnail: "bg-stone-900", category: "Quantum", featured: true },
  { id: 2, title: "Visualizing the Transformer Architecture", views: "890K views", duration: "22:15", thumbnail: "bg-[#1a1a1a]", category: "AI", featured: true },
  { id: 3, title: "Generative AI: From Theory to Practice", views: "450K views", duration: "18:45", thumbnail: "bg-stone-800", category: "AI", featured: false },
  { id: 4, title: "Surface Codes Explained", views: "65K views", duration: "12:10", thumbnail: "bg-stone-700", category: "Quantum", featured: false },
  { id: 5, title: "The Hardware of Google Sycamore", views: "210K views", duration: "16:30", thumbnail: "bg-[#C5A059]", category: "Hardware", featured: false },
  { id: 6, title: "Neural Decoding vs MWPM", views: "45K views", duration: "10:05", thumbnail: "bg-stone-600", category: "Research", featured: false },
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

const HomePage = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => (
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
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-stone-700 font-light leading-relaxed mb-8 italic">
            "Demystifying the future, one paper at a time."
          </p>
          <p className="max-w-xl mx-auto text-sm md:text-base text-stone-500 font-medium tracking-wide mb-12 uppercase">
             Featuring: Google's AlphaQubit & The Future of Error Correction
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
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="w-12 h-1 bg-nobel-gold mx-auto mb-8"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Bridging the Gap Between Science & Society</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">
                    <strong>Tomo Academy</strong> is an educational initiative dedicated to breaking down the most complex scientific breakthroughs into understandable narratives. From Quantum Computing to Generative AI, we dive deep into the technical papers that are shaping our future, making expert-level knowledge accessible to everyone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <div className="text-3xl mb-2">🎓</div>
                        <h3 className="font-serif text-xl mb-2">Deep Dives</h3>
                        <p className="text-sm text-stone-500">Comprehensive breakdowns of Nature & Science papers.</p>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <div className="text-3xl mb-2">🔭</div>
                        <h3 className="font-serif text-xl mb-2">Visual Learning</h3>
                        <p className="text-sm text-stone-500">Interactive diagrams and 3D visualizations.</p>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-lg">
                        <div className="text-3xl mb-2">🤖</div>
                        <h3 className="font-serif text-xl mb-2">Future Tech</h3>
                        <p className="text-sm text-stone-500">Focusing on AI, Quantum, and Space exploration.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Introduction to the Deep Dive */}
        <section id="deep-dive" className="py-24 bg-[#F9F8F4]">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Featured Breakdown</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">AlphaQubit: The Noise Barrier</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              <p className="text-sm text-stone-500 italic">
                Original Paper: "Learning high-accuracy error decoding for quantum processors" by Bausch et al. (Nature 2024)
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">B</span>uilding a large-scale quantum computer requires correcting the errors that inevitably arise in physical systems. The state of the art is the <strong>surface code</strong>, which encodes information redundantly across many physical qubits.
              </p>
              <p>
                However, interpreting the noisy signals from these codes—a task called "decoding"—is a massive challenge. Complex noise effects like cross-talk and leakage confuse standard algorithms. <strong className="text-stone-900 font-medium">AlphaQubit</strong> uses machine learning to learn these complex error patterns directly from the quantum processor, achieving accuracy far beyond human-designed algorithms.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Surface Code */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> CONCEPT 01
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">The Surface Code</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           In a surface code, "Data Qubits" hold the quantum information, while "Stabilizer Qubits" interspersed between them act as watchdogs. They measure parity checks (X and Z type) to detect errors without destroying the quantum state.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            When a data qubit flips, adjacent stabilizers light up. The pattern of these lights is the "syndrome." The decoder's job is to look at the syndrome and guess which data qubit flipped.
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Transformer Decoder */}
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
                           CONCEPT 02: THE INNOVATION
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Neural Decoding</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Standard decoders assume simple, independent errors. Real hardware is messier. AlphaQubit treats decoding as a sequence prediction problem, using a <strong>Recurrent Transformer</strong> architecture.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            It ingests the history of stabilizer measurements and uses "soft" analog information—probabilities rather than just binary 0s and 1s—to make highly informed predictions about logical errors.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Results */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Outperforming the Standard</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        AlphaQubit was tested on Google's Sycamore processor and accurate simulations. It consistently outperforms "Minimum-Weight Perfect Matching" (MWPM), the industry standard, effectively making the quantum computer appear cleaner than it actually is.
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
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">IMPACT</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Towards Fault Tolerance</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        AlphaQubit maintains its advantage even as the code distance increases (up to distance 11). It handles realistic noise including cross-talk and leakage, effects that often cripple standard decoders.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        By learning from data directly, machine learning decoders can adapt to the unique quirks of each quantum processor, potentially reducing the hardware requirements for useful quantum computing.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Our work illustrates the ability of machine learning to go beyond human-designed algorithms by learning from data directly, highlighting machine learning as a strong contender for decoding in quantum computers."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Bausch et al., Nature (2024)</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">THE RESEARCH TEAM</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Primary Authors</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">This research is a collaboration between Google DeepMind and Google Quantum AI. <br/>Analyzed and Visualized by Tomo Academy.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                    <AuthorCard name="Johannes Bausch" role="DeepMind" delay="0s" />
                    <AuthorCard name="Andrew W. Senior" role="DeepMind" delay="0.1s" />
                    <AuthorCard name="Francisco J. H. Heras" role="DeepMind" delay="0.2s" />
                    <AuthorCard name="Thomas Edlich" role="DeepMind" delay="0.3s" />
                    <AuthorCard name="Alex Davies" role="DeepMind" delay="0.4s" />
                    <AuthorCard name="Michael Newman" role="Quantum AI" delay="0.5s" />
                </div>
                <div className="text-center mt-12 flex justify-center">
                    <a href="https://doi.org/10.1038/s41586-024-08148-8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900 pb-1">
                      <span>Read the full paper on Nature</span>
                      <ExternalLink size={14} />
                    </a>
                </div>
           </div>
        </section>
  </>
);

const VideosPage = () => (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9F8F4]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Video Library</div>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Latest Research Breakdowns</h2>
                <p className="max-w-2xl mx-auto text-lg text-stone-600">
                    Watch our latest episodes demystifying complex topics in AI, Quantum Computing, and Physics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VIDEOS.map((video) => (
                    <a key={video.id} href="https://www.youtube.com/@TOMOACADEMY" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className={`aspect-video w-full ${video.thumbnail} relative flex items-center justify-center`}>
                            <PlayCircle className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={64} />
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                                {video.duration}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-nobel-gold bg-stone-900 px-2 py-1 rounded-sm">
                                    {video.category}
                                </span>
                                <span className="text-xs text-stone-400">{video.views}</span>
                            </div>
                            <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-nobel-gold transition-colors">{video.title}</h3>
                        </div>
                    </a>
                ))}
            </div>

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-2xl shadow-sm">T</div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-lg tracking-wide leading-none transition-opacity ${scrolled ? 'text-stone-900' : 'text-stone-900 md:text-stone-800'}`}>
                TOMO ACADEMY
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Research & Education</span>
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
          {currentPage === 'home' && <HomePage scrollToSection={scrollToSection} />}
          {currentPage === 'videos' && <VideosPage />}
          {currentPage === 'community' && <CommunityPage />}
          {(currentPage === 'privacy' || currentPage === 'terms') && <LegalPage docType={currentPage} />}
      </div>

      <footer className="bg-stone-900 text-stone-400 py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-stone-900 font-serif font-bold text-xl">T</div>
                         <span className="text-white font-serif font-bold text-2xl">TOMO ACADEMY</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        Tomo Academy is a digital education platform committed to democratizing access to cutting-edge scientific knowledge. We visualize the invisible.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://