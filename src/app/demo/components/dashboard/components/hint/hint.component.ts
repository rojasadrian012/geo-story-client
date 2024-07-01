import { CommonModule, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-hint',
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
    ],
    template: `
        <div class="hint my-3 hint-container">
                <p-button label="Mostrar Pista" [outlined]="true" severity="secondary" class="hint-button"
                    (click)="toggleHint()" [disabled]="disable()">
                    <div class="mr-2">
                        <img src="assets/layout/images/mostrar-pista.svg" alt="mostrar pista">
                    </div>
                </p-button>
                @if (showHint()) {
                    <p class="ml-2 text-color-secondary text-xl">
                        {{textHint()}}
                    </p>
                }
            </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent {

    public textHint = input.required<string>();
    public changeHint = output<boolean>();
    public showHint = input.required<boolean>();
    public disable = input.required<boolean>();


    private valueTogglee = signal(false);

    toggleHint() {
        this.changeHint.emit(!this.valueTogglee())
    }
}
