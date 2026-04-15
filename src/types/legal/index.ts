import { LucideIcon } from "lucide-react";

export interface PolicyItem {
  clause: string;
  content: React.ReactNode;
}

export interface PolicySection {
  article: number;
  icon: LucideIcon;
  title: string;
  items?: PolicyItem[];
  paragraph?: React.ReactNode;
}
