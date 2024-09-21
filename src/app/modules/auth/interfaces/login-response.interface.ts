import { User } from "./user.interface.interface";

export interface LoginResponse {
    user:  User;
    token: string;
}

