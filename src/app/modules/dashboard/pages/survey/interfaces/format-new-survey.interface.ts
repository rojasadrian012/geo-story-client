import { SurveyType } from './survey-type.emun';

export interface FormatNewSurve {
    surveyId: string;
    response: string;
    type: SurveyType;
}
