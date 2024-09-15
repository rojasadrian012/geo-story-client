import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class GraphicService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = signal(environment.baseUrl + '/quiz/graphics');

    getDataByGraphics(): Observable<Data[]> {
        return this.http.get<Data[]>(this.baseUrl());
    }
}
