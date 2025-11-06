import { Routes } from '@angular/router';
import { Layout } from './components/core/layout/layout';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'projetos',
        component: Projects,
      },
      {
        path: 'sobre-mim',
        component: Home,
      },
      {
        path: 'blog',
        component: Home,
      },
    ],
  },
];
