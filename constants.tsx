
import React from 'react';
import { 
  Code, 
  Layers, 
  Database, 
  Cloud, 
  Zap, 
  Palette, 
  Cpu 
} from 'lucide-react';
import { NavItem, Service, Project, Skill, Certificate } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  { 
    title: 'Web Development', 
    description: 'Bespoke, scalable web solutions tailored for modern business needs.', 
    icon: 'Code' 
  },
  { 
    title: 'Frontend Engineering', 
    description: 'Building immersive, high-performance interfaces with React and Next.js.', 
    icon: 'Palette' 
  },
  { 
    title: 'Backend Development', 
    description: 'Robust server-side logic and API architectures designed for stability.', 
    icon: 'Database' 
  },
  { 
    title: 'Firebase & Cloud', 
    description: 'Serverless infrastructures and cloud functions for maximum agility.', 
    icon: 'Cloud' 
  },
  { 
    title: 'Full-Stack Apps', 
    description: 'End-to-end application development from database to final UI.', 
    icon: 'Layers' 
  },
  { 
    title: 'UI/UX Engineering', 
    description: 'Design-driven engineering ensuring a pixel-perfect user experience.', 
    icon: 'Cpu' 
  },
];

export const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React/Next.js', level: 92 },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', level: 80 },
      { name: 'Firebase', level: 88 },
      { name: 'MySQL', level: 82 },
      { name: 'REST APIs', level: 90 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'AI Data Nexus',
    category: 'SaaS Platform',
    image: 'https://picsum.photos/seed/z1/800/600',
    tags: ['React', 'Firebase', 'Tailwind']
  },
  {
    title: 'Quantum Dashboard',
    category: 'Enterprise UI',
    image: 'https://picsum.photos/seed/z2/800/600',
    tags: ['Next.js', 'Framer Motion', 'D3.js']
  },
  {
    title: 'Stellar Agency Website',
    category: 'Creative Portfolio',
    image: 'https://picsum.photos/seed/z3/800/600',
    tags: ['Three.js', 'GSAP', 'TypeScript']
  },
  {
    title: 'Nebula E-commerce',
    category: 'E-commerce',
    image: 'https://picsum.photos/seed/z4/800/600',
    tags: ['Redux', 'Node.js', 'MySQL']
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Google Cloud Professional',
    issuer: 'Google',
    date: '2024',
    image: 'https://picsum.photos/seed/cert1/400/300'
  },
  {
    title: 'Full Stack Development',
    issuer: 'Coursera (Google Certified)',
    date: '2023',
    image: 'https://picsum.photos/seed/cert2/400/300'
  },
  {
    title: 'Advanced React Architecture',
    issuer: 'Frontend Masters',
    date: '2024',
    image: 'https://picsum.photos/seed/cert3/400/300'
  }
];

export const STATS = [
  { label: 'Websites Built', value: '10+' },
  { label: 'Industries Served', value: '10+' },
  { label: 'Global Experience', value: '3+' },
  { label: 'Success Rate', value: '100%' },
];
