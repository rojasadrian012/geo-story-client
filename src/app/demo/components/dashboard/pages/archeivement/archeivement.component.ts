import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './archeivement.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcheivementComponent { }
