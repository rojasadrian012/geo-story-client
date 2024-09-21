import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseConfig } from '../../modules/dashboard/pages/config/interfaces/response-config.interface';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = signal(`${environment.baseUrl}/quiz/config`);

    getConfigs(): Observable<ResponseConfig[]> {
        return this.http.get<ResponseConfig[]>(this.baseUrl());
    }

    saveConfig(name: string, value: boolean) {
        return this.http.put(this.baseUrl(), { name, value });
    }
}
