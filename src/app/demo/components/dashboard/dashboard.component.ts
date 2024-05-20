import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizListResponse } from './interfaces/quiz-list-response.interface';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    levels: QuizListResponse[] = []
    images: string[] = [
        '../../../../assets/images/options-images/curiosidades.svg',
        '../../../../assets/images/options-images/historia.svg',
        '../../../../assets/images/options-images/geografia.svg',
        '../../../../assets/images/options-images/economia.svg',
        '../../../../assets/images/options-images/cultura.svg',
        '../../../../assets/images/options-images/turismo.svg',
    ]
    blocked: boolean = false

    ngOnInit() {
        this.getQuizzes()
    }

    getQuizzes() {
        this.http.get<QuizListResponse[]>(environment.baseUrl + '/quiz')
            .subscribe((data) => {
                this.levels = data
            });
    }

    changePath(level: QuizListResponse, blocked: boolean) {
        if(blocked) return
        this.router.navigateByUrl(`lesson/${level.title}/${level.id}`)
    }
}
