import { CommonModule, JsonPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResultResponse } from './interfaces/result-response.interface';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
    selector: 'app-results',
    standalone: true,
    imports: [
        CommonModule,
        SplitterModule,
        ScrollPanelModule,
        GeoCenterContainerComponent,
        JsonPipe,
    ],
    templateUrl: './results.component.html',
    styles: `
        .questions-container {
            display: flex;
            gap: 20px; /* Espacio entre las columnas */
        }

        .column {
            flex: 1;
        }

        .user-info {
            margin-bottom: 20px;
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {
    private readonly http = inject(HttpClient);

    public data = signal<ResultResponse[]>([]);

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.http
            .get<ResultResponse[]>(`${environment.baseUrl}/quiz/results`)
            .subscribe({
                next: (res) => {
                    this.data.set(res);
                },
                error: (err) => console.log(err),
            });
    }
}
