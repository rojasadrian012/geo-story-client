import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-title',
    standalone: true,
    imports: [],
    template: `
        <h3 class="title">
            {{ title() }}
        </h3>
    `,
    styles:`

        .title {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-top: 0;
            font-weight: 700;
        }

       @media (max-width: 768px) {
            .title {
                font-size: 1.5rem;
                font-weight: 400;
            }
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
    public title = input.required<string>();
}
