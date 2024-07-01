import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-title',
    standalone: true,
    imports: [],
    template: `
      <h3 class="font-bold text-2xl">{{ title() }}</h3>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
    public title = input.required<string>()
}
