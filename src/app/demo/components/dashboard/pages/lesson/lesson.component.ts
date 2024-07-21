import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
    QuestionListResponse,
    UserQuizResponse,
} from '../../interfaces/question-list-response.interface';
import { environment } from 'src/environments/environment';
import { SoundsService } from '../../services/sounds.service';
import { QuizStatusService } from '../../services/quizStatus.service';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
})
export class LessonComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly soundsService = inject(SoundsService);
    private readonly quizStatusService = inject(QuizStatusService);

    userQuizId = signal<string>('noId012');
    questions = signal<QuestionListResponse[]>([]);
    showHintSignal = signal(false);
    showHintEffecft = effect(() => {
        if (this.showHintSignal()) this.soundsService.playPianoSound();
    });

    title: string;
    showReviewModal: boolean = false;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.title = params.get('level');
            this.userQuizId.set(params.get('id'));
            this.getQuestions(this.userQuizId());
        });
    }

    getQuestions(id: string) {
        this.http
            .get<UserQuizResponse>(
                environment.baseUrl + '/quiz/questions/' + id
            )
            .subscribe((data) => {
                this.questions.set(data.quizId.questions);
            });
    }

    addNewValues(incorrectsQuestionsMAP: Map<string, boolean>) {
        this.questions.set(
            this.questions().filter((question) =>
                incorrectsQuestionsMAP.has(question.id)
            )
        );
    }

    savePointsWinned(points: number) {
        this.http
            .post(`${environment.baseUrl}/quiz/save-points`, {
                points,
                title: this.title,
                userQuizId: this.userQuizId(),
            })
            .subscribe({
                next: (response) => {
                    this.getQuestions(this.userQuizId());
                    this.quizStatusService.refresh.set(true);
                },
                error: (error) => {
                    console.error('Error al guardar los puntos:', error);
                },
            });
    }
}
