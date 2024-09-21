export interface CombinedData {
    firstChart:  Chart;
    secondChart: Chart;
}

export interface Chart {
    surveyType: SurveyType;
    question:   string;
    data:       Data;
}

export interface Data {
    labels:   string[];
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
