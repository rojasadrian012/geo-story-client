import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { QuizListResponse } from "../../interfaces/quiz-list-response.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DashboardService } from "../../services/dashboard.service";

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    images: string[] = [
        '../../../../assets/images/options-images/curiosidades.svg',
        '../../../../assets/images/options-images/historia.svg',
        '../../../../assets/images/options-images/geografia.svg',
        '../../../../assets/images/options-images/economia.svg',
        '../../../../assets/images/options-images/cultura.svg',
        '../../../../assets/images/options-images/turismo.svg',
    ];
    levels = signal<QuizListResponse[]>([]);

    private readonly http = inject(HttpClient);
    public readonly dashboardService = inject(DashboardService);


    ngOnInit() {
        this.getQuizzes();

    }

    getQuizzes() {
        this.http.get<QuizListResponse[]>(environment.baseUrl + '/quiz')
            .subscribe((data) => {
                this.levels.set(data) ;
            });
    }
}
