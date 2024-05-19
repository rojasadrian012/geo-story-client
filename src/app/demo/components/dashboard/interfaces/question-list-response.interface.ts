export interface QuestionListResponse {
    id:      string;
    title:   string;
    hint:    string;
    answers: Answer[];
}

export interface Answer {
    id:        string;
    text:      string;
    isCorrect: boolean;
}
