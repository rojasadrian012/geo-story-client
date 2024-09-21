export interface UserSavedResponse {
    nextUserQuiz: NextUserQuiz;
}

export interface NextUserQuiz {
    id:          string;
    score:       string;
    dataScore:   null;
    unlockLevel: boolean;
    quiz:        Quiz;
}

export interface Quiz {
    id:          string;
    title:       string;
    description: null;
    difficulty:  string;
}
