import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LevelByUser } from './interfaces/levels-by-user.interface';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    private readonly http = inject(HttpClient);

    ngOnInit(): void {
        this.getQuizzes();
    }

    public levels = signal<LevelByUser[]>([]);

    getQuizzes() {
        this.http
            .get<LevelByUser[]>(environment.baseUrl + '/quiz/levels-by-user')
            .subscribe((response) => {
                this.levels.set(response);
            });
    }
}
