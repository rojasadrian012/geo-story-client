import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
    QuestionListResponse,
    UserQuizResponse,
} from '../../interfaces/question-list-response.interface';
import { environment } from 'src/environments/environment';
import { SoundsService } from '../../services/sounds.service';
import { QuizStatusService } from '../../services/quizStatus.service';
import { QuestionService } from '../../services/question.service';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { QuestionsAndAnswersComponent } from '../../components/questions-and-answers/questions-and-answers.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    imports: [GeoCenterContainerComponent, QuestionsAndAnswersComponent, ToastModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService]
})
export class LessonComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly soundsService = inject(SoundsService);
    private readonly quizStatusService = inject(QuizStatusService);
    private readonly questionService = inject(QuestionService);

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
                this.questions.set(data.quiz.questions);
            });
    }

    addNewValues(incorrectsQuestionsMAP: Map<string, boolean>) {
        this.questions.set(
            this.questions().filter((question) =>
                incorrectsQuestionsMAP.has(question.id)
            )
        );
        this.questionService.numberOfQuestions.set(this.questions().length);
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
                    this.questionService.numberOfQuestions.set(environment.number_of_questions);
                },
                error: (error) => {
                    console.error('Error al guardar los puntos:', error);
                },
            });
    }
}
