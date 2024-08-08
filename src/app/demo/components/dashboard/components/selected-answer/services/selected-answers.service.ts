import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AchievementPageService } from '../../../pages/achievement/services/achievement-page.service';

@Injectable({
    providedIn: 'root'
})
export class SelectedAnswersService {

    private responsesTheUser = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );

    private readonly achievementService = inject(AchievementPageService);

    public setedValue = signal<boolean>(false);
    public streakOfCorrectQuestions = signal<number>(0);
    public numberResponses = signal<number>(+localStorage.getItem('numberResponses') || 0);

    addResponseInMap(answerId: string, isCorrect: boolean): void {

        this.numberResponses.update((value) => (value + 1));
        localStorage.setItem('numberResponses', this.numberResponses().toString());

        this.achievementService.verifyNumberResponsesAndSave(this.numberResponses())

        isCorrect ?
            this.streakOfCorrectQuestions.update((value) => (value + 1)) :
            this.streakOfCorrectQuestions.set(0);

        this.responsesTheUser().set(answerId, isCorrect);
        this.setedValue.set(true);
    }

    getAllResponsesTheUser() {
        return this.responsesTheUser();
    }

    //TODO: esto me parece es innecesario, creo que si en addResponseInMap uno es falso podria poner un a bandera y omitir este metodo.
    areAllResponsesCorrect(): boolean {

        const totalElements = this.responsesTheUser().size;

        if (totalElements !== environment.number_of_questions) {
            return false;
        }

        return Array.from(this.responsesTheUser().values()).every(status => status === true);
    }

    clearAllPoints(): void {
        this.responsesTheUser().clear()
    }

}
