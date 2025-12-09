import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Mail, Users, MessageSquare } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | string[];
  link: string;
  features: string[];
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "TOMO Vibecoding Tool",
    description: "TOMO is an AI-powered code editor that enables users to code and build websites in seconds, featuring multi-page support, auto-deployment, free hosting with global CDN, open-source AI models like Llama and Mistral, Hugging Face integration, and optimized performance.",
    image: "/dev-aj-tool-vercel-app-1024x768desktop-acda78.png",
    link: "https://dev-aj-tool.vercel.app/",
    category: "AI Development Tool",
    features: [
      "Multi Pages: Supports dynamic routing, navigation, and SEO-ready complex websites",
      "Auto Deploy: Instant live updates without CI/CD setup",
      "Free Hosting: Global CDN for fast performance",
      "Open Source Models: Powered by Llama, Mistral, CodeLlama for transparency",
      "Hugging Face Integration: Access to advanced models and datasets",
      "Blazing Fast UX: Edge computing and caching for developers and non-developers"
    ]
  },
  {
    id: 2,
    title: "TOMO Bot - AI Email Assistant",
    description: "TOMO bot is an AI assistant developed by AJ STUDIOZ that helps users compose, send, and manage professional emails efficiently, with commands like 'Send a thank you email to [email]' or 'Help me write a professional email'.",
    image: "/workflow-one-gamma-vercel-app-1024x768desktop-f1ea93.png",
    link: "https://workflow-one-gamma.vercel.app/",
    category: "AI Assistant",
    features: [
      "Send Thank You: Quickly generate and send thank-you emails",
      "Professional Email: Assist in writing polished professional correspondence",
      "Compose Email: Streamline email creation and management"
    ]
  },
  {
    id: 3,
    title: "TOMO - AI-Powered Chat Assistant",
    description: "TOMO is an advanced AI-powered chat assistant featuring intelligent tools, voice chat, image generation, and real-time search for future-forward AI conversations.",
    image: ["/tomo-chat-web.jpeg", "/hello-its-vercel-app-1024x768desktop-72ac20.png"],
    link: "https://chat.tomoacademy.site",
    category: "AI Chat",
    features: [
      "Intelligent Tools: Advanced AI capabilities for smart interactions",
      "Voice Chat: Supports voice-based conversations",
      "Image Generation: Creates images within chats",
      "Real-Time Search: Integrates live web search",
      "Access: User login via email/password or Google; sign-up available"
    ]
  },
  {
    id: 4,
    title: "TOMO Academy - Internal Management Tool",
    description: "TOMO Academy is a premium digital platform and comprehensive internal tool designed to streamline operations, manage a team of 14+ creators, and optimize YouTube channel success, built specifically for content creation workflows.",
    image: "/tomo-forge-hub-vercel-app-1024x768desktop-dbc84d.png",
    link: "",
    category: "Staff Portal",
    features: [
      "Team Management: Digital employee profiles with ID cards and QR codes for identity verification",
      "Content Hub: Track YouTube uploads, scheduling, and performance metrics",
      "Task Board: Kanban-style project management with assignments, deadlines, and progress tracking",
      "Analytics: Insights into channel performance, team productivity, and content metrics",
      "Secure Access: Role-based permissions with Firebase authentication and audit trails",
      "Automation: Workflows for onboarding, notifications, and reporting"
    ]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI Development Tool":
      return <Code className="w-5 h-5" />;
    case "AI Assistant":
      return <Mail className="w-5 h-5" />;
    case "AI Chat":
      return <MessageSquare className="w-5 h-5" />;
    case "Staff Portal":
      return <Users className="w-5 h-5" />;
    default:
      return <Code className="w-5 h-5" />;
  }
};

const ProjectImage = ({ images, title }: { images: string | string[], title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Array.isArray(images) ? images : [images];

  useEffect(() => {
    if (imageArray.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [imageArray.length]);

  return (
    <>
      <img
        src={imageArray[currentImageIndex]}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e7e5e4" width="400" height="300"/%3E%3Ctext fill="%2378716c" font-family="sans-serif" font-size="24" text-anchor="middle" x="200" y="150"%3ETOMO%3C/text%3E%3C/svg%3E';
        }}
      />
      {imageArray.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {imageArray.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'bg-nobel-gold w-6' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export const ProjectCards = () => {
  return (
    <div className="container mx-auto px-6 max-w-7xl">
      {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-nobel-gold/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                <ProjectImage images={project.image} title={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                  {getCategoryIcon(project.category)}
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                {/* Title */}
                <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-nobel-gold transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-stone-600">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-nobel-gold mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="line-clamp-2">{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-xs text-stone-500 italic pl-3.5">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Button */}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all duration-300 shadow-md hover:shadow-xl group/btn"
                  >
                    <span className="font-medium text-sm tracking-wide">Visit</span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-stone-200 text-stone-500 rounded-xl cursor-not-allowed">
                    <span className="font-medium text-sm tracking-wide">Internal Use Only</span>
                    <Users className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-nobel-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-sm text-stone-500 mb-4">
          All projects developed by <span className="font-bold text-stone-700">AJ STUDIOZ</span>
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-stone-50 border border-stone-200 rounded-full">
          <span className="text-xs text-stone-600">More projects coming soon</span>
          <span className="text-nobel-gold">✨</span>
        </div>
      </div>
    </div>
  );
};
