export interface AchievementCurrentUser {
    id:          string;
    date:        Date;
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
    achievementsNoUnlocked: Achievement[]
}
