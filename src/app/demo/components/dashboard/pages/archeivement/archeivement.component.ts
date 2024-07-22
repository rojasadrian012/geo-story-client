import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeoCenterContainerComponent } from "../../components/core/geo-center-container/geo-center-container.component";

@Component({
    selector: 'app-archeivement',
    standalone: true,
    imports: [
        CommonModule,
        GeoCenterContainerComponent
    ],
    templateUrl: './archeivement.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcheivementComponent { }
