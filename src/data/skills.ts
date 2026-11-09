import { Brain, Cloud, Code2, MonitorSmartphone, Server, Wrench, type LucideIcon } from 'lucide-react';

/** Group titles/descriptions live in i18n under `skills.groups.<id>`. Item names are translated via `skills.terms` when needed. */
export interface SkillGroup {
  id: 'frontend' | 'backend' | 'cloud' | 'infra' | 'data' | 'tools';
  icon: LucideIcon;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    icon: MonitorSmartphone,
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Ionic', 'Capacitor'],
  },
  {
    id: 'backend',
    icon: Code2,
    items: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'Symfony', 'Python', 'REST APIs', 'WebSockets'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    items: [
      'Microsoft Azure',
      'Azure Kubernetes Service (AKS)',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'CI/CD',
      'Terraform',
      'Ansible',
      'Linux',
      'Azure Container Registry',
    ],
  },
  {
    id: 'infra',
    icon: Server,
    items: ['OpenStack', 'Prometheus', 'Grafana', 'Azure Monitor', 'Kubernetes Monitoring', 'Chaos Mesh'],
  },
  {
    id: 'data',
    icon: Brain,
    items: ['MySQL', 'SQL', 'Python', 'Big Data', 'Data Analysis'],
  },
  {
    id: 'tools',
    icon: Wrench,
    items: ['Git', 'GitHub', 'VS Code', 'Docker Desktop', 'Postman', 'XAMPP', 'UML', 'Scrum'],
  },
];
