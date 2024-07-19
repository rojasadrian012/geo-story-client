import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizStatusService {

  public refresh = signal(false)

  constructor() { }

}
