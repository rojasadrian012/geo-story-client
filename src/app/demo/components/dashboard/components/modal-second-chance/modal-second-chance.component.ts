import { ChangeDetectionStrategy, Component, Input, OnInit, input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { DialogModule } from "primeng/dialog";

@Component({
    selector: 'app-modal-second-chance',
    standalone: true,
    imports: [
        DialogModule,
        LottieComponent,
    ],
    template: `
        <p-dialog
            header="¡Vaya! Te has equivocado en algunas de las preguntas"
            [modal]="true"
            [(visible)]="show"
            [style]="{ width: '50rem' }"
            styleClass="text-center"
            [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
        >
            <ng-lottie
                class="lottie-container"
                [options]="options"
                width="500px"
                height="500px"
            />
            <h2 class="my-5">Puntos altualmente: <strong>{{points()}}</strong></h2>
            <div class="info-container">

                <button
                    class="bg-primary-reverse border-round-xl text-2xl border-dotted border-primary p-3 hover:bg-primary"
                    (click)="goToSecondChance()"
                >
                        ¡Iniciemos una segunda oportunidad!
                </button>
            </div>
        </p-dialog>
    `,
    styles:`

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
export class ModalSecondChanceComponent {

    @Input({
        required: true
    })
    public show: boolean;
    public points = input.required<number>();

    public options: AnimationOptions = {
        path: '/assets/images/animations/dos.json'
    };

    goToSecondChance(){
        console.log("Vamos a la segunda oportunidad");
        this.show = false;
    }

}
