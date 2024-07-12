import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { QuestionListResponse } from '../../interfaces/question-list-response.interface';
import { environment } from 'src/environments/environment';
import { SoundsService } from '../../services/sounds.service';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly soundsService = inject(SoundsService);

    title: string;
    questions = signal<QuestionListResponse[]>([])

    showReviewModal: boolean = false;

    showHintSignal = signal(false);
    showHintEffecft = effect(() => {
        if (this.showHintSignal()) this.soundsService.playPianoSound();
    });

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.title = params.get('level');
            this.getQuestions(params.get('id'));
        });
    }

    getQuestions(id: string) {
        this.http
            .get<QuestionListResponse[]>(
                environment.baseUrl + '/quiz/questions/' + id
            )
            .subscribe((data) => {
                this.questions.set(data);
            });
    }

}
