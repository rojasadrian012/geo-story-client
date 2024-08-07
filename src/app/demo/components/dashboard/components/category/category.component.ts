import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
    OnChanges,
    AfterViewInit,
    QueryList,
    SimpleChanges,
    ViewChildren,
    signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LevelByUser } from '../../interfaces/levels-by-user.interface';
import { QuizStatusService } from '../../services/quizStatus.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from './services/category.service';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        NgClass,
        // NgOptimizedImage
    ],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements AfterViewInit, OnChanges {
    public levels = input.required<LevelByUser[]>();

    public readonly router = inject(Router);
    public readonly quizStatusService = inject(QuizStatusService);
    public readonly categoryService = inject(CategoryService);

    public lastUnlockedIndex = signal<number>(-1);
    public hostApi = signal<string>(environment.baseUrl + '/files/vehicle/');

    @ViewChildren('level') levelsElements!: QueryList<ElementRef>;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['levels']) {
            this.delayedScrollToLastUnlockedLevel();
        }
    }

    ngAfterViewInit(): void {
        this.delayedScrollToLastUnlockedLevel();
    }

    private delayedScrollToLastUnlockedLevel(): void {
        // Usamos setTimeout para retrasar la ejecución y dar tiempo a Angular para renderizar los elementos
        setTimeout(() => {
            this.scrollToLastUnlockedLevel();
        }, 500); // Ajusta el tiempo según sea necesario
    }

    private scrollToLastUnlockedLevel(): void {
        if (this.levelsElements && this.levelsElements.length > 0) {
            this.lastUnlockedIndex.set(
                this.levels()
                    .map((level) => level.unlockLevel)
                    .lastIndexOf(true)
            );

            if (this.lastUnlockedIndex() !== -1) {
                const element =
                    this.levelsElements.toArray()[this.lastUnlockedIndex()]
                        .nativeElement;

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            console.error('No hay elementos en levelsElements aún.');
        }
    }

    changePath(level: LevelByUser, unlockLevel: boolean) {
        if (!unlockLevel) return;
        localStorage.removeItem('finishChange')

        if (level.quiz.difficulty == 6) //TODO: Se tendria que poner los numeros en variables.
            localStorage.setItem('finishChange', '6')

        this.quizStatusService.refresh.set(false);
        this.router.navigateByUrl(`lesson/${level.quiz.title}/${level.id}`);
    }
}
