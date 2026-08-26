"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const dotXSpring = useSpring(cursorX, { damping: 50, stiffness: 500, mass: 0.1 });
  const dotYSpring = useSpring(cursorY, { damping: 50, stiffness: 500, mass: 0.1 });

  useEffect(() => {
    // Check if user prefers reduced motion or is on touch device
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (mediaQuery.matches || isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Elements that should trigger cursor expansion
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.hasAttribute('data-cursor');
        
      if (isClickable) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        setHoverText(text || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary pointer-events-none z-[100] flex items-center justify-center mix-blend-difference overflow-hidden bg-white/10 backdrop-blur-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (hoverText ? 80 : 60) : 40,
          height: isHovered ? (hoverText ? 80 : 60) : 40,
          opacity: 1
        }}
      >
        {hoverText && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold text-black uppercase tracking-widest text-center leading-none"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1
        }}
      />
    </>
  );
}
