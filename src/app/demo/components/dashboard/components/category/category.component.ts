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

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [NgClass],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements AfterViewInit, OnChanges {
    //TODO: hacer que las imagenes vengan de bd.
    public images = input.required<string[]>();
    public levels = input.required<LevelByUser[]>();

    public readonly router = inject(Router);
    public readonly quizStatusService = inject(QuizStatusService);

    public lastUnlockedIndex = signal<number>(-1);

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
            console.log('No hay elementos en levelsElements aún.');
        }
    }

    changePath(level: LevelByUser, unlockLevel: boolean) {
        if (!unlockLevel) return;
        this.quizStatusService.refresh.set(false);
        this.router.navigateByUrl(`lesson/${level.quizId.title}/${level.id}`);
    }
}
