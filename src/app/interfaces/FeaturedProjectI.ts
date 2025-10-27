import { ProjectResourceI } from './ProjectResourceI';

export interface FeaturedProjectI {
  // Dados do lado esquerdo (Conteúdo livre)
  title: string;
  content: string;
  resourcesTitle: string;
  resources: ProjectResourceI[];

  technologies: string[];

  // Dados do lado direito (Card Técnico)
  repoName: string;
  username: string;
  description: string;
  stars: number;
  language: string;
  date: string;
  githubUrl: string;
  imageUrl: string;
}
