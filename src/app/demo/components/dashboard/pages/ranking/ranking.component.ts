import { CommonModule, JsonPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { RankingItemComponent } from '../../components/ranking-item/ranking-item.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersRankingAndCurrentUser } from '../../interfaces/users-ranking-and-current-user.interface';

@Component({
    selector: 'app-ranking',
    standalone: true,
    imports: [
        CommonModule,
        GeoCenterContainerComponent,
        RankingItemComponent,
        JsonPipe,
    ],
    templateUrl: './ranking.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent implements OnInit {
    private readonly http = inject(HttpClient);

    public users = signal<UsersRankingAndCurrentUser | undefined>(undefined);

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
            });
    }
}
