import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ArcheivementComponent } from './pages/achievement/achievement.component';
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
                component: LessonComponent,
            },
            {
                path: 'logros',
                canActivate: [isAuthenticatedGuard],
                component: ArcheivementComponent,
            },
            {
                path: 'ranking',
                canActivate: [isAuthenticatedGuard],
                component: RankingComponent,
            },
            {
                path: 'configuracion',
                canActivate: [isAuthenticatedGuard],
                component: SettingsComponent,
            },
            {
                path: 'usuarios',
                canActivate: [isAuthenticatedGuard],
                component: UsuariosComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule { }
