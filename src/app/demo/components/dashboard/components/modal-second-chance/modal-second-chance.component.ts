import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { DialogModule } from 'primeng/dialog';
import { LessonService } from '../../pages/lesson/services/lesson.service';

@Component({
    selector: 'app-modal-second-chance',
    standalone: true,
    imports: [DialogModule, LottieComponent, NgIf],
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

        ::ng-deep .p-dialog-title {
            font-size: 1.75rem;
            color: var(--text-color-secondary);
            text-align: center !important;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSecondChanceComponent implements OnChanges {
    @Input({
        required: true,
    })
    public show: boolean;

    public points = input.required<number>();
    public isSecondChance = input.required<boolean>();
    public isPerfectPoint = input.required<boolean>();
    public isPerfectPointUsingHint = input.required<boolean>();
    public onSecondChange = output<boolean>();
    public onFishSecondChange = output<boolean>();

    public readonly lessonService = inject(LessonService);

    public titleModal = signal<string>(
        '¡Vaya! Te has equivocado en algunas de las preguntas'
    );
    public buttonText = signal<string>('¡Iniciemos una segunda oportunidad!');
    public options: AnimationOptions = {
        path: '/assets/images/animations/dos.json',
    };

    ngOnChanges() {
        if (this.isPerfectPoint()) {
            this.options = {
                ...this.options,
                path: '/assets/images/animations/creativo.json',
            };
            this.titleModal.set('¡Genial! Obtuviste una puntuación Perfecta');
            this.buttonText.set('¡Pasemos al Siguiente Nivel!');
        }

        if (this.isSecondChance()) {
            if (!this.lessonService.isUnLockedNextLevel) {
                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/juego-terminado.json',
                };
                this.titleModal.set('¡Casi desbloqueas el siguiente nivel!');
                this.buttonText.set('Intentar de nuveo');
                return;
            }
            this.options = {
                ...this.options,
                path: '/assets/images/animations/decision-correcta.json',
            };
            this.titleModal.set('¡Buen trabajo!');
            this.buttonText.set('Finalizar esta segunda oportunidad');
        }

        if (this.isPerfectPointUsingHint()) {
            this.options = {
                ...this.options,
                path: '/assets/images/animations/foco.json',
            };
            this.titleModal.set('¡Vaya! !Respondiste bien todas!');
            this.buttonText.set('Vamos al siguiente!');
        }
    }
    goToSecondChance() {
        this.onSecondChange.emit(true);

        if (this.isSecondChance()) this.onFishSecondChange.emit(true);

        this.lessonService.isUnLockedNextLevel = false;
        this.show = false;
    }
}
