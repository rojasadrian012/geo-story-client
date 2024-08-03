import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DataInput } from './interfaces/data-inputs.interface';
import { AchievementListResponse } from '../../pages/achievement/interfaces/achievement-list-response.interface';

@Component({
    selector: 'app-achievement-item',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './achievement-item.component.html',
    styleUrl: './achievement-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementItemComponent {
    achievement = input.required<AchievementListResponse>();
}
