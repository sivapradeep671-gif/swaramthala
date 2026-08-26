import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorHex(colorName: string): string {
  const map: Record<string, string> = {
    'Black': '#000000',
    'White': '#ffffff',
    'Red': '#ef4444',
    'Blue': '#3b82f6',
    'Green': '#22c55e',
    'Yellow': '#eab308',
    'Orange': '#f97316',
    'Purple': '#a855f7',
    'Pink': '#ec4899',
    'Brown': '#78350f',
    'Grey': '#6b7280',
    'Silver': '#9ca3af',
    'Gold': '#eab308',
    'Navy': '#1e3a8a',
    'Olive': '#4d7c0f',
    'Teal': '#14b8a6',
    'Maroon': '#7f1d1d',
    'Beige': '#f5f5dc',
    'Multi': 'linear-gradient(45deg, red, blue, green)',
  };
  return map[colorName] || '#cccccc';
}
