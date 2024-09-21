import { Injectable, effect, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    isBlockedSingal = signal(true);

}
