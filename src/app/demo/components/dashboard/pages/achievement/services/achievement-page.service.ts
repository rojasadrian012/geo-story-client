import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achievement, AchievementListResponse } from '../interfaces/achievement-list-response.interface';
import { PopUpService } from '../../../components/achievement-pop-up/services/pop-up.service';

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
    private readonly popUpService = inject(PopUpService)

    public showNewAchievement = signal<boolean>(false)

    verifyNumberResponsesAndSave(numberOfResponses: number) {

        if (numberOfResponses < 10 || numberOfResponses > 20) return;

        if (numberOfResponses === 10) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.RESPONDER_10)
            return
        }

        if (numberOfResponses === 15) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.RESPONDER_15)
            return
        }

        if (numberOfResponses === 20) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.RESPONDER_20)
            return
        }
    }

    verifyStreakAndSave(numberOfStreaks: number) {

        if (numberOfStreaks < 5 || numberOfStreaks > 10) return

        if (numberOfStreaks === 5) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.RACHA_5)
            return
        }

        if (numberOfStreaks === 10) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.RACHA_10)
            return
        }
    }

    verifyCorrectsAndSave(numberOfCorrects: number) {

        if (numberOfCorrects < 5 || numberOfCorrects > 15) return

        if (numberOfCorrects === 5) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.PRECISION_5)
            return
        }

        if (numberOfCorrects === 10) {
            this.saveAchievementAlreadyUseSubscribe(AchievementCode.PRECISION_10)
            return
        }

        if (numberOfCorrects === 15) {
            this.saveAchievementAlreadyUseSubscribe((AchievementCode.PRECISION_15))
            return
        }
    }

    getAchievementsByUser(): Observable<AchievementListResponse> {
        return this.http.get<AchievementListResponse>(this.baseUrl);
    }

    saveAchievement(code: AchievementCode): Observable<Achievement> {
        return this.http.post<Achievement>(this.baseUrl + '/save', { code });
    }

    saveAchievementAlreadyUseSubscribe(code: AchievementCode) {
        this.saveAchievement(code).subscribe({
            next: (res) => {
                this.handleResponse(res.name, res.description)
            },
            error: (err) => console.error(err),
        })
    }

    showAchievementAndReset() {
        this.popUpService.showNewAchievement.set(true)
        setTimeout(() => {
            this.popUpService.showNewAchievement.set(false)
        }, 3000)
    }

    handleResponse(namaAchievement: string, descriptionAchievement) {
        this.popUpService.text.set(namaAchievement + ' ' + descriptionAchievement)
        this.showAchievementAndReset()
    }

}
