import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LessonComponent } from './pages/lesson/lesson.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'lesson/:level', component: LessonComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
