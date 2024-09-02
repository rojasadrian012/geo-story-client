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
import { SurveyComponent } from './pages/survey/survey.component';
import { ConfigComponent } from './pages/config/config.component';
import { UsersSurveyComponent } from './pages/users-survey/users-survey.component';

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
                path: 'mi-perfil',
                canActivate: [isAuthenticatedGuard],
                component: SettingsComponent,
            },
            {
                path: 'usuarios',
                canActivate: [isAuthenticatedGuard],
                component: UsuariosComponent,
            },
            {
                path: 'encuesta',
                canActivate: [isAuthenticatedGuard],
                component: SurveyComponent,
            },
            {
                path: 'configuracion',
                canActivate: [isAuthenticatedGuard],
                component: ConfigComponent,
            },
            {
                path: 'encuesta-usuarios',
                canActivate: [isAuthenticatedGuard],
                component: UsersSurveyComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule {}
