import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AchievementListResponse } from '../interfaces/achievement-list-response.interface';
import { SelectedAnswersService } from '../../../components/selected-answer/services/selected-answers.service';

export enum AchievementCode {
    // Respuestas
    RESPONDER_10 = 'RESPONDER_10',
    RESPONDER_15 = 'RESPONDER_15',
    RESPONDER_20 = 'RESPONDER_20',

    // Racha
    RACHA_5 = 'RACHA_5',
    RACHA_10 = 'RACHA_10',

    // Precisión
    PRECISION_5 = 'PRECISION_5',
    PRECISION_10 = 'PRECISION_10',
    PRECISION_15 = 'PRECISION_15',

    // Otros
    PERFECCIONISTA = 'PERFECCIONISTA',
    MAESTRO = 'MAESTRO',
    EXPLORADOR = 'EXPLORADOR',
    COLECCIONISTA = 'COLECCIONISTA',
}

@Injectable({
    providedIn: 'root'
})
export class AchievementPageService {

    baseUrl = `${environment.baseUrl}/quiz/achievements`

    private readonly http = inject(HttpClient)
    verifyNumberResponsesAndSave(number: number) {

        if (number < 10) return

        if (number === 10) {
            this.saveAchievement(AchievementCode.RESPONDER_10).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 10'),
                error: (err) => console.error(err),
            })
            return
        }

        if (number === 15) {
            this.saveAchievement(AchievementCode.RESPONDER_15).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 15'),
                error: (err) => console.error(err),
            })
            return
        }

        if (number === 20) {
            this.saveAchievement(AchievementCode.RESPONDER_20).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 20'),
                error: (err) => console.error(err),
            })
            return
        }
    }

    getAchievementsByUser(): Observable<AchievementListResponse> {
        return this.http.get<AchievementListResponse>(this.baseUrl);
    }

    saveAchievement(code: string) {
        return this.http.post(this.baseUrl + '/save', { code });
    }

}
