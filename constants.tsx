
import { NavItem, Service, Project, Skill, BlogPost } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Journal', href: '#journal' },
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
];

export const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: 'Frontend Modules',
    items: [
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React/Next.js', level: 92 },
    ]
  },
  {
    category: 'Backend Modules',
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
    tags: ['Real-Time Data', 'Resource Planning', 'Next.js'],
    link: 'https://mssgroupbd.com'
  },
  {
    title: 'Zaironx Mainframe',
    category: 'Studio Ecosystem',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672',
    tags: ['Web3', 'High-Speed API', 'Cloud'],
    link: '#'
  },
  {
    title: 'DPI Robotics Club',
    category: 'Educational Robotics Hub',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=2669',
    tags: ['IoT Integration', 'Community', 'Tailwind'],
    link: '#'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Distributed Intelligence',
    slug: 'future-of-distributed-intelligence',
    metaDescription: 'An in-depth look at micro-frontend architectures and planetary-scale data handling.',
    keywords: ['architecture', 'micro-frontends', 'cloud'],
    excerpt: 'Exploring how micro-frontend architectures are evolving to handle planetary-scale data loads.',
    content: 'Distributed intelligence is no longer a luxury but a requirement for modern enterprise systems. In this deep dive, we look at the evolution of serverless orchestration and the role of Edge Computing in reducing latency to sub-10ms ranges across global clusters.',
    date: 'OCT 24, 2024',
    author: 'Zaironx Admin',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670',
    tags: ['Architecture', 'Cloud']
  }
];

export const STATS = [
  { label: 'Websites Built', value: '10+' },
  { label: 'Industries Served', value: '10+' },
  { label: 'Global Experience', value: '3+' },
  { label: 'Success Rate', value: '100%' },
];
