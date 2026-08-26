/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
"use client";

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends Omit<HTMLMotionProps<any>, "as"> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  as?: "button" | "div";
}

export function MagneticButton({ 
  children, 
  className, 
  magneticStrength = 0.5,
  as = "button",
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<any>(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    return false;
  });

  const handleMouse = (e: React.MouseEvent<any>) => {
    if (isTouch) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const reset = () => {
    if (isTouch) return;
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === "div" ? motion.div : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1, restDelta: 0.001 }}
      className={cn(
        "relative overflow-hidden group font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Button Hover effect background */}
      <motion.div
        initial={false}
        animate={{ 
          scale: isHovered ? 1.5 : 0, 
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 dark:bg-white/10 mix-blend-overlay pointer-events-none z-0"
      />
    </Component>
  );
}
