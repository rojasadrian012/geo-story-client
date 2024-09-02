import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserSurveyResponse } from '../interfaces/user-survey-response.interface';

@Injectable({
    providedIn: 'root',
})
export class UserSurveyService {
    private readonly http = inject(HttpClient);
    private readonly url = signal(
        `${environment.baseUrl}/quiz/fisrt-second-survey`
    );

    getFirtsAndSecondSurvey(): Observable<UserSurveyResponse> {
        return this.http.get<UserSurveyResponse>(this.url());
    }
}
