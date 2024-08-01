import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { AchievementItemComponent } from '../../components/achievement-item/achievement-item.component';
import { DataInput } from '../../components/achievement-item/interfaces/data-inputs.interface';
import { style } from '@angular/animations';

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [GeoCenterContainerComponent, AchievementItemComponent],
    templateUrl: './achievement.component.html',
    styles: `
        .ul-container{
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-top: 3rem;
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
export class ArcheivementComponent {
    public dataInput = signal<DataInput>({
        id: '818af8f2-80kt-484e-9fab-a3d4ad846645',
        description: '¡Eres genial! Has completado la primera categoria.',
        name: '¡Inicio!',
        image: 'assets/images/achievement/primer-logro.svg',
    });
}

