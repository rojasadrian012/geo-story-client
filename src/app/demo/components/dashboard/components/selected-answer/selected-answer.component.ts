import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
    signal,
} from '@angular/core';

import { Answer } from '../../interfaces/question-list-response.interface';
import { SoundsService } from '../../services/sounds.service';

@Component({
    selector: 'app-selected-answer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selected-answer.component.html',
    styleUrl: './selected-answer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedAnswerComponent {
    public answer = input.required<Answer>();
    public isDisable = input<boolean>(false);
    public selected = output<Answer>();

    private soundService = inject(SoundsService);

    public currentClass = signal({
        option_container: true,
        option_container_correct: false,
        option_container_incorrect: false,
    });

    selectedOption(response: Answer) {
        
        if (this.isDisable()) return;

        if (response.isCorrect) this.soundService.playCorrectSound();
        else this.soundService.playIncorrectSound();

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
}
