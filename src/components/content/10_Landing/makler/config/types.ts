export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  propertyType?: string;
}

export interface FeaturedTestimonial {
  quote: string;
  highlight: string;
  name: string;
  location: string;
  propertyType: string;
  resultAmount?: string;
  resultDays?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MarketStat {
  value: string;
  label: string;
  description: string;
}

export interface CityConfig {
  heroSubheading?: string;
  verkaeuferVermittelt: string;
  marketStats: MarketStat[];
  featuredTestimonial: FeaturedTestimonial;
  testimonials: Testimonial[];
  faqOverrides?: FaqItem[];
}
