import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SelectedAnswersService {

    private responsesTheUser = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );

    public setedValue = signal<boolean>(false);
    public streakOfCorrectQuestions = signal<number>(0);
    public numberOfTimesResponsed = signal<number>(0);

    addResponseInMap(answerId: string, isCorrect: boolean): void {

        this.numberOfTimesResponsed.update((value) => (value + 1));
        isCorrect ? this.streakOfCorrectQuestions.update((value) => (value + 1)) : this.streakOfCorrectQuestions.set(0);

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
