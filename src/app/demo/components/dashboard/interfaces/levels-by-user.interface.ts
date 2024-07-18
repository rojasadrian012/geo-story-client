export interface LevelByUser {
    id:          string;
    score:       string;
    dataScore:   null;
    unlockLevel: boolean;
    quizId:      Quiz;
}

export interface Quiz {
    id:          string;
    title:       string;
    description: null;
    difficulty:  null;
}
