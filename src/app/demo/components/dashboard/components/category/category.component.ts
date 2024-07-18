import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnChanges,
    OnInit,
    signal,
    SimpleChanges,
} from '@angular/core';
import { QuizListResponse } from '../../interfaces/quiz-list-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { LevelByUser } from '../../interfaces/levels-by-user.interface';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [NgClass],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {

    //TODO: hacer que las imagenes vengan de bd.
    public images = input.required<string[]>();
    public levels = input.required<LevelByUser[]>();
    
    public readonly router = inject(Router);

    changePath(level: LevelByUser, unlockLevel: boolean) {        
        if (!unlockLevel) return;
        this.router.navigateByUrl(
            `lesson/${level.quizId.title}/${level.id}`
        );
    }
}
