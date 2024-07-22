import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { RankingUser } from '../../interfaces/users-ranking-and-current-user.interface';

@Component({
    selector: 'app-ranking-item',
    standalone: true,
    imports: [CommonModule, NgClass],
    templateUrl: './ranking-item.component.html',
    styleUrl: './ranking-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingItemComponent {
    public user = input.required<RankingUser>();
}
