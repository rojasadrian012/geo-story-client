import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-geo-center-container',
    standalone: true,
    imports: [NgIf],
    template: `
        <div class="div-container card">
            <main class="main-content">
                <div class="col-12 lg:col-12 xl:col-12 none-padding">
                    @if (title()) {
                    <h2 class="font-bold text-color-secondary">
                        {{ title() }}
                    </h2>
                    }

                    <ng-content></ng-content>
                </div>
            </main>
        </div>
    `,
    styles: `
        .div-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // min-height: 100vh;
        }

        @media (min-width: 768px) {
            .div-container {
                flex-direction: row;
            }
        }

        .main-content {
            width: 100%;
            max-width: 70rem;
            min-width: 0;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            margin: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @media (max-width: 640px) {
            .main-content {
                padding:0;
            }

            .none-padding{
                padding:0;
            }

            .card{
                padding-left:1.5rem;
                padding-right:1.5rem;
            }

        }


    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoCenterContainerComponent {
    public title = input<string>('');
}
