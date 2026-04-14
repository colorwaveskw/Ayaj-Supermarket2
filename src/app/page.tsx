"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MoveRight, Phone, MessageCircleIcon, Menu, X, ArrowUpRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  
  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.2], ["0rem", "2rem"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <main ref={containerRef} className="relative bg-[#FAF9F6] text-[#0A0A0A] font-sans selection:bg-[#C0F235] selection:text-black">
      
      {/* NOISE OVERLAY for Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-serif italic text-3xl md:text-2xl tracking-widest cursor-pointer select-none">AYAJ</div>
        <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C0F235] transition-colors focus:outline-none relative group">
          <span className="hidden md:block">Menu</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-[#C0F235] transition-all">
            <Menu className="w-4 h-4" />
          </div>
        </button>
      </nav>

      {/* --- FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0A0A0A] text-[#FAF9F6] z-[200] flex flex-col p-6 md:p-12 pb-24"
          >
            <div className="flex justify-between items-center text-white mb-20">
              <div className="font-serif italic text-3xl md:text-2xl tracking-widest">AYAJ</div>
              <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C0F235] transition-colors focus:outline-none group">
                <span className="hidden md:block">Close</span>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <X className="w-4 h-4" />
                </div>
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 w-full gap-12 md:items-end justify-between">
              <ul className="flex flex-col gap-4 md:gap-8 font-serif text-[10vw] md:text-[6vw] leading-none tracking-tighter">
                {['Home', 'About Us', 'Aisles', 'Visit'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="cursor-pointer hover:italic hover:text-[#C0F235] hover:translate-x-8 transition-all duration-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                className="flex flex-col gap-6 text-sm uppercase tracking-widest text-[#FAF9F6]/50"
              >
                <div>
                  <p className="text-white mb-2">Location</p>
                  <p>Shuwaikh Industrial Area<br/>Kuwait</p>
                </div>
                <div>
                  <p className="text-white mb-2">Contact</p>
                  <p>+965 50616174</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- (Awwwards Style Scaling Box) */}
      <section className="relative h-[110vh] w-full flex items-center justify-center bg-[#FAF9F6] p-2 md:p-4 overflow-hidden">
        <motion.div 
          className="relative w-full h-full overflow-hidden flex items-center justify-center origin-bottom"
          style={{ scale: heroScale, borderRadius: heroBorderRadius }}
        >
          {/* Unsplash Premium Grocery Vibe */}
          <Image 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2674&auto=format&fit=crop" 
            alt="Premium Groceries" 
            fill 
            className="object-cover object-center scale-[1.05]"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <motion.div className="relative z-10 flex flex-col items-center justify-center text-center text-white" style={{ y: textY, opacity: heroOpacity }}>
            <span className="text-xs md:text-sm uppercase tracking-[0.5em] mb-6 md:mb-10 font-bold mix-blend-overlay">The Art of Produce</span>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-serif text-[16vw] md:text-[14vw] leading-[0.8] tracking-[-0.04em] m-0 drop-shadow-2xl"
              >
                Souq <span className="italic font-light text-[#C0F235] pr-4">Ayaj</span>
              </motion.h1>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- CREATIVE AWWWARDS EDITORIAL --- */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 w-full max-w-[1800px] mx-auto border-t border-black/5 mt-20">
        
        {/* TOP ROW: Massive Inline Media Typography */}
        <div className="mb-24 lg:mb-40 flex flex-col lg:flex-row">
           <div className="hidden lg:flex w-1/4 flex-col justify-between items-start pt-6 border-t border-black md:mr-16">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C0F235] rounded-full animate-pulse" />
                The Vision
              </span>
              <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <span className="text-[9px] font-semibold uppercase tracking-widest text-center leading-none text-[#0A0A0A]/40">Est<br/>2024</span>
              </div>
           </div>

           <div className="w-full lg:w-3/4 font-serif text-[13vw] lg:text-[7.5vw] leading-[0.95] tracking-[-0.03em] flex flex-wrap items-center">
               <motion.span initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>Elevating the </motion.span> 
               
               {/* Inline Image */}
               <motion.span 
                 initial={{scale: 0.8, opacity:0}} whileInView={{scale: 1, opacity:1}} viewport={{once:true}} transition={{duration:1, delay:0.2}}
                 className="inline-block w-[22vw] lg:w-[14vw] h-[10vw] lg:h-[6vw] mx-3 lg:mx-6 rounded-full overflow-hidden align-middle relative transition-all duration-700"
               >
                 <Image src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=500" alt="Produce" fill className="object-cover" unoptimized/>
               </motion.span>
               
               <motion.span initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8, delay: 0.1}}>everyday errand into an </motion.span>
               
               {/* Inline Button/Pill */}
               <motion.span 
                 initial={{opacity:0, rotate:-10}} whileInView={{opacity:1, rotate:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.3}}
                 className="inline-flex items-center justify-center px-6 lg:px-8 h-[10vw] lg:h-[6vw] mx-3 lg:mx-6 rounded-full border-2 border-[#C0F235] bg-[#C0F235] align-middle text-sm md:text-xl uppercase tracking-[0.2em] font-sans italic text-black hover:bg-black hover:border-black hover:text-[#C0F235] hover:-rotate-6 hover:scale-105 transition-all duration-300 cursor-crosshair shadow-lg"
               >
                  Experience
               </motion.span>
               
               <motion.span initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8, delay: 0.2}}> of discovery.</motion.span>
           </div>
        </div>

        {/* BOTTOM ROW: Text Paragraph & Large Editorial Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-end">
            
            {/* 4 columns: The "We Believe" paragraph */}
            <div className="lg:col-span-5 lg:col-start-2 flex flex-col justify-end pb-8">
               <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:0.8}}>
                 <p className="text-xl md:text-3xl font-light leading-[1.6] text-[#0A0A0A]/90 mb-12">
                    We believe a supermarket shouldn't just be a chore. It should be a curation of excellence. At Souq Ayaj, we meticulously source our produce, meats, and pantry staples to ensure you bring home nothing but the finest quality available in Kuwait.
                 </p>
                 <a href="#order" className="group w-max inline-flex items-center gap-4 text-xs md:text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-black hover:border-transparent transition-all relative overflow-hidden">
                   <span className="relative z-10 group-hover:text-black transition-colors">Start Discovery</span>
                   <div className="absolute inset-0 bg-[#C0F235] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                   <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </a>
               </motion.div>
            </div>

            {/* 6 columns: Beautiful Image */}
            <div className="lg:col-span-5 lg:col-start-8 relative aspect-[4/5] rounded-[2rem] overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2874&auto=format&fit=crop" 
                 alt="Souq Ayaj Interior" 
                 fill 
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                 unoptimized
               />
               <div className="absolute inset-0 border border-white/20 rounded-[2rem] pointer-events-none" />
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end mix-blend-difference text-white">
                  <span className="text-xs font-semibold tracking-widest uppercase">Shuwaikh Industrial</span>
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
               </div>
            </div>

        </div>
      </section>

      {/* --- INTERACTIVE CATEGORY SHOWCASE --- (Hover to reveal bg) */}
      <section className="relative py-32 bg-[#0A0A0A] text-[#FAF9F6] h-[100svh] min-h-[800px] flex flex-col justify-center overflow-hidden">
        
        {/* Dynamic Backgrounds based on hover */}
        {products.map((item, i) => (
          <div 
            key={item.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredCategory === i ? 'opacity-40 scale-100' : 'opacity-0 scale-105'}`}
          >
            <Image src={item.img} alt={item.title} fill className="object-cover" unoptimized/>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-90" />

        <div className="relative z-10 w-full flex flex-col items-center">
          <span className="text-sm uppercase tracking-[0.4em] mb-12 text-[#C0F235]">Curated Aisles</span>
          <ul className="flex flex-col items-center w-full">
            {products.map((item, i) => (
              <li 
                key={item.title}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="w-full flex justify-center py-4 border-b border-white/5 last:border-none cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full max-w-4xl px-6 md:px-0 transition-transform duration-500 group-hover:scale-[1.02]">
                   <span className="font-serif italic text-xl md:text-3xl text-white/20 group-hover:text-[#C0F235] transition-colors duration-500">{(i+1).toString().padStart(2, '0')}</span>
                   <h3 className="font-serif text-[10vw] md:text-8xl tracking-tight text-transparent bg-clip-text text-outline group-hover:text-white transition-all duration-500">
                     {item.title}
                   </h3>
                   <span className="text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-8 group-hover:translate-x-0 hidden md:block">
                     Explore
                   </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-8 md:py-12 overflow-hidden bg-[#C0F235] text-[#0A0A0A] flex whitespace-nowrap border-y border-black">
        <motion.div 
          animate={{ x: [0, -1500] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="font-serif text-4xl md:text-6xl uppercase tracking-tighter flex gap-8 items-center"
        >
          {Array(10).fill("Premium • Fresh • Local •").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* --- IMMERSIVE ORDER CTA --- */}
      <section id="order" className="py-32 md:py-48 px-6 md:px-12 bg-[#FAF9F6] text-[#0A0A0A] relative flex flex-col items-center text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once:true, margin:"-20%" }} transition={{ duration: 1 }}
           className="mb-16"
         >
           <h2 className="font-serif text-[12vw] md:text-[8vw] leading-none tracking-tighter mb-8 text-[#0A0A0A]">
             Skip the <span className="italic text-[#0A0A0A]/40">Cart.</span>
           </h2>
           <p className="text-xl md:text-3xl max-w-2xl mx-auto font-light leading-relaxed text-[#0A0A0A]/70">
             Direct ordering via WhatsApp. Let us curate and prepare your staples for pickup or delivery.
           </p>
         </motion.div>

         <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-10">
           <a href="https://wa.me/96550616174" className="group bg-[#0A0A0A] text-white px-10 py-6 rounded-full flex items-center justify-center gap-4 text-sm md:text-base uppercase tracking-widest font-semibold hover:bg-[#C0F235] hover:text-[#0A0A0A] transition-all duration-300">
             <MessageCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> WhatsApp Us
           </a>
           <a href="tel:+96550616174" className="group bg-transparent border border-[#0A0A0A]/20 text-[#0A0A0A] px-10 py-6 rounded-full flex items-center justify-center gap-4 text-sm md:text-base uppercase tracking-widest font-semibold hover:border-[#0A0A0A] transition-all duration-300">
             <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Call Directly
           </a>
         </div>
      </section>

      {/* --- FOOTER MAIN --- */}
      <footer className="bg-[#0A0A0A] pt-32 pb-12 px-6 md:px-12 text-[#FAF9F6]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between gap-16 border-b border-white/10 pb-24">
           
           <div className="md:w-1/3">
             <div className="font-serif italic text-6xl tracking-widest mb-12 text-white">AYAJ</div>
             <p className="font-light text-lg text-white/50 max-w-sm mb-12">
               Redefining the grocery experience in Kuwait with unparalleled freshness and quality.
             </p>
             <div className="space-y-4 text-sm uppercase tracking-widest text-[#C0F235]">
               <p>Shuwaikh Industrial Area</p>
               <p>Kuwait</p>
               <p className="mt-8 text-white">Open Daily 9AM – 10PM</p>
             </div>
           </div>

           <div className="md:w-1/2 flex flex-col gap-12">
             <div className="w-full aspect-[4/3] md:aspect-[2/1] bg-white/5 rounded-3xl overflow-hidden relative group saturate-0 hover:saturate-100 transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.435!2d47.9319032!3d29.3233127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b002bd24a37%3A0x281723f0690601c1!2sSouq%20Ayaj!5e0!3m2!1sen!2sus!4v1714412312312!5m2!1sen!2sus" 
                  className="w-full h-full border-0 absolute inset-0" 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>
           </div>

        </div>

        <div className="max-w-[1800px] mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs tracking-[0.2em] uppercase text-white/40">
          <span>© {new Date().getFullYear()} Souq Ayaj. All Rights Reserved.</span>
          <span className="hover:text-white transition-colors cursor-pointer">Designed for Excellence</span>
        </div>
      </footer>

      {/* Global CSS for text outline */}
      <style dangerouslySetInnerHTML={{__html: `
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .group:hover .text-outline {
          -webkit-text-stroke: 0px;
        }
      `}} />
    </main>
  );
}

// --- MICRO COMPONENTS ---

function RevealText({ text, className }: { text: string, className: string }) {
  return (
    <div className={`${className} flex flex-wrap gap-x-[0.2em] gap-y-[0.1em]`}>
      {text.split(" ").map((word, i) => (
        <div key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "120%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

const products = [
  { title: "Produce", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2000&auto=format&fit=crop" },
  { title: "Meats", img: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=2000&auto=format&fit=crop" },
  { title: "Dairy", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2000&auto=format&fit=crop" },
  { title: "Pantry", img: "https://images.unsplash.com/photo-1584285418504-03f36a8dd2e6?q=80&w=2000&auto=format&fit=crop" },
  { title: "Sweets", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop" },
];
