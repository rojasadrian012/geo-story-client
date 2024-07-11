import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    // Mapa para almacenar el estado de selección de cada pregunt
    private isQuestionSelectedMap = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );
    private pointsTheUser = signal<Map<string, number>>(
        new Map<string, number>()
    );

    // Inicializa el mapa con los IDs de las preguntas
    initializeQuestionStatusInFalse(questionIds: string[]): void {
        questionIds.forEach((id) => {
            this.isQuestionSelectedMap().set(id, false);
        });
    }

    // Obtiene el estado de selección de una pregunta específica
    getQuestionSelectedStatus(questionId: string): boolean {
        return this.isQuestionSelectedMap().get(questionId);
    }

    // Actualiza el estado de selección de una pregunta específica
    setQuestionSelectedStatus(questionId: string, status: boolean): void {
        this.isQuestionSelectedMap().set(questionId, status);
    }

    getAllQuestionResponse() {
        return this.isQuestionSelectedMap();
    }

    initializePointInZero(questionIds: string[]): void {
        questionIds.forEach((id) => {
            this.pointsTheUser().set(id, 0);
        });
    }

    setPointInQuestion(questionId:string, points:number){
        this.pointsTheUser().set(questionId, points)
    }
}
