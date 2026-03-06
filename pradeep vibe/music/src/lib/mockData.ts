// ─── Mock Data for Swaramthala ───────────────────────────────────────
import { LucideIcon, Music, Drum, Mic, Ticket, Users, Box, Headphones, Search, MessageCircle } from 'lucide-react';

export type Category =
  | 'guitar' | 'keys' | 'drums' | 'bass'
  | 'winds' | 'strings' | 'studio' | 'folk'
  | 'concert' | 'musician';

export type Condition = 'mint' | 'good' | 'fair' | 'repair';
export type ListingType = 'sale' | 'rent' | 'trade' | 'event' | 'service';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  city: string;
  verified: boolean;
  responseRate: number;
  memberSince: string;
  kycStatus: string;
}

export interface Listing {
  id: string;
  title: string;
  brand: string;
  price: number;
  rentPrice?: number;
  category: Category;
  condition: Condition;
  type: ListingType;
  images: string[];
  description: string;
  seller: Seller;
  location: string;
  views: number;
  favorites: number;
  createdAt: string;
  hasSoundDemo: boolean;
  isNew: boolean;
  isPromoted?: boolean;
  isFavorited?: boolean;
  yearMade?: number;
  eventDate?: string;
  tags: string[];
  videoUrl?: string;
  audioUrl?: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: LucideIcon;
  count: number;
  cssClass: string;
  description: string;
  image: string;
}

// ─── Sellers ────────────────────────────────────────────────────────
export const SELLERS: Seller[] = [
  { id: 's1', name: 'Karthik Rajan', avatar: 'KR', rating: 4.9, reviewCount: 147, city: 'Chennai', verified: true, responseRate: 98, memberSince: 'Jan 2023', kycStatus: 'verified' },
  { id: 's2', name: 'Priya Sundaram', avatar: 'PS', rating: 4.7, reviewCount: 83, city: 'Coimbatore', verified: true, responseRate: 94, memberSince: 'Mar 2023', kycStatus: 'verified' },
  { id: 's3', name: 'Arjun Beats', avatar: 'AB', rating: 4.8, reviewCount: 220, city: 'Bangalore', verified: true, responseRate: 99, memberSince: 'Oct 2022', kycStatus: 'verified' },
  { id: 's4', name: 'Music World', avatar: 'MW', rating: 4.6, reviewCount: 512, city: 'Chennai', verified: true, responseRate: 97, memberSince: 'Jun 2021', kycStatus: 'verified' },
  { id: 's5', name: 'Hari Kumar', avatar: 'HK', rating: 4.5, reviewCount: 38, city: 'Madurai', verified: false, responseRate: 88, memberSince: 'Jul 2024', kycStatus: 'none' },
  { id: 's6', name: 'ToneWorks Studio', avatar: 'TW', rating: 4.9, reviewCount: 301, city: 'Hyderabad', verified: true, responseRate: 100, memberSince: 'Feb 2022', kycStatus: 'verified' },
];

// ─── Categories ──────────────────────────────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: 'guitar', label: 'Guitars', icon: Music, count: 1842, cssClass: 'cat-guitar', description: 'Acoustic, electric, classical', image: '/images/categories/cat_guitar.png' },
  { id: 'keys', label: 'Keyboards', icon: Box, count: 934, cssClass: 'cat-keys', description: 'Pianos, synths, organs', image: '/images/categories/cat_keys.png' },
  { id: 'drums', label: 'Drums & Perc.', icon: Drum, count: 673, cssClass: 'cat-drums', description: 'Drum kits, djembe, tabla', image: '/images/categories/cat_drums.png' },
  { id: 'bass', label: 'Bass Guitars', icon: Music, count: 412, cssClass: 'cat-bass', description: 'Electric & acoustic bass', image: '/images/categories/cat_bass.png' },
  { id: 'winds', label: 'Wind & Brass', icon: Mic, count: 329, cssClass: 'cat-winds', description: 'Flute, trumpet, saxophone', image: '/images/categories/cat_winds.png' },
  { id: 'strings', label: 'Strings', icon: Music, count: 558, cssClass: 'cat-strings', description: 'Violin, cello, sitar, veena', image: '/images/categories/cat_strings.png' },
  { id: 'studio', label: 'Studio Gear', icon: Headphones, count: 1107, cssClass: 'cat-studio', description: 'Mics, interfaces, monitors', image: '/images/categories/cat_studio.png' },
  { id: 'folk', label: 'Folk & World', icon: Drum, count: 287, cssClass: 'cat-folk', description: 'Mridangam, harmonium, etc.', image: '/images/categories/cat_folk.png' },
  { id: 'concert', label: 'Concerts', icon: Ticket, count: 42, cssClass: 'cat-studio', description: 'Live shows, events, tickets', image: '/images/categories/cat_concert.png' },
  { id: 'musician', label: 'Musicians', icon: Users, count: 128, cssClass: 'cat-strings', description: 'Hire for gigs, recording', image: '/images/categories/cat_musicians.png' },
];

// ─── Listings ────────────────────────────────────────────────────────
export const LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Fender Player Stratocaster — Sunburst',
    brand: 'Fender',
    price: 62000,
    category: 'guitar',
    condition: 'good',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80&w=800'],
    description: 'Barely used Fender Player Strat in classic 3‑color sunburst. Swapped to D\'Addario 10s. Gig bag included. Original bill available.',
    seller: SELLERS[0],
    location: 'Chennai, TN',
    views: 412,
    favorites: 38,
    createdAt: '2025-02-10',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2022,
    tags: ['fender', 'stratocaster', 'electric', 'sunburst'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audioUrl: '/audio/strat-demo.mp3'
  },
  {
    id: 'l2',
    title: 'Roland FP-30X Digital Piano — White',
    brand: 'Roland',
    price: 55000,
    rentPrice: 3500,
    category: 'keys',
    condition: 'mint',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800'],
    description: 'Roland FP-30X in pristine condition. 88 keys, weighted, Bluetooth. Original box, sustain pedal, and power adapter included.',
    seller: SELLERS[1],
    location: 'Coimbatore, TN',
    views: 289,
    favorites: 52,
    createdAt: '2025-02-14',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2023,
    tags: ['roland', 'digital piano', 'fp30x', 'weighted'],
  },
  {
    id: 'l3',
    title: 'Pearl Export 5-Piece Drum Kit',
    brand: 'Pearl',
    price: 48000,
    rentPrice: 4000,
    category: 'drums',
    condition: 'good',
    type: 'rent',
    images: ['https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800'],
    description: 'Pearl Export in jet black wrap. 22" kick, 10"/12" toms, 14" floor tom, 14" snare. Zildjian AAX cymbals included. Excellent for gigging.',
    seller: SELLERS[2],
    location: 'Bangalore, KA',
    views: 633,
    favorites: 71,
    createdAt: '2025-02-08',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2021,
    tags: ['pearl', 'drum kit', 'export', 'zildjian'],
    videoUrl: 'https://vimeo.com/148751763'
  },
  {
    id: 'l4',
    title: 'Yamaha MODX6+ Synthesizer',
    brand: 'Yamaha',
    price: 89000,
    category: 'keys',
    condition: 'mint',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?auto=format&fit=crop&q=80&w=800'],
    description: 'MODX6+ with FM-X + AWM2 engines. 61 semi-weighted keys. Barely played — studio use only. Includes official carry bag.',
    seller: SELLERS[5],
    location: 'Hyderabad, TS',
    views: 178,
    favorites: 29,
    createdAt: '2025-02-18',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2023,
    tags: ['yamaha', 'modx', 'synthesizer', 'fm'],
  },
  {
    id: 'l5',
    title: 'Rode NT1 Condenser Microphone',
    brand: 'Rode',
    price: 24500,
    category: 'studio',
    condition: 'mint',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'],
    description: 'Rode NT1 with shockmount, pop filter, XLR cable. Ultra-low noise. Perfect for vocals, acoustic guitar. Box included.',
    seller: SELLERS[3],
    location: 'Chennai, TN',
    views: 521,
    favorites: 87,
    createdAt: '2025-02-20',
    hasSoundDemo: false,
    isNew: false,
    yearMade: 2022,
    tags: ['rode', 'microphone', 'condenser', 'nt1', 'vocal'],
  },
  {
    id: 'l6',
    title: 'Gibson Les Paul Standard \u201960s — Iced Tea',
    brand: 'Gibson',
    price: 195000,
    category: 'guitar',
    condition: 'mint',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1550985543-f47f38aeea53?auto=format&fit=crop&q=80&w=800'],
    description: 'US-made Les Paul Standard \u201960s slim-taper neck, iced tea burst. Played twice. Comes with original hardshell case.',
    seller: SELLERS[3],
    location: 'Chennai, TN',
    views: 1023,
    favorites: 154,
    createdAt: '2025-01-28',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2023,
    tags: ['gibson', 'les paul', 'standard', 'usa'],
  },
  {
    id: 'l7',
    title: 'Focusrite Scarlett 2i2 (4th Gen)',
    brand: 'Focusrite',
    price: 11500,
    category: 'studio',
    condition: 'mint',
    type: 'sale',
    images: ['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&q=80&w=800'],
    description: 'Scarlett 2i2 4th gen, bought 3 months ago. 2 combo inputs, Air mode, USB-C. Box and cables included.',
    seller: SELLERS[4],
    location: 'Madurai, TN',
    views: 743,
    favorites: 112,
    createdAt: '2025-02-22',
    hasSoundDemo: false,
    isNew: false,
    yearMade: 2024,
    tags: ['focusrite', 'scarlett', '2i2', 'audio interface'],
  },
  {
    id: 'l8',
    title: 'Ibanez SR500E Premium Bass — Dragon Eye Burst',
    brand: 'Ibanez',
    price: 52000,
    category: 'bass',
    condition: 'good',
    type: 'trade',
    images: ['https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&q=80&w=800'],
    description: 'SR500E Premium active bass. Bartolini pickups, 3‑band EQ. Will trade for a good acoustic guitar or studio monitor pair.',
    seller: SELLERS[0],
    location: 'Chennai, TN',
    views: 304,
    favorites: 44,
    createdAt: '2025-02-15',
    hasSoundDemo: true,
    isNew: false,
    yearMade: 2021,
    tags: ['ibanez', 'bass', 'sr500', 'active', 'trade'],
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────
export const REVIEWS = [
  { id: 'r1', listingId: 'l1', reviewer: 'Vikram S.', rating: 5, text: 'Guitar was exactly as described. Packed super well, arrived in perfect condition. Karthik was very responsive!', date: '2025-02-11', helpful: 12 },
  { id: 'r2', listingId: 'l1', reviewer: 'Meena R.', rating: 4, text: 'Great deal on a fantastic guitar. Minor scratch on the headstock not shown in photos, but still good value.', date: '2025-01-30', helpful: 7 },
  { id: 'r3', listingId: 'l2', reviewer: 'Deepak M.', rating: 5, text: 'Roland FP-30X is brilliant. Priya answered all my 10 questions patiently 😄 Smooth transaction!', date: '2025-02-15', helpful: 19 },
];

// ─── Community Posts ──────────────────────────────────────────────────
export const COMMUNITY_POSTS = [
  { id: 'p1', type: 'listing', user: SELLERS[0], content: 'Just listed my Strat! Reluctant sale, moving to apartments 😢', listingId: 'l1', likes: 34, comments: 12, time: '2h ago' },
  { id: 'p2', type: 'event', user: SELLERS[1], content: '🎵 Jam session this Saturday at Phoenix Mall rooftop, Coimbatore! Bring your instruments. All genres welcome.', likes: 89, comments: 41, time: '5h ago' },
  { id: 'p3', type: 'trade', user: SELLERS[3], content: 'Looking to swap: Focusrite Scarlett Solo for a good condenser mic in Chennai. Anyone?', likes: 21, comments: 8, time: '1d ago' },
  { id: 'p4', type: 'tip', user: SELLERS[5], content: '🎹 Pro tip: Before buying a digital piano online, always check the key action in person. Cheap ones feel like typing on a laptop!', likes: 143, comments: 55, time: '2d ago' },
];

// ─── How It Works Steps ───────────────────────────────────────────────
export const HOW_IT_WORKS = [
  { step: '01', icon: Search, title: 'Discover', desc: 'Search thousands of instruments or request what you need.' },
  { step: '02', icon: MessageCircle, title: 'Connect', desc: 'Chat directly with verified sellers to negotiate or ask questions.' },
  { step: '03', icon: Music, title: 'Play', desc: 'Pay securely via UPI or Card, and get your instrument delivered.' },
];

// ─── Stats ────────────────────────────────────────────────────────────
export const STATS = [
  { value: '25,000+', label: 'Instruments Listed' },
  { value: '18,000+', label: 'Happy Musicians' },
  { value: '₹4.2 Cr', label: 'Transactions Completed' },
  { value: '120+', label: 'Cities in India' },
];

// Helper: format Indian price
export const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
