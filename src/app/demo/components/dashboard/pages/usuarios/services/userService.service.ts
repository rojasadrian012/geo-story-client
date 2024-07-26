import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserListResponse } from '../interface/user-list-response.interface';
import { Observable } from 'rxjs';
import { UserAdapter } from '../adapters/user-dto.adapter';

@Injectable({
    providedIn: 'root',
})
export class UserServiceService {
    constructor(private readonly http: HttpClient) {}

    private readonly baseUrl = `${environment.baseUrl}/auth/user`;

    getList(): Observable<UserListResponse[]> {
        return this.http.get<UserListResponse[]>(this.baseUrl + '/list');
    }

    edit(user: UserListResponse) {
        return this.http.patch(`${this.baseUrl}/edit/${user.id}`, user);
    }

    create(userToAdapter: UserListResponse) {
        const user = UserAdapter.toCreateUserDto(userToAdapter);
        return this.http.post(`${this.baseUrl}/new`, user);
    }
}
