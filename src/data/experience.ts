/**
 * Professional experience timeline.
 * Texts (role, description, highlights[]) live in i18n under `experience.items.<id>`.
 * Only fill `period` / `location` with accurate information.
 */
export interface Experience {
  id: string;
  company: string;
  /** e.g. 'Feb 2025 — Jul 2025' — leave undefined if not confirmed */
  period?: string;
  location?: string;
  tech: string[];
  /** Links the entry to a project detail page */
  projectSlug?: string;
}

export const experiences: Experience[] = [
  {
    id: 'insomea',
    company: 'INSOMEA',
    tech: ['Azure AKS', 'Kubernetes', 'Chaos Mesh', 'Prometheus', 'Spring Boot', 'Angular', 'LLM', 'MCP'],
    projectSlug: 'intelligent-chaos-engineering',
  },
];
