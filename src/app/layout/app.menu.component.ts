import { OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/components/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    private authService = inject(AuthService);
    private http = inject(HttpClient);

    ngOnInit() {
        this.updateModel();
    }

    updateModel() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    {
                        label: 'Aprender',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Ranking',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/ranking'],
                    },
                    // {
                    //     label: 'Agregar Contenido',
                    //     icon: 'pi pi-fw pi-plus',
                    //     routerLink: ['/agregar-contenido'],
                    // },
                    // {
                    //     label: 'Perfil',
                    //     icon: 'pi pi-fw pi-user',
                    //     routerLink: ['/perfil'],
                    // },
                    {
                        label: 'Logros',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/logros'],
                    },
                    {
                        label: 'Configuración',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/configuracion'],
                    },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => this.authService.logout(),
                    },
                ],
            },
        ];
    }
}
