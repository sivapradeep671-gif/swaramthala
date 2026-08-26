"use client";

import React, { useState, useRef, useEffect } from 'react';

export interface Shoe360ViewerProps {
  frames: string[]; // Array of image URLs
  className?: string;
}

export function Shoe360Viewer({ frames, className = '' }: Shoe360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Preload images to prevent flickering
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    
    // Sensitivity of drag
    if (Math.abs(deltaX) > 5) {
      // Direction: negative delta means dragging left (rotate right), positive means dragging right (rotate left)
      const direction = deltaX > 0 ? -1 : 1;
      
      setCurrentFrame((prev) => {
        let next = prev + direction;
        if (next >= frames.length) next = 0;
        if (next < 0) next = frames.length - 1;
        return next;
      });
      
      setStartX(e.clientX); // Reset startX for continuous dragging
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  if (frames.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }} // Prevent scrolling while interacting
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={frames[currentFrame]} 
        alt="360 View" 
        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal pointer-events-none" 
        draggable={false}
      />
      
      {/* Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none opacity-50">
        <span className="text-xs uppercase tracking-widest font-bold">Drag to rotate</span>
        <div className="flex gap-1">
          {frames.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-all ${i === currentFrame ? 'bg-primary scale-150' : 'bg-primary/30'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
