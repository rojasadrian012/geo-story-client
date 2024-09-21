export interface Survey {
    id: string;
    question: string;
    surveyOptions: TypeOptions[]
}

export interface TypeOptions {
    name: string;
    value: string;
}