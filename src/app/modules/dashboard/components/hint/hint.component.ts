import { CommonModule, NgIf } from '@angular/common';
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
import { ButtonModule } from 'primeng/button';
import { SoundsService } from '../../services/sounds.service';

@Component({
    selector: 'app-hint',
    standalone: true,
    imports: [ButtonModule, NgIf],
    template: `
        <div class="my-3 hint-container">
            <p-button
                label="Mostrar Pista"
                [outlined]="true"
                severity="secondary"
                class="hint-button"
                (click)="onShowHint()"
                [disabled]="disable() || showHint()"
            >
                <div class="mr-2">
                    <img
                        src="assets/layout/images/mostrar-pista.svg"
                        alt="mostrar pista"
                    />
                </div>
            </p-button>
            @if (showHint()) {
            <small class="ml-3 text-lg font-semibold text-color-secondary">
                {{ textHint() }}
            </small>
            }
        </div>
    `,
    styles: `
        .hint-container {
            display: flex;
            align-items: center;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isSecondChance']) this.resetValues();
    }

    public textHint = input.required<string>();
    public disable = input.required<boolean>();
    public usedHint = output<boolean>();
    public isSecondChance = input<boolean>(false);

    private readonly soundService = inject(SoundsService);

    public showHint = signal<boolean>(false);

    public onShowHint() {
        this.soundService.playPianoSound();
        this.showHint.set(true);
        this.usedHint.emit(true);
    }

    private resetValues() {
        this.showHint.set(false);
    }
}
