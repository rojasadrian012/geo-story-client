import { Injectable } from '@angular/core';
import { zzfx } from 'zzfx';

@Injectable({
    providedIn: 'root',
})
export class SoundsService {

    playCorrectSound() {
        zzfx(...[, , 537, 0.02, 0.02, 0.22, 1, 1.59, -6.98, 4.97]); // Heart
    }

    playIncorrectSound() {
        zzfx(...[, , 925, 0.04, 0.3, 0.6, 1, 0.3, , 6.27, -184, 0.09, 0.17]); // Game Over
    }

    playPianoSound() {
        zzfx(...[1.5, 0.8, 270, , 0.1, , 1, 1.5, , , , , , , , 0.1, 0.01]); // Piano
    }
}
