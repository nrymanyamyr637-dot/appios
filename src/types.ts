export interface Project {
  id: string;
  title: string;
  category: 'robotics' | 'embedded' | 'android' | 'unity' | 'automotive';
  shortDesc: string;
  heroImage: string;
  goal: string;
  hardware: string[];
  software: string[];
  techStack: string[];
  architecture: string;
  pcbDetails: string;
  codeSnippet: string;
  codeLang: string;
  challenges: string[];
  futureDevelopment: string[];
  team?: string;
  status: 'completed' | 'in-progress' | 'rnd';
  highlightMetric?: {
    label: string;
    value: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: 'embedded' | 'software' | 'hardware' | 'robotics';
  level: number; // 0 to 100
  levelLabel: string;
  iconName: string;
  shortDesc: string;
  tags: string[];
}

export interface TimelineMilestone {
  step: number;
  title: string;
  enTitle: string;
  discipline: string;
  description: string;
  achievements: string[];
}

export interface QuickTechCard {
  id: string;
  title: string;
  enTitle: string;
  icon: string;
  desc: string;
  categoryRef: 'robotics' | 'embedded' | 'android' | 'unity' | 'automotive' | 'all';
  accentColor: string;
}
