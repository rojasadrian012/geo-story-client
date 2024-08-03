export interface AchievementListResponse {
    id:          string;
    date:        null;
    achievement: Achievement;
}

export interface Achievement {
    id:          string;
    name:        string;
    description: string;
    image:       string;
}
