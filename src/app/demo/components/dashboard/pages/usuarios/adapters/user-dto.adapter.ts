import { UserListResponse } from '../interface/user-list-response.interface';

export class UserAdapter {
    static toCreateUserDto(user: UserListResponse) {
        return {
            nickname: user.nickname,
            password: user.password,
            fullName: user.fullName,
            roles: Array.isArray(user.roles) ? user.roles : [user.roles],
        };
    }
}
