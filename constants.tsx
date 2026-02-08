
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
    title: 'Architecture Design', 
    description: 'Bespoke high-level system blueprints architected for mission-critical scalability and redundancy.', 
    icon: 'Cpu' 
  },
  { 
    title: 'Interface Engineering', 
    description: 'Development of low-latency, hyper-responsive frontends leveraging advanced React patterns and WebGL.', 
    icon: 'Layers' 
  },
  { 
    title: 'Distributed Systems', 
    description: 'Engineered backend infrastructures designed for fault tolerance and synchronized data integrity.', 
    icon: 'Database' 
  },
  { 
    title: 'Cloud Orchestration', 
    description: 'Automated CI/CD pipelines and serverless deployment strategies focused on zero-downtime performance.', 
    icon: 'Cloud' 
  },
  { 
    title: 'Protocol Engineering', 
    description: 'Custom API development and integration layers ensuring seamless communication between distributed nodes.', 
    icon: 'Zap' 
  },
  { 
    title: 'Security Logic', 
    description: 'Implementation of advanced encryption standards and rigorous security protocols to safeguard data assets.', 
    icon: 'Code' 
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
    title: 'A\'Harian Portal',
    category: 'Corporate Infrastructure',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    tags: ['Branding', 'Strategic UI', 'Optimization'],
    link: 'https://aharian.com'
  },
  {
    title: 'MSS Group BD',
    category: 'Industrial Enterprise',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2670',
    tags: ['Real-time Data', 'Resource Planning', 'Next.js'],
    link: 'https://mssgroupbd.com'
  },
  {
    title: 'Zaironx Mainframe',
    category: 'Studio Ecosystem',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672',
    tags: ['Web3', 'High-Speed API', 'Cloud'],
    link: 'https://zaironx.top'
  },
  {
    title: 'DPI Robotics Club',
    category: 'Educational Robotics Hub',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2670',
    tags: ['IoT Integration', 'Community', 'Tailwind'],
    link: 'https://dpiroboticsclub.com'
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
