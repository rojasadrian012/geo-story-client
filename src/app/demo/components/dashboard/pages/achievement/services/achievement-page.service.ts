import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AchievementListResponse } from '../interfaces/achievement-list-response.interface';

enum AchievementCode {
    CURIOUS_10 = 'CURIOUS_10',
    PERSISTENT_15 = 'PERSISTENT_15',
    DEDICATED_20 = 'DEDICATED_20',
    CONSTANT_5 = 'CONSTANT_5',
    UNSTOPPABLE_10 = 'UNSTOPPABLE_10',
    PRECISE_5 = 'PRECISE_5',
    EXPERT_10 = 'EXPERT_10',
    MASTER_15 = 'MASTER_15',
    PERFECTIONIST = 'PERFECTIONIST',
    EARTHLY_GOD = 'EARTHLY_GOD',
    EXPLORER = 'EXPLORER',
    COLLECTOR = 'COLLECTOR'
}
@Injectable({
    providedIn: 'root'
})
export class AchievementPageService {

    constructor(private readonly http: HttpClient) { }

    baseUrl = `${environment.baseUrl}/quiz/achievements`

    getAchievementsByUser(): Observable<AchievementListResponse> {
        return this.http.get<AchievementListResponse>(this.baseUrl);
    }

    saveAchievement(code: string) {
        return this.http.post(this.baseUrl + '/save', { code });
    }

}
