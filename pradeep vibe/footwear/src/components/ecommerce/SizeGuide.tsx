"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  // A standard generic size guide
  const sizeData = [
    { uk: '5', us_men: '6', us_women: '7', eu: '39', cm: '24.5' },
    { uk: '6', us_men: '7', us_women: '8', eu: '40', cm: '25' },
    { uk: '7', us_men: '8', us_women: '9', eu: '41', cm: '26' },
    { uk: '8', us_men: '9', us_women: '10', eu: '42.5', cm: '27' },
    { uk: '9', us_men: '10', us_women: '11', eu: '44', cm: '28' },
    { uk: '10', us_men: '11', us_women: '12', eu: '45', cm: '29' },
    { uk: '11', us_men: '12', us_women: '13', eu: '46', cm: '30' },
    { uk: '12', us_men: '13', us_women: '14', eu: '47.5', cm: '31' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex justify-center items-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-3xl bg-secondary/20 border border-border p-6 md:p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground p-2 bg-background/50 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-2">Size Guide</h2>
            <p className="text-muted-foreground mb-8">All sizes shown on the store are in UK sizing unless otherwise specified.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 font-bold tracking-widest uppercase text-sm">UK</th>
                    <th className="py-4 px-4 font-bold tracking-widest uppercase text-sm text-muted-foreground">US (M)</th>
                    <th className="py-4 px-4 font-bold tracking-widest uppercase text-sm text-muted-foreground">US (W)</th>
                    <th className="py-4 px-4 font-bold tracking-widest uppercase text-sm text-muted-foreground">EU</th>
                    <th className="py-4 px-4 font-bold tracking-widest uppercase text-sm text-muted-foreground">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.uk} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-lg">{row.uk}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.us_men}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.us_women}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.eu}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h4 className="font-bold uppercase tracking-widest text-primary mb-2 text-sm">How to measure</h4>
              <p className="text-sm text-muted-foreground">
                Place a piece of paper on the floor against a wall. Stand on the paper with your heel against the wall. Mark the longest part of your foot on the paper. Measure the distance from the edge of the paper to the mark in centimeters.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
