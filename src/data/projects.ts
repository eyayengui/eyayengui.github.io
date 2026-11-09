/**
 * Project catalogue. To add a project:
 *  1. Add an entry below (slug must be unique).
 *  2. Add its texts under `projects.items.<slug>` in src/i18n/en.json AND fr.json
 *     (title, category, short, description, features[], optional workflow[], role, deployment).
 *  3. Optionally drop screenshots in public/images/projects/ and reference them here.
 * Set `liveDemo: true` to also show the project in the "Explore My Work" gallery.
 */
export type ProjectCategory = 'web' | 'cloud';
export type DetailSection = 'workflow' | 'gallery' | 'architecture' | 'video' | 'role' | 'deployment';
export type ProjectIcon = 'brain' | 'flame' | 'server' | 'globe' | 'rocket' | 'heart' | 'building' | 'house' | 'plane' | 'car';

export interface Project {
  slug: string;
  categories: ProjectCategory[];
  tech: string[];
  icon: ProjectIcon;
  /** Main screenshot (relative to /public), e.g. 'images/projects/saldae/cover.webp' */
  image?: string;
  gallery?: string[];
  architecture?: string;
  /** mp4 path relative to /public, or a YouTube/Vimeo embed URL */
  video?: string;
  /** Still frame shown before the demo video plays (relative to /public) */
  poster?: string;
  /** Verified repository URL only */
  github?: string;
  /** Verified, working public URL only */
  live?: string;
  liveDemo?: boolean;
  sections: DetailSection[];
}

export const projects: Project[] = [
  {
    slug: 'intelligent-chaos-engineering',
    categories: ['cloud', 'web'],
    icon: 'flame',
    tech: ['Azure AKS', 'Kubernetes', 'Chaos Mesh', 'Python', 'MCP', 'LLM', 'Prometheus', 'Azure Monitor', 'Spring Boot', 'Angular'],
    // Frontend repo: https://github.com/eyayengui/chaos-agent-front
    github: 'https://github.com/eyayengui/chaos-agent-backend',
    video: 'videos/chaos-demo.mp4',
    poster: 'images/projects/chaos-poster.jpg',
    liveDemo: true,
    sections: ['workflow', 'video', 'architecture'],
  },
  {
    slug: 'openstack-cloud-infrastructure',
    categories: ['cloud'],
    icon: 'server',
    tech: ['OpenStack', 'Terraform', 'Ansible', 'Linux', 'Prometheus', 'Grafana'],
    sections: ['workflow', 'gallery', 'architecture'],
  },
  {
    slug: 'saldae-institute',
    categories: ['web', 'cloud'],
    icon: 'globe',
    tech: ['Angular', 'TypeScript', 'Spring Boot', 'Spring Security', 'MySQL', 'Flyway', 'Microsoft Azure'],
    live: 'https://www.saldae-institute.com/',
    video: 'videos/saldae-demo.mp4',
    poster: 'images/projects/saldae-poster.jpg',
    liveDemo: true,
    sections: ['video', 'role', 'deployment'],
  },
  {
    slug: 'edehn',
    categories: ['web'],
    icon: 'rocket',
    tech: ['Angular', 'TypeScript', 'Spring Boot', 'Spring Security', 'MySQL', 'Nginx', 'Linux VPS'],
    live: 'https://edehn.fr/',
    video: 'videos/edehn-demo.mp4',
    poster: 'images/projects/edehn-poster.jpg',
    liveDemo: true,
    sections: ['video', 'role', 'deployment'],
  },
  {
    slug: 'taxi-cross',
    categories: ['web'],
    icon: 'car',
    tech: ['Ionic', 'Angular', 'Capacitor', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Soketi (WebSockets)', 'Leaflet', 'Bootstrap', 'Apache', 'VPS'],
    video: 'videos/taxi-demo.mp4',
    poster: 'images/projects/taxi-poster.jpg',
    liveDemo: true,
    sections: ['workflow', 'video', 'role'],
  },
  {
    slug: 'ija-nahkiw',
    categories: ['web'],
    icon: 'heart',
    tech: ['Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL', 'Mercure', 'JavaScript', 'Bootstrap', 'Dompdf'],
    github: 'https://github.com/eyayengui/PI-Dev',
    sections: ['workflow', 'gallery', 'role'],
  },
  {
    slug: 'tp-foyer',
    categories: ['web'],
    icon: 'building',
    tech: ['Spring Boot', 'Java', 'Spring Data JPA', 'MySQL', 'Lombok', 'Maven'],
    github: 'https://github.com/eyayengui/springboot',
    sections: ['workflow', 'role'],
  },
  {
    slug: 'housing-soa',
    categories: ['web'],
    icon: 'house',
    tech: ['Java', 'JAX-RS', 'REST', 'SOA', 'Maven'],
    github: 'https://github.com/eyayengui/SOA',
    sections: [],
  },
  {
    slug: 'airport-management',
    categories: ['web'],
    icon: 'plane',
    tech: ['C#', '.NET', 'LINQ', 'OOP'],
    github: 'https://github.com/eyayengui/AireportManagement',
    sections: [],
  },
];

export const projectFilters: Array<'all' | ProjectCategory> = ['all', 'web', 'cloud'];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
