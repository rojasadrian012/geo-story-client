import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'lesson/:level/:id',canActivate: [isAuthenticatedGuard], component: LessonComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
