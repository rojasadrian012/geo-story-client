import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lesson',
    standalone: false,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
})
export class LessonComponent {
    title: string

    private readonly route = inject(ActivatedRoute)

    ngOnInit() {
       this.route.paramMap.subscribe((params) => {
            this.title = params.get('level')
        })
    }
}
