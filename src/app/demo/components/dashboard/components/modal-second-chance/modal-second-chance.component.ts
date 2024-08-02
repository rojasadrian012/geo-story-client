import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    inject,
    input,
    model,
    output,
    signal,
} from '@angular/core';

import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { DialogModule } from 'primeng/dialog';

import { LessonService } from '../../pages/lesson/services/lesson.service';
import { ModalChances, ModalData } from './interfaces/modal-data.interface';
import { LevelStatus } from '../../pages/lesson/interfaces/level-status.enum';

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
    @Input({ required: true }) public show: boolean;

    public modalData = input.required<ModalData>();
    public onModalChances = output<ModalChances>();

    public isVisible = model<boolean>(false);

    public readonly lessonService = inject(LessonService);

    public titleModal = signal<string>(
        '¡Vaya! Te has equivocado en algunas de las preguntas'
    );
    public buttonText = signal<string>('¡Iniciemos una segunda oportunidad!');
    public options: AnimationOptions = {
        path: '/assets/images/animations/dos.json',
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['modalData']) {
            if (this.modalData().isPerfectPoint) {
                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/creativo.json',
                };
                this.titleModal.set(
                    '¡Genial! Obtuviste una puntuación Perfecta'
                );
                this.buttonText.set('¡Pasemos al Siguiente Nivel!');
            }

            if (this.modalData().isSecondChance) {
                if (this.modalData().points < 12) {
                    this.options = {
                        ...this.options,
                        path: '/assets/images/animations/juego-terminado.json',
                    };
                    this.titleModal.set(
                        '¡Casi desbloqueas el siguiente nivel!'
                    );
                    this.buttonText.set('Intentar de nuevo');
                    return;
                }
                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/decision-correcta.json',
                };
                this.titleModal.set('¡Buen trabajo!');
                this.buttonText.set('Finalizar esta segunda oportunidad');
            }

            if (this.modalData().isPerfectPointUsingHint) {
                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/foco.json',
                };
                this.titleModal.set('¡Vaya! !Respondiste bien todas!');
                this.buttonText.set('Vamos al siguiente!');
            }
        }

        // if (changes['show']) this.showModalWithDelay();
    }

    showModalWithDelay() {
        if (this.show) {
            setTimeout(() => {
                this.isVisible.set(true);
            }, 2000);
        } else {
            this.isVisible.set(false);
        }
    }

    goToSecondChance() {
        this.onModalChances.emit({
            secondChange: true,
            fishSecondChange: this.modalData().isSecondChance,
        });

        if (this.modalData().isSecondChance) {
            this.lessonService.isUnLockedNextLevel = LevelStatus.NO_ASIGNED;
        }

        this.show = false;
    }
}
