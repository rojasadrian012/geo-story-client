import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectThemeComponent } from '../../components/select-theme/select-theme.component';
import { GeoCenterContainerComponent } from "../../components/core/geo-center-container/geo-center-container.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [SelectThemeComponent, GeoCenterContainerComponent],
    templateUrl: './settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
    private readonly http = inject(HttpClient);
    public textButton = signal('Ejecutar Semilla');

    executeSeed() {
        this.http.get(`${environment.baseUrl}/seed/by-client`).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (error) => {
                this.textButton.set('Semilla ejecutada.');
            },
        });
    }
}
