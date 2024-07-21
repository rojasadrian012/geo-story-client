import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './settings.component.html',
    styles: `
        .transparent-background{
            background-color: transparent;
        }
    `,
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
