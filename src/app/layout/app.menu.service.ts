import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';
import { User } from '../demo/components/auth/interfaces/user.interface.interface';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public model = signal<any[]>([]);
    public currentUser = signal<User | null>(this.getCurrentUser());

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();
    public showSurveyInMenu = signal(true);

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }

    updateModel(): void {
        const isAdmin = this.currentUser()?.roles.includes('admin');

        const items = [
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
                routerLink: ['/mi-perfil'],
            },
            this.showSurveyInMenu()
                ? {
                      label: 'Encuesta',
                      icon: 'pi pi-fw pi-pencil',
                      routerLink: ['/encuesta'],
                  }
                : null,
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
                              {
                                  label: 'Encuetas de Usuarios',
                                  icon: 'pi pi-fw pi-chart-line',
                                  routerLink: ['/encuesta-usuarios'],
                              },
                              {
                                  label: 'Configuraciones',
                                  icon: 'pi pi-fw pi-cog',
                                  routerLink: ['/configuracion'],
                              },
                          ],
                      },
                  ]
                : []),
        ].filter((item) => item !== null); // Filtrar los elementos nulos

        this.model.set([
            {
                label: 'Menú',
                items: items,
            },
        ]);
    }

    getCurrentUser(): User {
        return localStorage.getItem('currenUser')
            ? JSON.parse(localStorage.getItem('currenUser'))
            : null;
    }
}
