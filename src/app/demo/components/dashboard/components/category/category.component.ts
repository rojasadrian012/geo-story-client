import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnInit,
    signal,
} from '@angular/core';
import { QuizListResponse } from '../../interfaces/quiz-list-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [NgClass],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
    public images = input.required<string[]>();
    public levels = input.required<QuizListResponse[]>();

    public readonly dashboardService = inject(DashboardService);
    public readonly router = inject(Router);

    changePath(level: QuizListResponse, blocked: boolean) {
        if (blocked) return;
        this.router.navigateByUrl(`lesson/${level.title}/${level.id}`);
    }

}
