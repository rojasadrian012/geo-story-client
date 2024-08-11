import { Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password: string = '';

    nickname: string = ''

    private messageService = inject(MessageService)

    private authService = inject(AuthService)

    private router = inject(Router)

    constructor(public layoutService: LayoutService) { }

    login() {
        this.authService.login(this.nickname, this.password)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/')
                },
                error: (err) => {
                    if (Array.isArray(err) && err.length > 0) {

                        if (err.length === 1) {
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Error al iniciar sesión',
                                detail: err[0] || 'Error desconocido',
                                life: 3000
                            });
                        } else {
                            err.forEach((error) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error al iniciar sesión',
                                    detail: error || 'Error desconocido',
                                    life: 3000
                                });
                            });
                        }
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error al iniciar sesión',
                            detail: err || 'Error desconocido',
                            life: 3000
                        });
                    }
                }
            });
    }
}
