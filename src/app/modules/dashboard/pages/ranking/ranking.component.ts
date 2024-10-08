import { NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { RankingItemComponent } from '../../components/ranking-item/ranking-item.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersRankingAndCurrentUser } from '../../interfaces/users-ranking-and-current-user.interface';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

@Component({
    selector: 'app-ranking',
    standalone: true,
    imports: [
        NgIf,
        NgFor,

        GeoCenterContainerComponent,
        RankingItemComponent,
        GeoLoadingComponent,
    ],
    templateUrl: './ranking.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RankingComponent implements OnInit {
    private readonly http = inject(HttpClient);

    public users = signal<UsersRankingAndCurrentUser | undefined>(undefined);
    public showRanking = signal<boolean>(false);

    ngOnInit(): void {
        this.getUsersRankingAndCurrentUser();
    }

    getUsersRankingAndCurrentUser() {
        this.http
            .get<UsersRankingAndCurrentUser>(
                `${environment.baseUrl}/quiz/ranking`
            )
            .subscribe({
                next: (users) => {
                    this.users.set(users);
                    this.showRanking.set(true);
                },
            });
    }
}
