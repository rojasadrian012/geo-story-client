import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeoCenterContainerComponent } from "../../components/core/geo-center-container/geo-center-container.component";

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent { }
