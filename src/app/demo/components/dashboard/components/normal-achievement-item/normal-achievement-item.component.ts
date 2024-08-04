import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Achievement } from "../../pages/achievement/interfaces/achievement-list-response.interface";

@Component({
    selector: 'app-normal-achievement-item',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './normal-achievement-item.component.html',
    styleUrl: './normal-achievement-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalAchievementItemComponent {
    achievement = input.required<Achievement>();
}
