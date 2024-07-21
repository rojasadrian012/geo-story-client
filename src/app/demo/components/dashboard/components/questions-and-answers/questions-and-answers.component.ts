import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    SimpleChanges,
    input,
    inject,
    signal,
    effect,
    output,
} from '@angular/core';

import { MessageService } from 'primeng/api';

import {
    Answer,
    QuestionListResponse,
} from '../../interfaces/question-list-response.interface';
import { TitleComponent } from '../title/title.component';
import { SelectedAnswerComponent } from '../selected-answer/selected-answer.component';
import { QuestionService } from '../../services/question.service';
import { HintComponent } from '../hint/hint.component';
import { ModalSecondChanceComponent } from '../modal-second-chance/modal-second-chance.component';
import { Router } from '@angular/router';

enum pointsQuestion {
    perfectPoint = 20,
    usedHint = -1,
    correct = 4,
    correctSch = 2,
    disableHint = 1,
}

@Component({
    selector: 'app-questions-and-answers',
    standalone: true,
    imports: [
        TitleComponent,
        SelectedAnswerComponent,
        HintComponent,
        ModalSecondChanceComponent,
    ],
    templateUrl: './questions-and-answers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsAndAnswersComponent implements OnChanges {
    public questionsAndAnswers = input.required<QuestionListResponse[]>();
    public onIncorrectsCuestions = output<Map<string, boolean>>();
    public onPointsWinned = output<number>();

    public readonly questionService = inject(QuestionService);
    private readonly messageService = inject(MessageService);
    private readonly routerService = inject(Router);

    public isTwoTentative = signal<boolean>(false);
    public isSecondChance = signal(false);
    private counterQuestions = signal<number>(-1);
    public isUsedHint = signal(false);
    private incorrectsQuestionsMap = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );
    public showModal = false;
    private ignoreFirstZero = true;
    public pointLesson = 0; //TODO: ver para que demonios se usa esta variable, mirando por arriba no lo entendi.
    public isPerfectPoint = false;

    constructor() {
        effect(() => {

            if (this.counterQuestions() === 0 && this.ignoreFirstZero) {
                this.ignoreFirstZero = false;
                return;
            }

            if (this.counterQuestions() === 0 && !this.ignoreFirstZero) {
                this.pointLesson = this.questionService.totalPointsLesson();
                if (this.pointLesson === pointsQuestion.perfectPoint) {
                    this.isPerfectPoint = true;
                }
                this.showModal = true;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['questionsAndAnswers']) {
            this.initializeMap();
            this.counterQuestions.set(this.questionsAndAnswers().length);
        }
    }

    initializeMap() {
        const questionIds = this.questionsAndAnswers().map(
            (question) => question.id
        );
        this.questionService.initializeQuestionStatusInFalse(questionIds);
        this.questionService.initializePointInZero(questionIds);
    }

    getCorrectAnswerText(answers: Answer[]): string {
        const correctAnswer = answers.find((answer) => answer.isCorrect);
        return correctAnswer ? correctAnswer.text : '';
    }

    // Manejar la selección de una respuesta
    onQuestionSelected(questionId: string, response: Answer) {
        this.counterQuestions.update((value) => value - 1);
        this.questionService.setQuestionSelectedStatus(questionId, true); // Actualizar el estado en el servicio

        if (response.isCorrect) {

            if (!this.isSecondChance()) {

                this.questionService.addPointsInQuestion(
                    questionId,
                    pointsQuestion.correct
                );

                this.messagePoindClaimed(
                    this.questionService.getPoinntTheQuestion(questionId)
                );
                return;
            }

            this.questionService.addPointsInQuestion(
                questionId,
                pointsQuestion.correctSch
            );

            this.messagePoindClaimed(
                this.questionService.getPoinntTheQuestion(questionId)
            );
            return;
        }

        if (this.isUsedHint()) {
            this.questionService.addPointsInQuestion(
                questionId,
                pointsQuestion.disableHint
            );
            this.isUsedHint.set(false);
        }
        this.incorrectsQuestionsMap().set(questionId, false);
    }

    onUsedHintEvent(questionId: string, isUsedHint: boolean) {
        this.isUsedHint.set(isUsedHint);
        this.questionService.addPointsInQuestion(
            questionId,
            pointsQuestion.usedHint
        );
    }

    showMessage(severity: string, title: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: title,
            detail: detail,
        });
    }

    messagePoindClaimed(points: number) {
        this.showMessage('success', '¡Ganaste!', `${points} puntos.`);
    }

    goToSecondChance(initSecondChance: boolean) {
        if (!this.isPerfectPoint) {
            this.isSecondChance.set(initSecondChance);
            this.questionService.setNewValueSecondChange(
                this.incorrectsQuestionsMap()
            );
            this.showModal = false;
            this.onIncorrectsCuestions.emit(this.incorrectsQuestionsMap());
            return;
        }
        this.goToHome(true);
    }

    goToHome(isFinishedSecondChange: boolean) {
        this.onPointsWinned.emit(this.questionService.totalPointsLesson());
        this.routerService.navigateByUrl('/');
    }
}
