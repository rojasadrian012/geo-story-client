import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Survey } from '../interfaces/survey.interface';
import { FormatNewSurve as FormatNewSurvey } from '../interfaces/format-new-survey.interface';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.baseUrl}/quiz`;

    // http://localhost:3000/surveys?isFirst=true
    getSurveys(isFirst: boolean): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.baseUrl}/surveys`, {
            params: { isFirst: isFirst.toString() },
        });
    }

    saveSurveyResponses(responses: FormatNewSurvey[]): Observable<any> {
        return this.http.post(`${this.baseUrl}/survey`, responses);
    }
}
