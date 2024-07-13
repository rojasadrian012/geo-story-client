import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnChanges,
    output,
    signal,
    SimpleChanges,
} from '@angular/core';

import { Answer } from '../../interfaces/question-list-response.interface';
import { SoundsService } from '../../services/sounds.service';
import { QuestionService } from '../../services/question.service';

@Component({
    selector: 'app-selected-answer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selected-answer.component.html',
    styleUrl: './selected-answer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedAnswerComponent implements OnChanges {
    public answer = input.required<Answer>();
    public correctResponse = input.required<string>();
    public isDisable = input<boolean>(false);
    public selected = output<Answer>();
    public isSecondChance = input<boolean>(false);


    private readonly soundService = inject(SoundsService);

    public showResponse = signal<boolean>(false);
    public textIntro = signal<string>('');
    public currentClass = signal({
        option_container: true,
        option_container_correct: false,
        option_container_incorrect: false,
    });
    public textsCorrects = signal([
        '¡Bien hecho!',
        '¡Excelente trabajo!',
        '¡Correcto! ¡Sigue así!',
    ]);
    public textsIncorrects = signal([
        '¡Casi!, La respuesta correcta es:',
        '¡Inténtalo de nuevo!, La respuesta correcta es:',
        '¡No te rindas!, La respuesta correcta es:',
    ]);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isSecondChance'])
            this.resetValues();
    }
    getRandomResponse(responses: string[]): string {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }

    selectedOption(response: Answer) {
        console.log(this.isDisable());

        if (this.isDisable()) return;

        if (response.isCorrect) {
            this.soundService.playCorrectSound();
            this.textIntro.set(this.getRandomResponse(this.textsCorrects()));
        } else {
            this.soundService.playIncorrectSound();
            this.textIntro.set(this.getRandomResponse(this.textsIncorrects()));
        }

        this.showResponse.set(true);

        if (response.isCorrect) {
            this.currentClass.update((value) => ({
                ...value,
                option_container_correct: true,
                option_container: false,
            }));
        } else {
            this.currentClass.update((value) => ({
                ...value,
                option_container_incorrect: true,
                option_container: false,
            }));
        }

        this.selected.emit(response);
    }

    resetValues() {
        this.currentClass.update((value) => ({
            option_container: true,
            option_container_incorrect: false,
            option_container_correct: false,
        }));

        this.showResponse.set(false);
    }
}
