
export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}
