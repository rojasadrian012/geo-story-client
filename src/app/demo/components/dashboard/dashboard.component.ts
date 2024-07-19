import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizListResponse } from './interfaces/quiz-list-response.interface';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { LevelByUser } from './interfaces/levels-by-user.interface';
import { QuizStatusService } from './services/quizStatus.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    private readonly http = inject(HttpClient);
    public dashboardService = inject(DashboardService);
    public quizStatusService = inject(QuizStatusService);

    constructor() {
        this.getQuizzes();
        effect(() => {
            if (this.quizStatusService.refresh()) {
                this.getQuizzes();
            }
        });
    }

    public images = signal<string[]>([
        '../../../../assets/images/options-images/curiosidades.svg',
        '../../../../assets/images/options-images/historia.svg',
        '../../../../assets/images/options-images/geografia.svg',
        '../../../../assets/images/options-images/economia.svg',
        '../../../../assets/images/options-images/cultura.svg',
        '../../../../assets/images/options-images/turismo.svg',
    ]);

    public levels = signal<LevelByUser[]>([]);

    getQuizzes() {
        this.http
            .get<LevelByUser[]>(environment.baseUrl + '/quiz/levels-by-user')
            .subscribe((data) => {
                this.levels.set(data);
            });
    }
}
