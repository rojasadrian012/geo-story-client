import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Answer, QuestionListResponse } from "../../interfaces/question-list-response.interface";
import { TitleComponent } from '../title/title.component';
import { SelectedAnswerComponent } from '../selected-answer/selected-answer.component';

@Component({
    selector: 'app-questions-and-answers',
    standalone: true,
    imports: [
        JsonPipe,
        TitleComponent,
        SelectedAnswerComponent
    ],
    templateUrl: './questions-and-answers.component.html',
    styles: `

  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsAndAnswersComponent implements OnChanges {
    public questionsAndAnswers = input.required<QuestionListResponse[]>()

    public isAnswerSelectedMap: { [questionId: string]: boolean } = {}; //ojo es si ya respondió, true no implica que haya respondido de manera correcta

    ngOnChanges(changes: SimpleChanges) {
        if (changes['questionsAndAnswers']) {
            this.initializeMap();
        }
    }

    initializeMap() {
        this.isAnswerSelectedMap = {};
        this.questionsAndAnswers().forEach(question => {
            this.isAnswerSelectedMap[question.id] = false;
        });
        console.log({ initial: this.isAnswerSelectedMap });
    }


    onAnswerSelected(questionId: string, response: Answer) {
        this.isAnswerSelectedMap[questionId] = true; // Marcar que ya se seleccionó una respuesta para esta pregunta
    }

}
