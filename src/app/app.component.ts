import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { AuthService } from './modules/auth/services/auth.service';
import { AuthStatus } from './modules/auth/interfaces/auth-status.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private authService = inject(AuthService)
    private router = inject(Router)

    public finishedAuthCheck = computed<boolean>(() => {

        if (this.authService.AuthStatus() === AuthStatus.checking) {
            return true
        }

        return false
    })

    public authStatusChangedEffect = effect(() => {
        switch (this.authService.AuthStatus()) {
            case AuthStatus.checking:
                return
            case AuthStatus.authenticated: //todo: ver como afectar a las otras rutas
                this.router.navigateByUrl(localStorage.getItem('currentUrl'))
                return
            case AuthStatus.notAuthenticated:
                this.router.navigateByUrl('/auth/login')
        }

    })

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }



}
