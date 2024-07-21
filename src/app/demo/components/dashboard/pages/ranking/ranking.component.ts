import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-ranking',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ranking.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent { }
