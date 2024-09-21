import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.AuthStatus() === AuthStatus.authenticated) {
        localStorage.setItem('currentUrl', state.url)
        return true
    }

    if (authService.AuthStatus() === AuthStatus.checking) {
        return false
    }

    router.navigateByUrl('/auth/login')

    return false;
};
