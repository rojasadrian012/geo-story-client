import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnChanges,
    SimpleChanges,
    input,
    inject,
    signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';

import {
    Answer,
    QuestionListResponse,
} from '../../interfaces/question-list-response.interface';
import { TitleComponent } from '../title/title.component';
import { SelectedAnswerComponent } from '../selected-answer/selected-answer.component';
import { QuestionService } from '../../services/question.service';
import { HintComponent } from '../hint/hint.component';

@Component({
    selector: 'app-questions-and-answers',
    standalone: true,
    imports: [TitleComponent, SelectedAnswerComponent, HintComponent],
    templateUrl: './questions-and-answers.component.html',
    styles: `

  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsAndAnswersComponent implements OnChanges {
    public questionsAndAnswers = input.required<QuestionListResponse[]>();

    public questionService = inject(QuestionService);

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
        console.log(questionId ,response);
        this.questionService.setQuestionSelectedStatus(questionId, true); // Actualizar el estado en el servicio
    }

    onUsedHintEvent(isUsedHint: boolean) {
        console.log(isUsedHint);
    }
}
