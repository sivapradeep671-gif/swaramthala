"use client";

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductWithDetails } from '@/lib/services';
import { Shoe3DViewer } from '@/components/3d/Shoe3DViewer';
import { Shoe360Viewer } from '@/components/3d/Shoe360Viewer';
import { Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  product: ProductWithDetails;
  selectedVariantId: string;
}

export function ProductGallery({ product, selectedVariantId }: ProductGalleryProps) {
  const [is3DMode, setIs3DMode] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  
  // All media
  const allMedia = product.media || [];
  
  // Filter media based on variant.
  // 1. If media has no variant_id, it applies to all.
  // 2. If it has variant_id, it must match selectedVariantId.
  // 3. 360-frames are treated separately.
  const galleryMedia = allMedia.filter(m => 
    m.type !== '360-frame' && 
    (!m.product_variant_id || m.product_variant_id === selectedVariantId)
  ).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const frames360 = allMedia.filter(m => m.type === '360-frame')
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    
  const has360 = frames360.length > 0;
  const frameUrls = frames360.map(f => f.url);
  
  const heroMedia = galleryMedia.find(img => img.type === 'hero') || galleryMedia[0];
  
  // When variant changes, we want to reset to the first image of that variant
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImage(heroMedia?.url || null);
  }, [selectedVariantId, heroMedia]);

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0];
  const displayImage = activeImage || 'https://via.placeholder.com/800';

  // --- Zoom logic ---
  const [isZooming, setIsZooming] = useState(false);
  const [bgPosition, setBgPosition] = useState('0% 0%');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBgPosition(`${x}% ${y}%`);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      <div 
        className="relative aspect-[4/5] md:aspect-square bg-secondary/20 rounded-3xl overflow-hidden flex items-center justify-center p-0 md:p-12"
      >
        <AnimatePresence mode="wait">
          {is3DMode ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full absolute inset-0 md:relative"
            >
              <Shoe3DViewer 
                modelUrl={product.model3d?.model_url} 
                materialConfig={{ 'laces': selectedVariant?.color_hex }} // Optional dynamic config
              />
              <button 
                onClick={() => setIs3DMode(false)}
                className="absolute top-6 right-6 bg-background/50 backdrop-blur-md p-3 rounded-full hover:bg-background transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : is360Mode ? (
            <motion.div
              key="360"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full absolute inset-0 md:relative"
            >
              <Shoe360Viewer frames={frameUrls} />
              <button 
                onClick={() => setIs360Mode(false)}
                className="absolute top-6 right-6 bg-background/50 backdrop-blur-md p-3 rounded-full hover:bg-background transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="2d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative group absolute inset-0 md:relative cursor-crosshair"
              ref={imageRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Normal Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={displayImage} 
                alt={product.name} 
                className={cn(
                  "w-full h-full object-cover md:object-contain mix-blend-multiply dark:mix-blend-normal transition-opacity duration-300",
                  isZooming ? "opacity-0" : "opacity-100"
                )} 
                fetchPriority="high"
                draggable={false}
              />

              {/* Zoomed Background */}
              {isZooming && (
                <div 
                  className="absolute inset-0 z-10 bg-no-repeat pointer-events-none rounded-3xl mix-blend-multiply dark:mix-blend-normal hidden md:block"
                  style={{
                    backgroundImage: `url(${displayImage})`,
                    backgroundPosition: bgPosition,
                    backgroundSize: '250%' // Zoom level
                  }}
                />
              )}
              
              {/* Toggle 3D Button */}
              {product.model3d && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIs3DMode(true); 
                    setIs360Mode(false); 
                  }}
                  className="absolute bottom-6 right-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:bg-primary/90 transition-transform hover:scale-105 shadow-xl z-20"
                >
                  <Maximize2 className="w-4 h-4" /> View in 3D
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {!is3DMode && !is360Mode && (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {has360 && (
            <button 
              onClick={() => setIs360Mode(true)}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-secondary/30 shrink-0 border-2 border-transparent hover:border-primary transition-colors flex flex-col items-center justify-center gap-2"
            >
              <Maximize2 className="w-6 h-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary text-center leading-tight">360&deg;<br/>View</span>
            </button>
          )}
          {galleryMedia.map((img) => (
            <button 
              key={img.id}
              onClick={() => setActiveImage(img.url)}
              className={cn(
                "w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-secondary/30 shrink-0 border-2 transition-colors",
                img.url === displayImage ? "border-primary" : "border-transparent hover:border-primary/50"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt_text || "thumbnail"} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      )}
      {is360Mode && (
        <div className="flex justify-center mt-4">
            <button 
              onClick={() => setIs360Mode(false)}
              className="bg-secondary/50 hover:bg-secondary px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Back to Images
            </button>
        </div>
      )}
    </div>
  );
}
