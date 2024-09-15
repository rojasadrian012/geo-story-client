export interface Data {
    surveyType: SurveyType;
    question:   string;
    data:       DataClass;
}

export interface DataClass {
    labels:   Array<string[]>;
    datasets: Dataset[];
}

export interface Dataset {
    data:                 number[];
    backgroundColor:      string[];
    hoverBackgroundColor: string[];
}

export enum SurveyType {
    First = "first",
    Second = "second",
}
