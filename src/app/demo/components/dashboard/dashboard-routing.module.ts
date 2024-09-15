import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { changePathGuard } from '../auth/guards/change-path.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canActivate: [isAuthenticatedGuard],
                component: DashboardComponent,
            },
            {
                path: 'lesson/:level/:id',
                canActivate: [isAuthenticatedGuard],
                canDeactivate: [changePathGuard],
                loadComponent: () => import('./pages/lesson/lesson.component'),
            },
            {
                path: 'logros',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/achievement/achievement.component'),
            },
            {
                path: 'ranking',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/ranking/ranking.component'),
            },
            {
                path: 'mi-perfil',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/settings/settings.component'),
            },
            {
                path: 'usuarios',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/usuarios/usuarios.component'),
            },
            {
                path: 'encuesta',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/survey/survey.component'),
            },
            {
                path: 'configuracion',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/config/config.component'),
            },
            {
                path: 'encuesta-usuarios',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/users-survey/users-survey.component'),
            },
            {
                path: 'resultados',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/results/results.component'),
            },
            {
                path: 'graficos',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () =>
                    import('./pages/graphics/graphics.component'),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule {}
