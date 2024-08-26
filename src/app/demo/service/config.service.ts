import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = signal(`${environment.baseUrl}/quiz/config`);

    getConfigs(): Observable<any> {
        return this.http.get<any>(this.baseUrl());
    }
}
