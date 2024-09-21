import { Injectable, signal } from '@angular/core';
import { TextModel } from '../interfaces/text-model.interface';

@Injectable({
    providedIn: 'root',
})
export class PopUpService {
    public showNewAchievement = signal<boolean>(false);
    public text = signal<TextModel>({
        title: 'Preciso',
        description:
            'Has respondido correctamente 5 preguntas. Tú precisión es impresionante.',
    });
}
