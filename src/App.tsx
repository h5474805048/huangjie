/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { ArrowUpRight, Instagram, Linkedin, Twitter, ChevronDown, Plus, Trash2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import OpeningAnimation from "./components/OpeningAnimation";

// --- Assets ---
import hero1 from "./assets/images/01.jpg";
import hero2 from "./assets/images/02.jpg";
import hero3 from "./assets/images/03.jpg";
import hero4 from "./assets/images/04.jpg";
import mainVideo from "./assets/shipin/shipin1.mp4";

// Project Images from img2
import proj6 from "./assets/img2/6.jpg";
import proj7 from "./assets/img2/7.jpg";
import proj8 from "./assets/img2/8.jpg";
import proj9 from "./assets/img2/9.jpg";
import proj10 from "./assets/img2/10.jpg";
import proj11 from "./assets/img2/11.jpg";
import proj12 from "./assets/img2/12.jpg";
import proj13 from "./assets/img2/13.jpg";
import proj14 from "./assets/img2/14.jpg";
import proj15 from "./assets/img2/15.jpg";
import proj16 from "./assets/img2/16.jpg";
import proj17 from "./assets/img2/17.jpg";
import proj18 from "./assets/img2/18.jpg";
import proj19 from "./assets/img2/19.jpg";
import proj20 from "./assets/img2/20.jpg";
import proj21 from "./assets/img2/21.jpg";

// Gallery Images from lun
import lun22 from "./assets/lun/22.jpg";
import lun23 from "./assets/lun/23.jpg";
import lun24 from "./assets/lun/24.png";
import lun25 from "./assets/lun/25.jpg";

// Waterfall Images from img3
import img29 from "./assets/img3/29.jpg";
import img30 from "./assets/img3/30.jpg";
import img31 from "./assets/img3/31.jpg";
import img32 from "./assets/img3/32.jpg";
import img34 from "./assets/img3/34.jpg";
import img35 from "./assets/img3/35.jpg";
import img36_1 from "./assets/img3/36-1.jpg";
import img36 from "./assets/img3/36.jpg";
import img37 from "./assets/img3/37.jpg";
import img38 from "./assets/img3/38.jpg";
import img39 from "./assets/img3/39.jpg";
import img40_1 from "./assets/img3/40-1.jpg";
import img40 from "./assets/img3/40.jpg";
import img41 from "./assets/img3/41.jpg";
import img42 from "./assets/img3/42.jpg";
import img43 from "./assets/img3/43.jpg";
import img44 from "./assets/img3/44.jpg";
import img45 from "./assets/img3/45.jpg";
import img46 from "./assets/img3/46.jpg";
import img47 from "./assets/img3/47.jpg";

// --- Components ---

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const [hoverType, setHoverType] = useState<"none" | "pointer" | "project">("none");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isProject = target.closest('.project-card');
      const isSelectable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.closest('a') || 
                         target.closest('button') ||
                         target.closest('.group') ||
                         target.tagName === 'A' ||
                         target.tagName === 'BUTTON';
      
      if (isProject) {
        setHoverType("project");
      } else if (isSelectable) {
        setHoverType("pointer");
      } else {
        setHoverType("none");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 border border-white/20 rounded-full flex items-center justify-center mix-blend-difference pointer-events-none overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: hoverType === "project" ? 60 : 40,
          height: hoverType === "project" ? 60 : 40,
        }}
        animate={{
          scale: hoverType === "none" ? 1 : 1.1,
          backgroundColor: hoverType === "none" ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.1)",
          borderColor: hoverType === "none" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1 bg-white rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          height: hoverType === "none" ? "4px" : "0px",
          width: hoverType === "none" ? "4px" : "0px",
        }}
        animate={{
          scale: hoverType === "project" ? 0 : 1,
          opacity: hoverType === "none" ? 1 : 0,
        }}
      />
    </div>
  );
};

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  { id: 10, title: "MONO LOGO", category: "Logo Design", imageUrl: proj15 },
  { id: 2, title: "CALIVERSE", category: "Web Design", imageUrl: proj18 },
  { id: 3, title: "LUNAR WALK", category: "Interactive", imageUrl: proj8 },
  { id: 4, title: "FXMASTER", category: "App Design", imageUrl: proj9 },
  { id: 5, title: "QUADRI", category: "Branding", imageUrl: proj20 },
  { id: 23, title: "SPECTRUM", category: "Lighting", imageUrl: proj19 },
  { id: 7, title: "RAIN ROOM", category: "Spatial", imageUrl: proj12 },
  { id: 8, title: "YELLOW CLIFF", category: "Architecture", imageUrl: proj13 },
  { id: 20, title: "DEEP BLUE", category: "Marine", imageUrl: proj17 },
  { id: 16, title: "CITY LIGHTS", category: "Urban", imageUrl: proj21 },
  { id: 11, title: "URBAN PULSE", category: "LifeStyle", imageUrl: proj16 },
  { id: 12, title: "ECHO STATE", category: "Animation", imageUrl: proj17 },
  { id: 13, title: "SILENT PEAK", category: "Landscape", imageUrl: proj18 },
  { id: 14, title: "NEON DREAMS", category: "Nightlife", imageUrl: proj19 },
  { id: 15, title: "ABSTRACT FLOW", category: "Digital Art", imageUrl: proj10 },
  { id: 1, title: "THE SPACE KIDS", category: "Brand Identity", imageUrl: proj6 },
  { id: 17, title: "NEBULA", category: "Digital", imageUrl: proj6 },
  { id: 18, title: "SILK ROAD", category: "Fashion", imageUrl: proj7 },
  { id: 19, title: "FUTURE LAB", category: "Biotech", imageUrl: proj8 },
  { id: 9, title: "WAVE FORM", category: "Motion", imageUrl: proj14 },
  { id: 21, title: "VELOCITY", category: "Automotive", imageUrl: proj9 },
  { id: 22, title: "ORIGIN", category: "Craft", imageUrl: proj11 },
  { id: 6, title: "PANINI DI MARE", category: "Packaging", imageUrl: proj7 },
  { id: 24, title: "OVERLAYS", category: "Graphics", imageUrl: proj8 },
];

const GALLERY_IMAGES = [
  lun22,
  lun23,
  lun24,
  lun25,
  lun22,
  lun23,
  lun24,
  lun25
];

const HERO_IMAGES = [
  hero1,
  hero2,
  hero3,
  hero4,
];

const CLIENTS = ["Spotify", "Adobe", "Nike", "Apple", "Vogue", "Loro Piana"];

const RECOGNITION = [
  "Awwwards — Site of the Day",
  "Behance — Featured in Graphic Design",
  "Hiiibrand — Silver Award",
  "LogoLounge — Book 13 Featured"
];

// --- Sub-components ---

const Logo = () => (
  <svg width="80" height="40" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-8 transform -rotate-3">
    <path 
      d="M10 45C12 35 15 15 25 35C30 45 35 15 45 45C55 45 60 20 65 35C70 45 75 15 85 45C95 45 105 20 115 50" 
      stroke="black" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M40 52C55 50 100 48 110 55" 
      stroke="black" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => (
  <motion.nav 
    className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 md:px-0"
  >
    <div className="bg-[#F8F7F4] rounded-2xl md:rounded-full px-6 py-3 md:px-10 md:py-4 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] w-full md:w-auto md:gap-16">
      <div className="flex items-center -ml-2">
        <a href="#" className="group flex items-center transition-transform duration-500 hover:scale-110">
          <Logo />
          <span className="sr-only">MORS</span>
        </a>
      </div>
      
      <div className="flex gap-1 md:gap-4 items-center">
        <a href="#works" style={{ fontFamily: 'Arial' }} className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-[#222] hover:bg-black/[0.03] px-3 md:px-5 py-2.5 rounded-full transition-all duration-700 ease-[0.22,1,0.36,1]">作品</a>
        <a href="#about" style={{ fontFamily: 'Arial' }} className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-[#222] hover:bg-black/[0.03] px-3 md:px-5 py-2.5 rounded-full transition-all duration-700 ease-[0.22,1,0.36,1]">个人信息</a>
        <a href="#services" style={{ fontFamily: 'Arial' }} className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-[#222] hover:bg-black/[0.03] px-3 md:px-5 py-2.5 rounded-full transition-all duration-700 ease-[0.22,1,0.36,1]">其他内容</a>
      </div>
    </div>
  </motion.nav>
);

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // 4 seconds duration as requested
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center px-8 md:px-12 relative overflow-hidden group">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            initial={{ y: "-100%" }} // Enter from top
            animate={{ y: 0 }}       // Move to center
            exit={{ y: "100%" }}    // Exit to bottom
            transition={{ duration: 1.4, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.15 }} // Continuous zoom during display
              transition={{ duration: 4, ease: "linear" }}
              className="w-full h-full"
            >
              <img 
                src={HERO_IMAGES[currentImage]} 
                alt="Hero Background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.7)" }} // Increased brightness to reduce "blackness" as requested
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="z-10 flex flex-col items-center text-center">
        <h1 
          className="text-6xl md:text-8xl font-bold tracking-tight max-w-5xl leading-[1.1] text-white mx-auto"
        >
          Brand KV <span className="italic font-serif font-light">Rendering</span> Original Works.
        </h1>
        
        <div 
          className="mt-16 flex justify-center gap-4"
        >
          <a href="#works" className="bg-brand-fg text-brand-bg px-10 py-5 rounded-full text-sm font-semibold hover:scale-[1.02] transition-all duration-700 ease-[0.22,1,0.36,1] flex items-center gap-2 group/btn shadow-2xl">
            View Work
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-500" />
          </a>
        </div>
      </div>

    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; className?: string }> = ({ project, index, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative cursor-pointer overflow-hidden perspective-[1000px] project-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full overflow-hidden"
      >
        <motion.img 
          src={project.imageUrl} 
          alt={project.title}
          referrerPolicy="no-referrer"
          animate={{ scale: isHovered ? 1.08 : 1.02 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover transition-all duration-1000"
          style={{ transform: "translateZ(-20px)" }}
        />
        <div className="absolute inset-x-0 bottom-0 p-8 z-20" style={{ transform: "translateZ(40px)" }}>
          <motion.div
            animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-light tracking-widest uppercase italic">C4D+CORONA</h3>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Dynamic glint effect */}
        <motion.div 
          style={{ 
            background: useTransform(
              [x, y],
              ([latestX, latestY]: any[]) => `radial-gradient(400px circle at ${50 + latestX * 100}% ${50 + latestY * 100}%, rgba(255,255,255,0.08), transparent 60%)`
            ),
            transform: "translateZ(10px)"
          }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectGrid = () => (
  <section id="works" className="py-32 px-4 md:px-12 bg-brand-bg">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-4 px-4 border-b border-brand-line pb-12">
      <div>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-2 uppercase">Product scene<br />rendering</h2>
        <p className="text-[31px] text-white/50 leading-[33px] font-bold mt-[14px] text-left tracking-[0.2em]">产品场景渲染</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-min">
      <ProjectCard project={PROJECTS[0]} index={0} className="md:col-span-7 aspect-[16/12]" />
      <ProjectCard project={PROJECTS[1]} index={1} className="md:col-span-5 md:mt-6 aspect-[3/4]" />
      
      <ProjectCard project={PROJECTS[4]} index={4} className="md:col-span-5 md:-mt-4 aspect-square" />
      <ProjectCard project={PROJECTS[5]} index={5} className="md:col-span-7 md:mt-8 aspect-[4/3]" />
      
      <ProjectCard project={PROJECTS[6]} index={6} className="md:col-span-7 aspect-[16/14]" />
      <ProjectCard project={PROJECTS[7]} index={7} className="md:col-span-5 md:mt-8 aspect-[2/3]" />
      
      <ProjectCard project={PROJECTS[8]} index={8} className="md:col-span-12 aspect-[21/15]" />
      
      <ProjectCard project={PROJECTS[9]} index={9} className="md:col-span-8 aspect-[16/12]" />
      <ProjectCard project={PROJECTS[10]} index={10} className="md:col-span-4 md:mt-4 aspect-[2/3]" />

      <ProjectCard project={PROJECTS[19]} index={19} className="md:col-span-6 aspect-[4/3]" />
      <ProjectCard project={PROJECTS[15]} index={15} className="md:col-span-6 aspect-[4/3]" />

      <ProjectCard project={PROJECTS[14]} index={14} className="md:col-span-12 aspect-[21/13]" />

      <ProjectCard project={PROJECTS[20]} index={20} className="md:col-span-5 aspect-square" />
      <ProjectCard project={PROJECTS[21]} index={21} className="md:col-span-7 aspect-[16/10]" />

      <ProjectCard project={PROJECTS[22]} index={22} className="md:col-span-8 aspect-[16/9]" />
      <ProjectCard project={PROJECTS[23]} index={23} className="md:col-span-4 aspect-square" />
    </div>
  </section>
);

const InteractiveParallaxSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-bg">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      >
        <source src={mainVideo} type="video/mp4" />
      </video>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4"
        >
          <h2 className="text-[12vw] font-black tracking-tighter leading-none uppercase text-white mix-blend-difference">
            RENDERING<br />AI VIDEO
          </h2>
          <div className="mt-12 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-white transition-all duration-500"
            >
              <ArrowUpRight className="w-8 h-8 text-white group-hover:text-black transition-colors" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-12 left-12 flex items-center gap-4">
        <div className="w-2 h-2 bg-brand-fg rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">Digital Art Direction</span>
      </div>
    </section>
  );
};

const GalleryScroller = () => (
  <section className="py-24 border-y border-brand-line overflow-hidden relative bg-neutral-950/30">
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-6 w-max"
    >
      {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, idx) => (
        <div key={idx} className="w-[400px] h-[300px] flex-shrink-0 overflow-hidden rounded-xl group">
          <img 
            src={img} 
            alt="Gallery" 
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
          />
        </div>
      ))}
    </motion.div>
  </section>
);

const Counter = ({ target, label }: { target: number, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <h3 className="text-6xl md:text-8xl font-black mb-2 tracking-tighter">{count}+</h3>
      <p className="text-[10px] uppercase tracking-[0.3em] text-brand-muted">{label}</p>
    </div>
  );
};

const About = () => (
  <section id="about" className="py-40 px-4 md:px-12 bg-neutral-950 relative overflow-hidden border-t border-white/5">
    {/* Background Decorative Text */}
    <div className="absolute -top-20 -right-20 text-[25vw] font-black text-white/[0.02] select-none pointer-events-none">
      ABOUT
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
        {/* Left Column: Personal Title & Bio */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-white/40" />
                <span className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-black whitespace-nowrap">Personal Dossier</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.8] mb-8 font-sans">
                HUANG JIE
              </h2>
              <p className="text-3xl md:text-4xl font-bold leading-[1.1] text-white/50 font-sans">
                个人信息 / 设计师
              </p>
            </div>

            <div className="space-y-8 pl-4 border-l-2 border-white/10">
              <p className="text-2xl md:text-3xl font-normal leading-snug text-white/90 font-sans">
                “擅长3D渲染，电商KV详情页设计，海报，平面排版等，善于应用AI辅助设计。”
              </p>
              <p className="text-lg text-white/40 leading-relaxed max-w-xl">
                基于武汉，深耕电商视觉与高精3D产品表现。通过即梦、ChatGPT、Gemini等AI工具深度赋能，将创意策略转化为极具视觉冲击力的数字化体验。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {["3D Render", "Key Visual", "E-commerce", "AI Assisted"].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/60 border border-white/10">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Connectivity</p>
                <p className="text-white font-mono tracking-tighter">13407190842</p>
                <p className="text-white/50 text-xs mt-1">huangjie574805048@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-6 mt-12 lg:mt-0">
          <div className="space-y-16">
            <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black mb-12">Experience Timeline</h3>
            
            <div className="space-y-24">
              {[
                {
                  year: "2020 — 2026",
                  company: "武汉梵墨设计",
                  role: "老板电器项目组小组长",
                  tasks: ["负责活动KV设计及H5倒计时视觉统筹", "3D渲染，KV渲染设计", "设计质量把控与团队输出审核"]
                },
                {
                  year: "2019 — 2020",
                  company: "武汉左点实业",
                  role: "电商视觉设计",
                  tasks: ["主图及产品详情页视觉营销设计", "品牌活动专题页视觉落地"]
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group relative"
                >
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-white/20 font-mono text-xs tracking-widest">{item.year}</span>
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:translate-x-4 transition-transform duration-700">{item.company}</h4>
                  <p className="text-xl text-white/50 font-light italic font-sans mb-8">{item.role}</p>
                  
                  <ul className="space-y-4">
                    {item.tasks.map((task, tidx) => (
                      <li key={tidx} className="flex items-start gap-4 text-white/40 group-hover:text-white/60 transition-colors">
                        <span className="text-white/20 mt-1.5 text-[8px]">/</span>
                        <p className="text-sm leading-relaxed font-sans">{task}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-20"
            >
              <a 
                href="mailto:huangjie574805048@gmail.com" 
                className="group flex flex-col gap-4 text-white"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:italic transition-all duration-500 uppercase">Get Full Resume</span>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 group-hover:rotate-45">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
                <div className="h-0.5 w-0 bg-white group-hover:w-full transition-all duration-1000 origin-left" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Service Gallery Images from img3
const WATERFALL_IMAGES = [
  img29, img30, img31, img32, img34, 
  img42, img36_1, img36, img37, img38, 
  img39, img40_1, img40, img41, img35, 
  img43, img44, img45, img46, img47
];

const SERVICE_GALLERY = WATERFALL_IMAGES.map((img, idx) => ({
  id: idx + 1,
  title: `Project ${idx + 1}`,
  image: img,
}));

interface ServiceCardProps {
  item: {
    id: number;
    title: string;
    image: string;
  };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, index }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group relative perspective-[1000px] project-card break-inside-avoid mb-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl bg-neutral-900 transition-colors shadow-xl border border-white/10"
      >
        <motion.img 
          src={item.image} 
          alt={item.title}
          style={{ transform: "translateZ(-5px) scale(1.02)" }}
          className="w-full block transition-all duration-1000 ease-out group-hover:scale-105"
        />
        
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div 
          className="absolute inset-0 flex items-end p-8"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: (index % 4) * 0.1 + 0.3 }}
            >
              <h3 className="text-lg font-bold tracking-tighter text-white group-hover:tracking-widest transition-all duration-700 uppercase italic">
                C4D+CORONA
              </h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="py-32 px-4 md:px-8 lg:px-12 bg-neutral-950">
    <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-2 uppercase text-white">Product poster<br />design</h2>
        <p className="text-[31px] text-white/50 leading-[33px] font-bold mt-[14px] text-left tracking-[0.2em]">产品海报设计</p>
      </motion.div>
      <p className="text-white/40 max-w-sm text-xs uppercase tracking-[0.2em] leading-relaxed font-medium">
        A curated collection of 20 pieces exploring the intersection of texture, light, and digital form.
      </p>
    </div>
    
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 px-4">
      {SERVICE_GALLERY.map((item, idx) => (
        <ServiceCard key={item.id} item={item} index={idx} />
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-4 md:px-12 border-t border-brand-line flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold">
    <p>© 2026 MORS DARK STUDIO • MADE WITH PRECISION</p>
    <div className="flex gap-12">
      <a href="#" className="hover:text-brand-fg transition-colors">Privacy Policy</a>
      <a href="#" className="hover:text-brand-fg transition-colors">Terms of Use</a>
    </div>
  </footer>
);

// --- Main Page ---

export default function App() {
  const [openingCompleted, setOpeningCompleted] = useState(false);

  return (
    <div className="selection:bg-white selection:text-black min-h-screen cursor-none">
      <AnimatePresence mode="wait">
        {!openingCompleted ? (
          <motion.div
            key="animation"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <OpeningAnimation onComplete={() => setOpeningCompleted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <CustomCursor />
            <Navbar key="navbar" />
            <main key="main">
              <Hero />
              <ProjectGrid />
              <InteractiveParallaxSection />
              <GalleryScroller />
              <About />
              <Services />
            </main>
            <Footer key="footer" />
          </motion.div>
        )
        }
      </AnimatePresence>
    </div>
  );
}
