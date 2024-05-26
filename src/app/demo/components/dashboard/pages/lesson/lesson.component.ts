import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { QuestionListResponse } from '../../interfaces/question-list-response.interface';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {

    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);

    title: string;
    id: string;
    questions: QuestionListResponse[] = [];
    selectedAnswers: { [key: string]: { id: string, isCorrect: boolean } } = {};
    correctAnswers: { [key: string]: string } = {};
    viewResponse: { [key: string]: boolean } = {};
    currentQuestionIndex: number = 0;
    showHint: boolean = false;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.title = params.get('level');
            this.id = params.get('id');
            this.getQuestions();
        });
    }

    getQuestions() {
        this.http.get<QuestionListResponse[]>(environment.baseUrl + '/quiz/questions/' + this.id)
            .subscribe((data) => {
                this.questions = data;
                this.questions.forEach(question => {
                    question.answers.forEach(answer => {
                        if (answer.isCorrect) {
                            this.correctAnswers[question.id] = answer.text;
                        }
                    });
                });
                console.log(this.questions);
            });
    }

    selectOption(questionId: string, answerId: string, isCorrect: boolean) {
        this.selectedAnswers[questionId] = { id: answerId, isCorrect };
        if (!isCorrect) {
            this.viewResponse[questionId] = true;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showHint = false; // Reset hint visibility for next question
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showHint = false; // Reset hint visibility for previous question
        }
    }

    toggleHint() {
        this.showHint = !this.showHint;
    }
}
