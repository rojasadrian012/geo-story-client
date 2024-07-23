import { CommonModule, NgClass, NgSwitch } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { RankingUser } from '../../interfaces/users-ranking-and-current-user.interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-ranking-item',
    standalone: true,
    imports: [NgClass, NgSwitch],
    templateUrl: './ranking-item.component.html',
    styleUrl: './ranking-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingItemComponent {
    public user = input.required<RankingUser>();
    
    public layoutService = inject(LayoutService)
}
