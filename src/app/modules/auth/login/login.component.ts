import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,

        ToastModule,
        PasswordModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
    ],
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export default class LoginComponent {
    private messageService = inject(MessageService);
    private authService = inject(AuthService);
    private router = inject(Router);
    public layoutService = inject(LayoutService);

    valCheck: string[] = ['remember'];
    password = model('');
    nickname = model('');

    login() {
        this.authService.login(this.nickname(), this.password()).subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
            error: (err) => {
                if (Array.isArray(err) && err.length > 0) {
                    if (err.length === 1) {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Error al iniciar sesión',
                            detail: err[0] || 'Error desconocido',
                            life: 3000,
                        });
                    } else {
                        err.forEach((error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error al iniciar sesión',
                                detail: error || 'Error desconocido',
                                life: 3000,
                            });
                        });
                    }
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error al iniciar sesión',
                        detail: err || 'Error desconocido',
                        life: 3000,
                    });
                }
            },
        });
    }

    formatNickname() {
        this.nickname.set(
            this.nickname()
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .trim()
        );
    }
}
