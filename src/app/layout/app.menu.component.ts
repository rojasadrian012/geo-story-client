import { OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/components/auth/services/auth.service';
import { DashboardService } from '../demo/components/dashboard/services/dashboard.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef) { }

    private authService = inject(AuthService)
    private dashboardService = inject(DashboardService)

    ngOnInit() {
        this.updateModel();
    }

    updateModel() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Aprender', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Ranking', icon: 'pi pi-fw pi-chart-line', routerLink: ['/ranking'] },
                    { label: 'Agregar Contenido', icon: 'pi pi-fw pi-plus', routerLink: ['/agregar-contenido'] },
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/perfil'] },
                    { label: 'Logros', icon: 'pi pi-fw pi-star', routerLink: ['/logros'] },
                    { label: 'Configuración', icon: 'pi pi-fw pi-cog', routerLink: ['/configuracion'] },
                    { label: this.dashboardService.isBlockedSingal() ? 'Desbloquear categorias' : 'Bloquear categorias', icon:this.dashboardService.isBlockedSingal()?'pi pi-fw pi-lock-open': 'pi pi-fw pi-lock', command: () => this.changeIsBlocked() },
                    { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', command: () => this.authService.logout() }
                ]
            },
        ];
        this.cd.detectChanges(); // Forzar la detección de cambios
    }

    changeIsBlocked() {
        this.dashboardService.isBlockedSingal.set(!this.dashboardService.isBlockedSingal());
        this.updateModel(); // Actualizar el modelo después de cambiar el estado
    }
}
