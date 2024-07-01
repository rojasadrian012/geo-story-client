import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { zzfx } from 'zzfx';

import { QuestionListResponse } from '../../interfaces/question-list-response.interface';
import { environment } from 'src/environments/environment';
import { SoundsService } from '../../services/sounds.service';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly messageService = inject(MessageService);
    private readonly soundsService = inject(SoundsService);

    title: string;
    id: string;
    questions: QuestionListResponse[] = [];
    originalQuestions: QuestionListResponse[] = []; // Para guardar las preguntas originales
    selectedAnswers: { [key: string]: { id: string; isCorrect: boolean } } = {};
    correctAnswers: { [key: string]: string } = {};
    viewResponse: { [key: string]: boolean } = {};
    incorrectAnswers: string[] = []; // Para almacenar preguntas incorrectas
    currentQuestionIndex: number = 0;
    showReviewModal: boolean = false;

    showHintSignal = signal(false);
    showHintEffecft = effect(() => {
        if (this.showHintSignal()) this.soundsService.playPianoSound();
    });

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.title = params.get('level');
            this.id = params.get('id');
            this.getQuestions();
        });
    }

    getQuestions() {
        this.http
            .get<QuestionListResponse[]>(
                environment.baseUrl + '/quiz/questions/' + this.id
            )
            .subscribe((data) => {
                this.questions = data;
                this.originalQuestions = [...data]; // Guarda las preguntas originales
                this.questions.forEach((question) => {
                    question.answers.forEach((answer) => {
                        if (answer.isCorrect) {
                            this.correctAnswers[question.id] = answer.text;
                        }
                    });
                });
            });
    }

    selectOption(questionId: string, answerId: string, isCorrect: boolean) {
        this.selectedAnswers[questionId] = { id: answerId, isCorrect };

        if (!isCorrect) {
            this.soundsService.playIncorrectSound();
            this.viewResponse[questionId] = true;
            if (!this.incorrectAnswers.includes(questionId)) {
                this.incorrectAnswers.push(questionId);
            }
            return;
        }

        this.soundsService.playCorrectSound();

        if (this.showHintSignal()) {
            this.showMessage('success', 'Ganaste', '3 puntos');
            return;
        }

        this.showMessage('success', 'Ganaste', '4 puntos');
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showHintSignal.set(false); // Reset hint visibility for next question
            this.messageService.clear();
        } else if (this.currentQuestionIndex === this.questions.length - 1 && this.incorrectAnswers.length > 0) {
            // Filtra las preguntas incorrectas y resetea los estados
            this.questions = this.originalQuestions.filter(question => this.incorrectAnswers.includes(question.id));
            this.incorrectAnswers = [];
            this.selectedAnswers = {};
            this.viewResponse = {};
            this.currentQuestionIndex = 0;
            this.showHintSignal.set(false);
            this.messageService.clear();
            console.log(this.questions);
            this.showReviewModal = true; // Mostrar el modal al finalizar las preguntas
        }
    }



    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showHintSignal.set(false); // Reset hint visibility for previous question
        }
    }

    toggleHint(value: boolean) {
        this.showHintSignal.set(value);
    }

    showMessage(severity: string, title: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: title,
            detail: detail,
        });
    }

    isOptionSelected(): boolean {
        return !!this.selectedAnswers[this.questions[this.currentQuestionIndex]?.id];
    }

}
