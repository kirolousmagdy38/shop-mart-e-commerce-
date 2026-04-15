import { LucideIcon } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface HelpCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  faqs: FAQ[];
}
