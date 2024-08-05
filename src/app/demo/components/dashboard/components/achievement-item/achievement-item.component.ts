import { DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    OnInit,
    signal,
} from '@angular/core';
import { AchievementCurrentUser } from '../../pages/achievement/interfaces/achievement-list-response.interface';

@Component({
    selector: 'app-achievement-item',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './achievement-item.component.html',
    styleUrl: './achievement-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe],
})
export class AchievementItemComponent implements OnInit {
    achievement = input.required<AchievementCurrentUser>();

    dateFormated = signal<string>('');

    constructor(private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.formatDate();
    }

    formatDate() {
        const achievementDate = new Date(this.achievement().date);
        
        const paraguayTime = new Date(
            achievementDate.getTime() - 4 * 60 * 60 * 1000
        );

        this.dateFormated.set(
            this.datePipe.transform(paraguayTime, 'EEEE, d \'de\' MMMM \'de\' y, H:mm:ss', undefined, 'es')
        );
    }
}
