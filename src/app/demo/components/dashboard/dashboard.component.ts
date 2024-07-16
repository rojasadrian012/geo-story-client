import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizListResponse } from './interfaces/quiz-list-response.interface';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    public dashboardService = inject(DashboardService);


    images: string[] = [
        '../../../../assets/images/options-images/curiosidades.svg',
        '../../../../assets/images/options-images/historia.svg',
        '../../../../assets/images/options-images/geografia.svg',
        '../../../../assets/images/options-images/economia.svg',
        '../../../../assets/images/options-images/cultura.svg',
        '../../../../assets/images/options-images/turismo.svg',
    ];
    isBlocked: boolean = true;
    levels: QuizListResponse[] = [];

    ngOnInit() {
        this.getQuizzes();

    }

    getQuizzes() {
        this.http.get<QuizListResponse[]>(environment.baseUrl + '/quiz')
            .subscribe((data) => {
                this.levels = data;
            });
    }

    changePath(level: QuizListResponse, blocked: boolean) {
        if (blocked) return;
        this.router.navigateByUrl(`lesson/${level.title}/${level.id}`);
    }

    unlockAllLevels() {
        this.isBlocked = !this.isBlocked;
    }

}
