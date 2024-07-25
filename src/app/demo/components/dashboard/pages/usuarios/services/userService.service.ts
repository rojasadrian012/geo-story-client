import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserListResponse } from '../interface/user-list-response.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserServiceService {
    constructor(private readonly http: HttpClient) {}

    private readonly baseUrl = `${environment.baseUrl}/auth/user`;

    getUserList(): Observable<UserListResponse[]> {
        return this.http.get<UserListResponse[]>(this.baseUrl + '/list');
    }
}
