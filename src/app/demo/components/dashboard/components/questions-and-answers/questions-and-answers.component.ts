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
import { environment } from 'src/environments/environment';

enum pointsQuestion {
    perfectScore = 20,
    perfectScoreMinUsingHint = 15,
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

    public isSecondChance = signal(false);
    public isUsedHint = signal(false);
    private incorrectsQuestionsMap = signal<Map<string, boolean>>(
        new Map<string, boolean>()
    );
    public showModal = false;
    private ignoreFirstZero = true;
    public isPerfectPoint = false;
    public isPerfectPointUsingHint = false;

    constructor() {
        effect(() => {
            if (this.questionService.numberOfQuestions() === 0) {
                if (
                    this.questionService.totalPointsLesson() ===
                    pointsQuestion.perfectScore
                ) {
                    this.isPerfectPoint = true;
                    this.showModal = true;
                    return;
                }

                if (
                    this.questionService.totalPointsLesson() >=
                    pointsQuestion.perfectScoreMinUsingHint
                ) {
                    this.isPerfectPointUsingHint = true;
                    this.showModal = true;
                    return;
                }

                this.showModal = true;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['questionsAndAnswers']) {
            this.initializeMap();
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
        this.questionService.numberOfQuestions.update((value) => value - 1);
        this.questionService.setQuestionSelectedStatus(questionId, true);

        if (response.isCorrect) {
            if (this.isUsedHint()) this.isUsedHint.set(false);

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
        if (this.isPerfectPoint || this.isPerfectPointUsingHint) {
            this.goToHome(true);
            return;
        }

        this.isSecondChance.set(initSecondChance);
        this.questionService.setNewValueSecondChange(
            this.incorrectsQuestionsMap()
        );
        this.showModal = false;
        this.onIncorrectsCuestions.emit(this.incorrectsQuestionsMap());
        return;
    }

    goToHome(isFinishedSecondChange: boolean) {
        this.onPointsWinned.emit(this.questionService.totalPointsLesson());
        this.routerService.navigateByUrl('/');
    }
}
