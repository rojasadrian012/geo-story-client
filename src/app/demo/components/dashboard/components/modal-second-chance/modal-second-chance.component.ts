import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, input, output, signal } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { DialogModule } from "primeng/dialog";

@Component({
    selector: 'app-modal-second-chance',
    standalone: true,
    imports: [
        DialogModule,
        LottieComponent,
        NgIf
    ],
    templateUrl: './modal-second-chance.component.html',
    styles: `

        .lottie-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .info-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 20px; /* Ajusta el margen según sea necesario */
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSecondChanceComponent implements OnChanges {

    @Input({
        required: true
    })
    public show: boolean;
    public points = input.required<number>();

    public isSecondChance = input.required<boolean>();
    public isPerfectPoint = input.required<boolean>();
    public onSecondChange = output<boolean>();

    public titleModal = signal<string>('¡Vaya! Te has equivocado en algunas de las preguntas');
    public buttonText = signal<string>('¡Iniciemos una segunda oportunidad!');
    public options: AnimationOptions = {
        path: '/assets/images/animations/dos.json'
    };


    ngOnChanges() {
        if (this.isPerfectPoint()) {
            this.options = { ...this.options, path: '/assets/images/animations/creativo.json' };
            this.titleModal.set('¡Genial! Obtuviste una puntuación Perfecta');
            this.buttonText.set('¡Pasemos al Siguiente Nivel!');
        }

        if (this.isSecondChance()) {
            this.options = { ...this.options, path: '/assets/images/animations/decision-correcta.json' };
            this.titleModal.set('¡Buen trabajo!');
            this.buttonText.set('Finalizar esta segunda oportunidad');
        }
    }
    goToSecondChance() {
        if (!this.isPerfectPoint())
            this.onSecondChange.emit(true);
        this.show = false;
    }



}
