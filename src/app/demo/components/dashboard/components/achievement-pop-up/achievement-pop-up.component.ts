import { CommonModule, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { style } from '@angular/animations';
import { PopUpService } from "./services/pop-up.service";

@Component({
    selector: 'app-achievement-pop-up',
    standalone: true,
    imports: [
        NgIf,
    ],
    templateUrl: './achievement-pop-up.component.html',
    styleUrl: './achievement-pop-up.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementPopUpComponent {

    public showNewAchievement = input.required<boolean>();

    public popUpService = inject(PopUpService);

}
