"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shoe3DViewer } from '@/components/3d/Shoe3DViewer';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Hero Parallax
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const shoeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const shoeY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main ref={container} className="relative bg-background">
      
      {/* SECTION 01: HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-10" />

        <div className="container mx-auto px-4 md:px-8 relative z-20 flex flex-col lg:flex-row items-center h-full pt-20">
          
          {/* Hero Content (LEFT) */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start items-center text-center lg:text-left pt-10 lg:pt-0"
          >
            <h1 className="font-heading font-black text-[12vw] lg:text-[7vw] leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl pointer-events-none">
              <SplitText text="MOVE" delay={0.2} type="chars" />
              <br />
              <SplitText text="DIFFERENT." delay={0.4} type="chars" className="text-transparent text-stroke" />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg md:text-xl text-primary/70 mb-10 max-w-md font-medium"
            >
              Engineered for every step. The future of performance footwear is here.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/shop" data-cursor-text="EXPLORE">
                <MagneticButton as="div" className="bg-primary text-primary-foreground px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary/90">
                  EXPLORE COLLECTION
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
              <Link href="/shop" data-cursor-text="SHOP">
                <MagneticButton as="div" className="px-8 py-4 rounded-full border border-primary/20 hover:border-primary/50 flex items-center gap-2">
                  SHOP NOW
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero 3D Shoe (RIGHT) */}
          <motion.div 
            style={{ scale: shoeScale, y: shoeY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative z-30 flex items-center justify-center cursor-grab active:cursor-grabbing mt-10 lg:mt-0"
            data-cursor-text="DRAG"
          >
            {/* The 3D viewer will load the fallback glTF shoe if no model provided */}
            <Shoe3DViewer 
              modelUrl="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb" 
              materialConfig={{ 'laces': '#DC143C' }} // Make laces crimson
            />
          </motion.div>
          
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-primary/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-primary w-full h-1/2"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 02: CATEGORIES (Placeholder for now) */}
      <section className="min-h-screen py-32 bg-primary text-primary-foreground rounded-t-[3rem] -mt-10 relative z-30">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase mb-20 text-center">
            <SplitText text="CATEGORIES" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['SNEAKERS', 'RUNNING', 'SPORTS', 'FORMAL', 'BOOTS', 'SANDALS'].map((category, index) => (
              <Link href={`/shop?category=${category.toLowerCase()}`} key={category} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[400px] overflow-hidden rounded-2xl bg-secondary/10 flex items-end p-8 cursor-pointer border border-white/5"
                  data-cursor-text="EXPLORE"
                >
                  {/* Fallback pattern for categories until images are fetched */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-primary/20 transition-transform duration-700 group-hover:scale-110 z-0">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
                  </div>
                  
                  <div className="relative z-20 flex justify-between items-center w-full">
                    <h3 className="text-3xl font-heading font-bold">{category}</h3>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
