"use client";

import React, { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { motion } from 'framer-motion';

interface ReviewFormProps {
  productId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (review: any) => void;
  onCancel: () => void;
}

export function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      onSuccess(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit} 
      className="bg-secondary/20 p-6 rounded-2xl border border-border flex flex-col gap-6"
    >
      <div>
        <h3 className="font-bold uppercase tracking-widest text-lg mb-2">Write a Review</h3>
        <p className="text-sm text-muted-foreground">Share your thoughts on this product.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-8 h-8 ${
                  (hoverRating || rating) >= star ? 'fill-primary text-primary' : 'text-muted-foreground'
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Comment (Optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike?"
          className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:border-primary resize-none"
        />
      </div>

      {error && (
        <div className="text-destructive text-sm font-bold bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3 font-bold uppercase tracking-widest text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <MagneticButton
          as="button"
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-xl py-3 flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
        </MagneticButton>
      </div>
    </motion.form>
  );
}
