import {
    ChangeDetectionStrategy,
    Component,
    signal,
    inject,
    OnInit,
} from '@angular/core';
import { NgFor } from '@angular/common';

import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { AchievementItemComponent } from '../../components/achievement-item/achievement-item.component';
import { AchievementPageService } from './services/achievement-page.service';
import {
    Achievement,
    AchievementCurrentUser,
} from './interfaces/achievement-list-response.interface';
import { NormalAchievementItemComponent } from '../../components/normal-achievement-item/normal-achievement-item.component';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [
        NgFor,

        GeoCenterContainerComponent,
        AchievementItemComponent,
        NormalAchievementItemComponent,
        GeoLoadingComponent,
    ],
    templateUrl: './achievement.component.html',
    styles: `
        .ul-container{
            display: grid;
            grid-template-columns: 1fr;
            // gap: 3rem;
            margin: 1rem 0;
            padding:0;
        }

        @media (min-width: 640px) {
            .ul-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArcheivementComponent implements OnInit {
    private readonly achievementsService = inject(AchievementPageService);

    public achievementsCurrentUser = signal<AchievementCurrentUser[]>([]);
    public allAchievements = signal<Achievement[]>([]);
    public currentUserName = signal<string | null>(null);
    public show = signal(false);

    ngOnInit(): void {
        this.getAchievements();
        this.getcurrentUser();
    }

    getcurrentUser() {
        this.currentUserName.set(
            localStorage.getItem('currentUserName')
                ? localStorage.getItem('currentUserName')
                : null
        );
    }
    getAchievements() {
        this.achievementsService.getAchievementsByUser().subscribe({
            next: (response) => {
                this.achievementsCurrentUser.set(
                    response.achievementsCurrentUser
                );
                this.allAchievements.set(response.achievementsNoUnlocked);
                this.show.set(true);
            },
            error: (error) => console.error(error),
        });
    }
}
