export interface ResultResponse {
    user:   User;
    first:  First[];
    second: First[];
}

export interface First {
    id:         string;
    response:   string;
    question:   string;
    optionText: string;
}

export interface User {
    id:       string;
    fullName: string;
    nickname: string;
}
