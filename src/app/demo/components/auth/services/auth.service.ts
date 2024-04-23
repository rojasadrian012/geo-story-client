import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user.interface.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly baseUrl = environment.baseUrl
    private http = inject(HttpClient)
    private _currentUser = signal<User | null>(null)
    private _authStatus = signal<AuthStatus>(AuthStatus.checking)

    public currentUser = computed(() => this._currentUser())
    public AuthStatus = computed(() => this._authStatus())

    constructor() {
        this.checkAuthStatus().subscribe()
    }

    private setAuthentication(user: User, token: string): boolean {

        localStorage.setItem('token', token)
        this._authStatus.set(AuthStatus.authenticated)
        this._currentUser.set(user)

        return true
    }

    login(nickname: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/login`
        const body = { nickname, password }

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ user, token }) => this.setAuthentication(user, token)),
                catchError(err => throwError(() => err.error.message)))

    }

    checkAuthStatus(): Observable<boolean> {

        const url = `${this.baseUrl}/auth/check-token`
        const token = localStorage.getItem('token')

        if (!token) {
            this.logout()
            return of(false)
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)

        return this.http.get<CheckTokenResponse>(url, { headers })
            .pipe(
                map(({ user, token }) => this.setAuthentication(user, token)),
                catchError(() => {
                    this._authStatus.set(AuthStatus.notAuthenticated)
                    return of(false)
                })
            )
    }

    logout() {
        localStorage.removeItem('token')
        this._currentUser.set(null)
        this._authStatus.set(AuthStatus.notAuthenticated)
    }
}
