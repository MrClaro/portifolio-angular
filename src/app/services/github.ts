import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface GitHubProject {
  repoName: string;
  username: string;
  description: string;
  stars: number;
  language: string;
  date: string;
  githubUrl: string;
  imageUrl: string;
  topics?: string[];
  forks?: number;
  watchers?: number;
  openIssues?: number;
  updatedAt?: number;
  isPriority?: boolean;
  priorityIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly githubApiUrl = 'https://api.github.com';
  private readonly priorityUsers = ['MrClaro', 'UniSoftHub'];
  private readonly priorityRepos = [
    { username: 'MrClaro', repo: 'challenge-forum-hub' },
    { username: 'MrClaro', repo: 'desafio-angular-na-pratica' },
    { username: 'MrClaro', repo: 'challenge-literalura' },
    { username: 'MrClaro', repo: 'fliperama-vai-na-web' },
    { username: 'UniSoftHub', repo: 'connecthub-backend' },
    { username: 'UniSoftHub', repo: 'connecthub-frontend' },
  ];

  // Cache de todos os projetos
  private allProjectsCache$ = new BehaviorSubject<GitHubProject[]>([]);
  public allProjects$ = this.allProjectsCache$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Busca APENAS os 3 projetos em destaque (featured)
   */
  getFeaturedProjects(): Observable<GitHubProject[]> {
    // Pega os 3 primeiros repos prioritários
    const featuredRepos = this.priorityRepos.slice(0, 3);

    const requests = featuredRepos.map((pr) =>
      this.getRepository(pr.username, pr.repo).pipe(
        map((repo) => ({
          ...repo,
          isPriority: true,
          priorityIndex: this.priorityRepos.findIndex(
            (p) => p.username === pr.username && p.repo === pr.repo,
          ),
        })),
        catchError((error) => {
          console.warn(`⚠️ Repo em destaque não encontrado: ${pr.username}/${pr.repo}`, error);
          return of(null);
        }),
      ),
    );

    return forkJoin(requests).pipe(
      map((repos) => {
        const validRepos = repos.filter((repo) => repo !== null) as GitHubProject[];
        return validRepos.sort((a, b) => (a.priorityIndex || 0) - (b.priorityIndex || 0));
      }),
      tap((projects) => console.log('✨ Projetos em destaque carregados:', projects.length)),
      catchError((error) => {
        console.error('❌ Erro ao buscar projetos em destaque:', error);
        return of([]);
      }),
    );
  }

  /**
   * Busca TODOS os projetos (para a página de listagem completa)
   */
  getAllProjects(): Observable<GitHubProject[]> {
    // Se já tem cache, retorna
    if (this.allProjectsCache$.value.length > 0) {
      console.log('📦 Usando cache de projetos');
      return of(this.allProjectsCache$.value);
    }

    // 1. Busca os repositórios prioritários DIRETAMENTE
    const priorityRequests = this.priorityRepos.map((pr) =>
      this.getRepository(pr.username, pr.repo).pipe(
        map((repo) => ({
          ...repo,
          isPriority: true,
          priorityIndex: this.priorityRepos.findIndex(
            (p) => p.username === pr.username && p.repo === pr.repo,
          ),
        })),
        catchError((error) => {
          console.warn(`⚠️ Repo prioritário não encontrado: ${pr.username}/${pr.repo}`, error);
          return of(null);
        }),
      ),
    );

    // 2. Busca outros repos dos usuários
    const otherReposRequests = this.priorityUsers.map((username) =>
      this.getRepositoriesFromUser(username, 50),
    ); // Busca mais repos

    // 3. Combina todas as requisições
    return forkJoin([forkJoin(priorityRequests), forkJoin(otherReposRequests)]).pipe(
      map(([priorityRepos, otherReposArrays]) => {
        // Remove nulls dos repos prioritários
        const validPriorityRepos = priorityRepos.filter((repo) => repo !== null) as GitHubProject[];

        // Flatten dos outros repos
        const otherRepos = otherReposArrays.flat();

        // Remove duplicatas
        const priorityRepoKeys = validPriorityRepos.map((r) => `${r.username}/${r.repoName}`);
        const uniqueOtherRepos = otherRepos.filter(
          (repo) => !priorityRepoKeys.includes(`${repo.username}/${repo.repoName}`),
        );

        // Ordena outros repos por stars e data
        const sortedOtherRepos = uniqueOtherRepos.sort((a, b) => {
          if (b.stars !== a.stars) return b.stars - a.stars;
          return (b.updatedAt || 0) - (a.updatedAt || 0);
        });

        // Ordena repos prioritários pela ordem definida
        const sortedPriorityRepos = validPriorityRepos.sort(
          (a, b) => (a.priorityIndex || 0) - (b.priorityIndex || 0),
        );

        // Combina: prioritários primeiro, depois outros
        const allRepos = [...sortedPriorityRepos, ...sortedOtherRepos];

        console.log('✅ Total de projetos carregados:', allRepos.length);
        console.log('🎯 Repos prioritários:', sortedPriorityRepos.length);
        console.log('📦 Outros repos:', sortedOtherRepos.length);

        // Atualiza cache
        this.allProjectsCache$.next(allRepos);

        return allRepos;
      }),
      catchError((error) => {
        console.error('❌ Erro ao buscar todos os projetos:', error);
        return of([]);
      }),
    );
  }

  /**
   * Filtra projetos por nome e tecnologia
   */
  filterProjects(
    projects: GitHubProject[],
    searchTerm: string,
    selectedLanguage: string = 'all',
  ): GitHubProject[] {
    let filtered = [...projects];

    // Filtro por linguagem
    if (selectedLanguage && selectedLanguage !== 'all') {
      filtered = filtered.filter(
        (project) =>
          project.language?.toLowerCase() === selectedLanguage.toLowerCase() ||
          project.topics?.some((topic) => topic.toLowerCase() === selectedLanguage.toLowerCase()),
      );
    }

    // Filtro por termo de busca
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((project) => {
        const matchName = project.repoName.toLowerCase().includes(term);
        const matchDescription = project.description.toLowerCase().includes(term);
        const matchLanguage = project.language?.toLowerCase().includes(term);
        const matchTopics = project.topics?.some((topic) => topic.toLowerCase().includes(term));
        const matchUsername = project.username.toLowerCase().includes(term);

        return matchName || matchDescription || matchLanguage || matchTopics || matchUsername;
      });
    }

    return filtered;
  }

  /**
   * Obtém lista de todas as linguagens únicas dos projetos
   */
  getUniqueLanguages(projects: GitHubProject[]): string[] {
    const languages = new Set<string>();

    projects.forEach((project) => {
      if (project.language) {
        languages.add(project.language);
      }
      // Adiciona topics também
      project.topics?.forEach((topic) => {
        if (topic) languages.add(topic);
      });
    });

    return Array.from(languages).sort();
  }

  /**
   * Limpa o cache de projetos
   */
  clearCache(): void {
    this.allProjectsCache$.next([]);
    console.log('🗑️ Cache de projetos limpo');
  }

  /**
   * Busca repositórios de um usuário específico
   */
  private getRepositoriesFromUser(username: string, limit: number): Observable<GitHubProject[]> {
    const url = `${this.githubApiUrl}/users/${username}/repos?sort=updated&per_page=${limit}`;

    return this.http.get<any[]>(url).pipe(
      map((repos) =>
        repos.map((repo) => ({
          repoName: repo.name,
          username: repo.owner.login,
          description: repo.description || 'Nenhuma descrição fornecida.',
          stars: repo.stargazers_count,
          language: repo.language || 'Markdown',
          date: this.formatDate(repo.pushed_at),
          githubUrl: repo.html_url,
          imageUrl: this.getRepoImage(repo),
          topics: repo.topics || [],
          forks: repo.forks_count,
          watchers: repo.watchers_count,
          openIssues: repo.open_issues_count,
          updatedAt: new Date(repo.pushed_at).getTime(),
          isPriority: false,
        })),
      ),
      catchError((error) => {
        console.error(`❌ Erro ao buscar repos de ${username}:`, error);
        return of([]);
      }),
    );
  }

  /**
   * Busca um repositório específico
   */
  getRepository(username: string, repoName: string): Observable<GitHubProject> {
    const url = `${this.githubApiUrl}/repos/${username}/${repoName}`;

    return this.http.get<any>(url).pipe(
      map((repo) => ({
        repoName: repo.name,
        username: repo.owner.login,
        description: repo.description || 'Nenhuma descrição fornecida.',
        stars: repo.stargazers_count,
        language: repo.language || 'Markdown',
        date: this.formatDate(repo.pushed_at),
        githubUrl: repo.html_url,
        imageUrl: this.getRepoImage(repo),
        topics: repo.topics || [],
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count,
        updatedAt: new Date(repo.pushed_at).getTime(),
      })),
    );
  }

  /**
   * Formata a data para o padrão brasileiro
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  /**
   * Obtém imagem do repositório
   */
  private getRepoImage(repo: any): string {
    const customImages: { [key: string]: string } = {
      // Adicione suas imagens personalizadas aqui
    };

    const repoKey = `${repo.owner.login}/${repo.name}`;
    if (customImages[repoKey]) {
      return customImages[repoKey];
    }

    const languageColors: { [key: string]: string } = {
      JavaScript: 'f7df1e',
      TypeScript: '007ACC',
      Python: '3776AB',
      Java: 'ED8B00',
      HTML: 'E34F26',
      CSS: '1572B6',
      Vue: '4FC08D',
      React: '61DAFB',
      Angular: 'DD0031',
      PHP: '777BB4',
      'C++': '00599C',
      'C#': '239120',
      Ruby: 'CC342D',
      Go: '00ADD8',
      Rust: 'CE422B',
      Kotlin: '7F52FF',
      Swift: 'FA7343',
    };

    const color = languageColors[repo.language] || '1a1a2e';
    const textColor = 'ffffff';

    return `https://placehold.co/600x350/${color}/${textColor}?text=${encodeURIComponent(repo.name)}`;
  }
}
