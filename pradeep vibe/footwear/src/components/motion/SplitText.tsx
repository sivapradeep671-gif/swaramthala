/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  type?: "chars" | "words" | "lines";
  className?: string;
  delay?: number;
}

export function SplitText({ text, type = "words", className = "", delay = 0 }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");
  const chars = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container as any}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {type === "words" &&
        words.map((word, index) => (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em", display: "inline-block" }}
            key={index}
          >
            {word}
          </motion.span>
        ))}
        
      {type === "chars" &&
        chars.map((char, index) => (
          <motion.span
            variants={child}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            key={index}
          >
            {char}
          </motion.span>
        ))}
    </motion.div>
  );
}
