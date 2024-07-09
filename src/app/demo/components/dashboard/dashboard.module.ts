import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { ToastModule } from 'primeng/toast';

import { LessonComponent } from './pages/lesson/lesson.component';
import { MessageService } from 'primeng/api';
import { HintComponent } from './components/hint/hint.component';
import { FinishMessageComponent } from './components/finish-message/finish-message.component';
import { QuestionsAndAnswersComponent } from './components/questions-and-answers/questions-and-answers.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        DashboardsRoutingModule,
        ToastModule,
        HintComponent,
        FinishMessageComponent,
        QuestionsAndAnswersComponent
    ],
    declarations: [
        DashboardComponent,
        LessonComponent
    ],
    providers: [MessageService],
})
export class DashboardModule { }
