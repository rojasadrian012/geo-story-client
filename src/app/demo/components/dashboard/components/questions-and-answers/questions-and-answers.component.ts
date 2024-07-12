import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    SimpleChanges,
    input,
    inject,
    signal,
    effect,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import {
    Answer,
    QuestionListResponse,
} from '../../interfaces/question-list-response.interface';
import { TitleComponent } from '../title/title.component';
import { SelectedAnswerComponent } from '../selected-answer/selected-answer.component';
import { QuestionService } from '../../services/question.service';
import { HintComponent } from '../hint/hint.component';
import { ModalSecondChanceComponent } from '../modal-second-chance/modal-second-chance.component';

@Component({
    selector: 'app-questions-and-answers',
    standalone: true,
    imports: [TitleComponent, SelectedAnswerComponent, HintComponent, ModalSecondChanceComponent,],
    templateUrl: './questions-and-answers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsAndAnswersComponent implements OnChanges {
    public questionsAndAnswers = input.required<QuestionListResponse[]>();

    public readonly questionService = inject(QuestionService);
    private readonly messageService = inject(MessageService);

    public isTwoTentative = signal<boolean>(false);
    public showModal = false;
    private counterQuestions = signal<number>(-1);
    private ignoreFirstZero = true;
    public pointLesson = 0;

    constructor() {
        effect(() => {

            if (this.counterQuestions() === 0 && this.ignoreFirstZero) {
                this.ignoreFirstZero = false;
                return;
            }

            if (this.counterQuestions() === 0 && !this.ignoreFirstZero) {
                this.pointLesson = this.questionService.totalPointsLesson()
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
            this.questionService.addPointsInQuestion(questionId, 4);
            this.messagePoindClaimed(this.questionService.getPoinntTheQuestion(questionId));
        }
    }

    onUsedHintEvent(questionId: string, isUsedHint: boolean) {
        this.questionService.addPointsInQuestion(questionId, -1);
    }

    showMessage(severity: string, title: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: title,
            detail: detail,
        });
    }

    messagePoindClaimed(points: number) {
        this.showMessage('success', '¡Ganaste!', `${points} puntos.`)
    }

}
