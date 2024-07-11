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
                <p-button 
                    label="Mostrar Pista" 
                    [outlined]="true" 
                    severity="secondary" 
                    class="hint-button"
                    (click)="onShowHint()" 
                    [disabled]="showHint()"
                >
                    <div class="mr-2">
                        <img 
                            src="assets/layout/images/mostrar-pista.svg" 
                            alt="mostrar pista"
                        >
                    </div>
                </p-button>
                @if (showHint()) {
                    <small class="ml-3">
                        {{textHint()}}
                    </small>
                }
            </div>
    `,
    styles:`
        .hint-container {
            display: flex;
            align-items: center;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent {

    public textHint = input.required<string>();

    public showHint = signal<boolean>(false)

    public onShowHint(){
        this.showHint.set(true)
    }
}
