"use client";

import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { ReviewForm } from './ReviewForm';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
  isAuthenticated: boolean;
}

export function ReviewSection({ productId, initialReviews, isAuthenticated }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isWriting, setIsWriting] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0;

  const handleReviewSuccess = (newReview: Review) => {
    // Optimistically update the list
    // In a real app we might fetch the profile details again or mock them
    setReviews([{ ...newReview, profiles: { first_name: 'You', last_name: '', avatar_url: '' } }, ...reviews]);
    setIsWriting(false);
  };

  return (
    <div className="py-12 border-t border-border mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-heading font-black uppercase tracking-tighter mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} 
                />
              ))}
            </div>
            <span className="font-bold text-lg">{averageRating.toFixed(1)} out of 5</span>
            <span className="text-muted-foreground uppercase tracking-widest text-sm font-bold border-l border-border pl-4">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        </div>

        {isAuthenticated ? (
          !isWriting && (
            <button 
              onClick={() => setIsWriting(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
            >
              Write a Review
            </button>
          )
        ) : (
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
            Log in to write a review
          </p>
        )}
      </div>

      <AnimatePresence>
        {isWriting && (
          <div className="mb-10">
            <ReviewForm 
              productId={productId} 
              onSuccess={handleReviewSuccess} 
              onCancel={() => setIsWriting(false)} 
            />
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-secondary/10 rounded-3xl border border-border">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-bold uppercase tracking-widest text-lg mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">Be the first to share your thoughts on this product.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="p-6 rounded-2xl bg-secondary/10 border border-border flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold uppercase overflow-hidden border border-border">
                    {review.profiles?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={review.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      (review.profiles?.first_name?.[0] || 'A')
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">
                      {review.profiles?.first_name || 'Anonymous'} {review.profiles?.last_name || ''}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-3 h-3 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} 
                    />
                  ))}
                </div>
              </div>
              
              {review.comment && (
                <p className="text-sm leading-relaxed text-foreground/80 mt-2">
                  &quot;{review.comment}&quot;
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
