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

    ngOnInit() {
        this.updateModel();
    }

    updateModel() {
        this.model = [
            {
                label: 'Menú',
                items: [
                    {
                        label: 'Aprender',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Ranking',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/ranking'],
                    },
                    {
                        label: 'Logros',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/logros'],
                    },
                    {
                        label: 'Mi usuario',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/configuracion'],
                    },
                    {
                        label: 'Administrar usuarios',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/usuarios'],
                    },
                ],
            },
        ];
    }
}
