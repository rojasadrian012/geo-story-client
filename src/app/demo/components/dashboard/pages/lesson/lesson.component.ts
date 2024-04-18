import { Component } from '@angular/core';

@Component({
    selector: 'app-lesson',
    standalone: false,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
})
export class LessonComponent {
    titulo: string = 'Historia';
}
