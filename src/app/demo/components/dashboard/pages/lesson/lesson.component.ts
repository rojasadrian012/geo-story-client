import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { environment } from 'src/environments/environment';

import { QuestionListResponse } from '../../interfaces/question-list-response.interface';
import { SoundsService } from '../../services/sounds.service';
import { QuizStatusService } from '../../services/quizStatus.service';
import { QuestionService } from '../../services/question.service';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { QuestionsAndAnswersComponent } from '../../components/questions-and-answers/questions-and-answers.component';
import { LessonService } from './services/lesson.service';
import { AchievementPopUpComponent } from '../../components/achievement-pop-up/achievement-pop-up.component';
import { PopUpService } from '../../components/achievement-pop-up/services/pop-up.service';
import { CanDeactivateType } from '../../../auth/guards/change-path.guard';
import { CategoryService } from '../../components/category/services/category.service';

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    imports: [
        GeoCenterContainerComponent,
        QuestionsAndAnswersComponent,
        AchievementPopUpComponent,

        ToastModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MessageService,
    ],
})
export class LessonComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly soundsService = inject(SoundsService);
    private readonly quizStatusService = inject(QuizStatusService);
    private readonly questionService = inject(QuestionService);
    private readonly lessonService = inject(LessonService);
    private readonly routerService = inject(Router);
    public readonly popUpService = inject(PopUpService);
    private readonly categoryService = inject(CategoryService);
    private readonly messageService = inject(MessageService);

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
        this.categoryService.enableRouteChange = false;
    }

    getQuestions(id: string) {
        this.lessonService.getQuestions(id).subscribe({
            next: (response) => {
                this.questions.set(response.quiz.questions);
            },
            error: (err) => console.error(err),
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
        this.lessonService
            .savedPointWinned(points, this.title, this.userQuizId())
            .subscribe({
                next: () => {
                    this.getQuestions(this.userQuizId());
                    this.quizStatusService.refresh.set(true);
                    this.questionService.numberOfQuestions.set(
                        environment.number_of_questions
                    );
                    this.routerService.navigateByUrl('/');
                },
                error: (error) => {
                    console.error('Error al guardar los puntos:', error);
                },
            });
    }

    canDeactivate(): CanDeactivateType {
        if (this.categoryService.enableRouteChange) {
            return true;
        }

        this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Completa la lección antes de salir.',
        })
        return false
    }
}
