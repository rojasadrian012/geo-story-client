import { OnInit, inject, signal } from '@angular/core';
import { Component } from '@angular/core';

import { LayoutService } from './service/app.layout.service';
import { User } from '../demo/components/auth/interfaces/user.interface.interface';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    public layoutService = inject(LayoutService);

    public model = signal<any[]>([]);
    public currentUser = signal<User | null>(this.getCurrentUser());

    ngOnInit() {
        this.updateModel();
    }

    getCurrentUser(): User {
        return localStorage.getItem('currenUser')
            ? JSON.parse(localStorage.getItem('currenUser'))
            : null;
    }

    updateModel(): void {
        const isAdmin = this.currentUser()?.roles.includes('admin');

        this.model.update(() => [
            {
                label: 'Menú',
                items: [
                    {
                        label: 'Lecciones',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Clasificación',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/ranking'],
                    },
                    {
                        label: 'Mis Logros',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/logros'],
                    },
                    {
                        label: 'Perfil',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/configuracion'],
                    },
                    {
                        label: 'Encuesta',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/encuesta'],
                    },
                    ...(isAdmin
                        ? [
                              {
                                  label: 'Panel de Administración',
                                  items: [
                                      {
                                          label: 'Gestión de Usuarios',
                                          icon: 'pi pi-fw pi-users',
                                          routerLink: ['/usuarios'],
                                      },
                                  ],
                              },
                          ]
                        : []),
                ],
            },
        ]);
    }
}
