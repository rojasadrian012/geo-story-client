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
import { environment } from 'src/environments/environment';

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

    //TODO: Refactorizar.
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['modalData']) {
            if (
                this.modalData().isFinishLevel &&
                this.modalData().isPerfectPoint
            ) {
                if (this.show)
                    this.showModalWithDelay()

                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/control-de-juego-perfect.json',
                };
                this.titleModal.set(`¡Pasaste el último nivel como genio!`);
                this.buttonText.set('¡Finalizar!');
                return;
            }

            if (
                this.modalData().isFinishLevel &&
                this.modalData().isPerfectPointUsingHint
            ) {

                if (this.show)
                    this.showModalWithDelay()

                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/control-de-juego-hint.json',
                };
                this.titleModal.set(
                    `¡Pasaste el último nivel sin equivocarte!`
                );
                this.buttonText.set('¡Finalizar Juego!');
                return;
            }

            if (this.modalData().isFinishLevel) {
                if (this.modalData().isSecondChance) {
                    if (this.show)
                        this.showModalWithDelay()

                    if (this.modalData().points < 12) {
                        this.options = {
                            ...this.options,
                            path: '/assets/images/animations/ojo.json',
                        };
                        this.titleModal.set('¡Casi, animo es el ulitmo nivel!');
                        this.buttonText.set('Intentar de nuevo');
                        return;
                    }
                    this.options = {
                        ...this.options,
                        path: '/assets/images/animations/juego-de-aventuras-finish.json',
                    };
                    this.titleModal.set('¡Pasaste el último nivel!');
                    this.buttonText.set('Finalizar');
                    return;
                }
            }

            if (this.modalData().isPerfectPoint) {
                if (this.show)
                    this.showModalWithDelay()

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

                console.log('ojo');

                if (this.show)
                    this.showModalWithDelay()

                if (this.modalData().points < 12) {
                    this.options = {
                        ...this.options,
                        path: '/assets/images/animations/ojo.json',
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
                return;
            }

            if (this.modalData().isPerfectPointUsingHint) {
                if (this.show)
                    this.showModalWithDelay()

                this.options = {
                    ...this.options,
                    path: '/assets/images/animations/foco.json',
                };
                this.titleModal.set('¡Vaya! !Respondiste bien todas!');
                this.buttonText.set('Vamos al siguiente!');
            }
        }

        if (changes['show']) {
            this.showModalWithDelay();
        }
    }

    showModalWithDelay() {
        if (this.show) {
            setTimeout(() => {
                this.isVisible.set(true);
            }, environment.timeModal);
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
        this.isVisible.set(false);
    }
}
