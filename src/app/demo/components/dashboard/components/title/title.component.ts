import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-title',
    standalone: true,
    imports: [],
    template: `
        <h3 class="text-2xl text-primary mt-0 mb-4">
            {{ title() }}
        </h3>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
    public title = input.required<string>();
}
