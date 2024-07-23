import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-geo-center-container',
    standalone: true,
    imports: [],
    template: `
        <div class="div-container card">
            <main class="main-content">
                    <div class="col-12 lg:col-12 xl:col-12">

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
            // padding-top: 1.5rem;
            margin: auto;
            // margin-bottom: 6rem;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            // color: rgb(255, 255, 255);
        }

        @media (min-width: 768px) {
            .main-content {
                padding-left: 0.75rem;
                padding-right: 0.75rem;
            }
        }

        @media (min-width: 1024px) {
            .main-content {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
            }
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoCenterContainerComponent { }
