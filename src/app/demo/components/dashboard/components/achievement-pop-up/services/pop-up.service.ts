import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PopUpService {

    public showNewAchievement = signal<boolean>(false);
    public text = signal<string>('');

}
