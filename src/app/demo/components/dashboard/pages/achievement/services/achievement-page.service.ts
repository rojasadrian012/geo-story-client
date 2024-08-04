import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AchievementListResponse } from '../interfaces/achievement-list-response.interface';

@Injectable({
    providedIn: 'root'
})
export class AchievementPageService {

    constructor(private readonly http: HttpClient) { }

    baseUrl = `${environment.baseUrl}/quiz/achievements`

    getAchievementsByUser(): Observable<AchievementListResponse> {
        return this.http.get<AchievementListResponse>(this.baseUrl);
    }

}
