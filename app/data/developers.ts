export type Seniority = "Junior" | "Mid" | "Senior" | "Staff" | "Principal";

export type Developer = {
  id: string;
  name: string;
  role: string;
  seniority: Seniority;
  skills: string[];
  rating: number;
  earnedUsd: number;
  baseRateUsd: number;
  currentBidUsd: number;
  location: string;
  verified: boolean;
  avatar: string;
  gradient: string;
  auctionEndsAt: number;
};

const HOUR = 60 * 60 * 1000;

export const developers: Developer[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Product Designer",
    seniority: "Senior",
    skills: ["Figma", "Design Systems", "Prototyping", "Research"],
    rating: 5,
    earnedUsd: 48000,
    baseRateUsd: 40,
    currentBidUsd: 52,
    location: "New York, NY",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-indigo-400 via-pink-400 to-violet-500",
    auctionEndsAt: Date.now() + 1.5 * HOUR,
  },
  {
    id: "marcus-oduya",
    name: "Marcus Oduya",
    role: "Senior Rust Engineer",
    seniority: "Staff",
    skills: ["Rust", "Solana", "Systems", "Cryptography"],
    rating: 4.9,
    earnedUsd: 162000,
    baseRateUsd: 120,
    currentBidUsd: 148,
    location: "Berlin, DE",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-amber-400 via-rose-500 to-fuchsia-600",
    auctionEndsAt: Date.now() + 3 * HOUR,
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    role: "Full-stack Engineer",
    seniority: "Senior",
    skills: ["TypeScript", "Next.js", "Postgres", "AWS"],
    rating: 4.8,
    earnedUsd: 91000,
    baseRateUsd: 85,
    currentBidUsd: 104,
    location: "Bengaluru, IN",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-sky-400 via-indigo-500 to-emerald-400",
    auctionEndsAt: Date.now() + 0.75 * HOUR,
  },
  {
    id: "leo-garcia",
    name: "Leo Garcia",
    role: "iOS Engineer",
    seniority: "Mid",
    skills: ["Swift", "SwiftUI", "Metal", "ARKit"],
    rating: 4.7,
    earnedUsd: 38000,
    baseRateUsd: 70,
    currentBidUsd: 78,
    location: "Mexico City, MX",
    verified: false,
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-emerald-400 via-cyan-500 to-indigo-500",
    auctionEndsAt: Date.now() + 4.25 * HOUR,
  },
  {
    id: "naomi-kwan",
    name: "Naomi Kwan",
    role: "ML Researcher",
    seniority: "Principal",
    skills: ["PyTorch", "LLMs", "Distributed", "CUDA"],
    rating: 5,
    earnedUsd: 245000,
    baseRateUsd: 180,
    currentBidUsd: 215,
    location: "San Francisco, CA",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-violet-500 via-fuchsia-500 to-orange-400",
    auctionEndsAt: Date.now() + 2.25 * HOUR,
  },
  {
    id: "tom-becker",
    name: "Tom Becker",
    role: "DevOps / SRE",
    seniority: "Senior",
    skills: ["Kubernetes", "Terraform", "Go", "Observability"],
    rating: 4.6,
    earnedUsd: 72000,
    baseRateUsd: 95,
    currentBidUsd: 110,
    location: "Amsterdam, NL",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=faces",
    gradient: "from-rose-400 via-purple-500 to-sky-500",
    auctionEndsAt: Date.now() + 5.5 * HOUR,
  },
];
