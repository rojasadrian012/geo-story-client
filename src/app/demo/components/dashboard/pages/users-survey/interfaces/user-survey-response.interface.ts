export interface UserSurveyResponse {
    firstSurvey:  Survey;
    secondSurvey: Survey;
}

export interface Survey {
    completed:    Completed[];
    notCompleted: Completed[];
}

export interface Completed {
    id:       string;
    nickname: string;
    fullName: string;
}
