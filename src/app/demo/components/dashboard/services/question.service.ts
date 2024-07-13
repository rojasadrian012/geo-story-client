import { Injectable, effect, signal } from '@angular/core';

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

    getAllPointsMap() {
        return this.pointsTheUser()
    }

    addPointsInQuestion(questionId: string, valueToAdd: number) {
        if (this.pointsTheUser().has(questionId)) {
            let currentValue = this.pointsTheUser().get(questionId);
            this.pointsTheUser().set(questionId, currentValue + valueToAdd);
        } else {
            console.error(`La clave ${questionId} no existe en el Map.`);
        }
    }

    getPoinntTheQuestion(questionId: string) {
        return this.pointsTheUser().get(questionId);
    }

    totalPointsLesson(){
        let sum = 0;
        this.getAllPointsMap().forEach(value => {
          sum += value;
        });
        return sum;
    }

    setNewValueSecondChange(newMap: Map<string, boolean>){
        this.isQuestionSelectedMap.set(
            new Map<string, boolean>(newMap)
        )
    }

    inicializeSelectedStatus(){
        this.isQuestionSelectedMap().forEach((value, key)=>{
            this.isQuestionSelectedMap().set(key, false)
        })
    }

}
