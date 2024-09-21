import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'geo-loading',
    standalone: true,
    imports: [],
    template: `
        <div class="loader-container">
            <span class="loader"></span>
            <p class="loader-text">Cargando...</p>
        </div>
    `,
    styles: [`
        @keyframes loader {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }

        .loader-container {
            width: 100%;
            height: 100vh; /* Ocupa toda la altura de la ventana */
            display: flex;
            flex-direction: column; /* Alinea loader y texto verticalmente */
            justify-content: center; /* Centra verticalmente */
            align-items: center; /* Centra horizontalmente */
            position: relative;
        }

        .loader {
            width: 48px;
            height: 48px;
            border: 1rem solid var(--primary-color);
            border-radius: 50%;
            animation: loader 1s linear infinite;
            margin-bottom: 1rem; /* Espacio entre el loader y el texto */
        }

        .loader-text {
            color: var(--text-color-secondary);
            font-weight: 700;
            font-size: 1.5rem;
            text-align: center;
        }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoLoadingComponent { }
