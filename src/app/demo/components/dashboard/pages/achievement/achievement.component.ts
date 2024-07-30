import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { AchievementItemComponent } from '../../components/achievement-item/achievement-item.component';
import { DataInput } from '../../components/achievement-item/interfaces/data-inputs.interface';

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [GeoCenterContainerComponent, AchievementItemComponent],
    templateUrl: './achievement.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcheivementComponent {
    public dataInput = signal<DataInput>({
        id: '818af8f2-80kt-484e-9fab-a3d4ad846645',
        description: '¡Eres genial! Has completado la primera categoria.',
        name: 'Completa una categoria'      
    })
}
