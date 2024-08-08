import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AchievementListResponse } from '../interfaces/achievement-list-response.interface';

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

    public showNewAchievement = signal<boolean>(false)

    verifyNumberResponsesAndSave(numberOfResponses: number) {

        if (numberOfResponses < 10 || numberOfResponses > 20) return;

        if (numberOfResponses === 10) {
            this.saveAchievement(AchievementCode.RESPONDER_10).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 10'),
                error: (err) => console.error(err),
            })
            return
        }

        if (numberOfResponses === 15) {
            this.saveAchievement(AchievementCode.RESPONDER_15).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 15'),
                error: (err) => console.error(err),
            })
            return
        }

        if (numberOfResponses === 20) {
            this.saveAchievement(AchievementCode.RESPONDER_20).subscribe({
                next: (res) => console.log('Mostrar Pop up logro 20'),
                error: (err) => console.error(err),
            })
            return
        }
    }

    verifyStreakAndSave(numberOfStreaks: number) {

        if (numberOfStreaks < 5 || numberOfStreaks > 10) return

        if (numberOfStreaks === 5) {
            this.saveAchievement(AchievementCode.RACHA_5).subscribe({
                next: (res) => console.log('Setear Un signal para el logro: ', AchievementCode.RACHA_5),
                error: (err) => console.error(err),
            })
            return
        }

        if (numberOfStreaks === 10) {
            this.saveAchievement(AchievementCode.RACHA_10).subscribe({
                next: (res) => console.log('Setear Un signal para el logro: ', AchievementCode.RACHA_10),
                error: (err) => console.error(err),
            })
            return
        }
    }

    verifyCorrectsAndSave(numberOfCorrects: number) {

        if (numberOfCorrects < 5 || numberOfCorrects > 15) return

        if (numberOfCorrects === 5) {
            this.saveAchievement(AchievementCode.PRECISION_5).subscribe({
                next: (res) => console.log('Setear Un signal para el logro: ', AchievementCode.PRECISION_5),
                error: (err) => console.error(err),
            })
            return
        }

        if (numberOfCorrects === 10) {
            this.saveAchievement(AchievementCode.PRECISION_10).subscribe({
                next: (res) => console.log('Setear Un signal para el logro: ', AchievementCode.PRECISION_10),
                error: (err) => console.error(err),
            })
            return
        }

        if (numberOfCorrects === 15) {
            this.saveAchievement(AchievementCode.PRECISION_15).subscribe({
                next: (res) => console.log('Setear Un signal para el logro: ', AchievementCode.PRECISION_15),
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
