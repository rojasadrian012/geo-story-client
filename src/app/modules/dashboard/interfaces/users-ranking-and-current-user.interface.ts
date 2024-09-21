export interface UsersRankingAndCurrentUser {
    currentUser:  CurrentUser;
    rankingUsers: RankingUser[];
}

export interface CurrentUser {
    id:       string;
    nickname: string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    position: number
}

export interface RankingUser {
    user_id:       string;
    user_nickname: string;
    user_fullName: string;
    score:         string;
    position: number
}
