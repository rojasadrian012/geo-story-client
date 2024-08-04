export interface AchievementCurrentUser {
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

export interface AchievementListResponse {
    achievementsCurrentUser: AchievementCurrentUser[]
    achievements: Achievement[]
}
