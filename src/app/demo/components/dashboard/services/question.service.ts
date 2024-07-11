import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    // Mapa para almacenar el estado de selección de cada pregunt
    private isQuestionSelectedMap = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );

    // Inicializa el mapa con los IDs de las preguntas
    initializeMap(questionIds: string[]): void {
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
}
