export interface UserQuizResponse {
    id:          string;
    score:       string;
    dataScore:   null;
    unlockLevel: boolean;
    quizId:      QuizID;
}

export interface QuizID {
    id:          string;
    title:       string;
    description: null;
    difficulty:  null;
    questions:   QuestionListResponse[];
}

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