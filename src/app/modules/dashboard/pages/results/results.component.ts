import { JsonPipe, NgFor } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { environment } from 'src/environments/environment';
import { ResultResponse } from './interfaces/result-response.interface';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

@Component({
    selector: 'app-results',
    standalone: true,
    imports: [
        NgFor,

        GeoCenterContainerComponent,
        GeoLoadingComponent,

        SplitterModule,
        ScrollPanelModule,
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
export default class ResultsComponent implements OnInit {
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
