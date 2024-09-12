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

@Component({
    selector: 'app-results',
    standalone: true,
    imports: [CommonModule, GeoCenterContainerComponent, JsonPipe],
    templateUrl: './results.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {
    private readonly http = inject(HttpClient);

    public data = signal<any>(undefined);

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.http.get(`${environment.baseUrl}/quiz/results`).subscribe({
            next: (res) => {
                this.data.set(res);
            },
            error: (err) => console.log(err),
        });
    }
}
