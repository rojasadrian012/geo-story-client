import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { NgIf } from '@angular/common';

import { TableModule } from 'primeng/table';

import { UserSurveyService } from './services/user-survey.service';
import { UserSurveyResponse } from './interfaces/user-survey-response.interface';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';

@Component({
    selector: 'app-users-survey',
    standalone: true,
    imports: [GeoCenterContainerComponent, NgIf, TableModule],
    templateUrl: './users-survey.component.html',
    styles: `
        .title {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .sub-title {
            font-weight: 700;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .else {
            margin-top: 1rem;
            margin-bottom: 1rem;
            font-style: italic;
            text-align: center;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersSurveyComponent implements OnInit {
    private readonly userSurveyService = inject(UserSurveyService);
    public userSurveys = signal<null | UserSurveyResponse>(null);

    ngOnInit(): void {
        this.getFisrtAndSecondSurveys();
    }

    getFisrtAndSecondSurveys() {
        this.userSurveyService.getFirtsAndSecondSurvey().subscribe({
            next: (res) => this.userSurveys.set(res),
            error: (err) => console.log(err),
        });
    }
}
