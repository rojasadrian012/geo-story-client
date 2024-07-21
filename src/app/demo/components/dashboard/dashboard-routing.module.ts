import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { ArcheivementComponent } from './pages/archeivement/archeivement.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', canActivate: [isAuthenticatedGuard], component: DashboardComponent },
        { path: 'lesson/:level/:id', canActivate: [isAuthenticatedGuard], component: LessonComponent },
        { path: 'logros', canActivate: [isAuthenticatedGuard], component: ArcheivementComponent },
        { path: 'ranking', canActivate: [isAuthenticatedGuard], component: RankingComponent },
        { path: 'configuracion', canActivate: [isAuthenticatedGuard], component: SettingsComponent },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
