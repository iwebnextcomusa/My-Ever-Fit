export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string[];
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}

export interface Package {
  id: string;
  title: string;
  price: string;
  billing: string;
  popular: boolean;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  beforeImg: string;
  afterImg: string;
  stat: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "membership" | "training" | "nutrition" | "scheduling";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}
