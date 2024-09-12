import { JsonPipe, NgFor, NgIf } from '@angular/common';
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
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { GeoLoadingComponent } from '../../components/core/geo-loading/geo-loading.component';

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
export class RankingComponent implements OnInit {
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
            .subscribe((data) => {
                this.users.set(data);
                this.showRanking.set(
                    data.rankingUsers.some(
                        (user) => parseInt(user.score, 10) > 0
                    )
                );
            });
    }
}
