import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SelectedAnswersService {

    constructor() { }

    private responsesTheUser = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );

    public setedValue = signal<boolean>(false);

    addResponseInMap(answerId: string, status: boolean): void {
        this.responsesTheUser().set(answerId, status);
        this.setedValue.set(true);
    }

    getAllResponsesTheUser() {
        return this.responsesTheUser();
    }

    areAllResponsesCorrect(): boolean {
        const totalElements = this.responsesTheUser().size;

        if (totalElements !== environment.number_of_questions) {
            return false;
        }

        return Array.from(this.responsesTheUser().values()).every(status => status === true);
    }

}
