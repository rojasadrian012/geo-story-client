import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserSavedResponse } from '../interfaces/user-saved-response.interface';
import { Observable } from 'rxjs';
import { LessonQuestionListResponse } from '../interfaces/lesson-question-list-response.interface';
import { LevelStatus } from '../interfaces/level-status.enum';

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private readonly http: HttpClient) {}

    private baseUrl = `${environment.baseUrl}/quiz`;

    public isUnLockedNextLevel: LevelStatus = LevelStatus.NO_ASIGNED;

    getQuestions(id: string): Observable<LessonQuestionListResponse> {
        return this.http.get<LessonQuestionListResponse>(
            `${this.baseUrl}/questions/${id}`
        );
    }

    savedPointWinned(
        points: number,
        title: string,
        userQuizId: string
    ): Observable<UserSavedResponse> {
        return this.http.post<UserSavedResponse>(
            `${this.baseUrl}/save-points`,
            {
                points,
                title,
                userQuizId,
            }
        );
    }
}
