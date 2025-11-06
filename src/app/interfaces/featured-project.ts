import { IProjectResource } from './project-resource';

export interface IFeaturedProject {
  // Dados do lado esquerdo (Conteúdo livre)
  title: string;
  content: string;
  resourcesTitle: string;
  resources: IProjectResource[];

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
