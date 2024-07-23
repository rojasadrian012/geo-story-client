import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
    imports: [
        // StyleClassModule,
        // PanelMenuModule,
        // ToastModule,
        // HintComponent,
        // QuestionsAndAnswersComponent,
        CategoryComponent,
        DashboardsRoutingModule,
    ],
    declarations: [
        DashboardComponent,
    ],
})
export class DashboardModule { }
