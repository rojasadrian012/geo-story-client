import { User } from "./user.interface.interface";

export interface CheckTokenResponse {
    user:  User;
    token: string;
}

