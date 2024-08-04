import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { AchievementItemComponent } from '../../components/achievement-item/achievement-item.component';
import { DataInput } from '../../components/achievement-item/interfaces/data-inputs.interface';
import { style } from '@angular/animations';
import { AchievementPageService } from './services/achievement-page.service';
import { Achievement, AchievementCurrentUser } from './interfaces/achievement-list-response.interface';
import { NgFor } from '@angular/common';
import { NormalAchievementItemComponent } from '../../components/normal-achievement-item/normal-achievement-item.component';

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [
        NgFor,

        GeoCenterContainerComponent,
        AchievementItemComponent,
        NormalAchievementItemComponent,
    ],
    templateUrl: './achievement.component.html',
    styles: `
        .ul-container{
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin: 3rem 0;
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
export class ArcheivementComponent implements OnInit {

    private readonly achievementsService = inject(AchievementPageService);

    public achievementsCurrentUser = signal<AchievementCurrentUser[]>([]);
    public allAchievements = signal<Achievement[]>([]);


    ngOnInit(): void {
        this.getAchievements();
    }

    getAchievements() {
        this.achievementsService.getAchievementsByUser()
            .subscribe({
                next: (response) => {
                    console.log({response});
                    this.achievementsCurrentUser.set(response.achievementsCurrentUser);
                    this.allAchievements.set(response.allAchievements);

                },
                error: (error) => console.error(error),
            })
    }

}


