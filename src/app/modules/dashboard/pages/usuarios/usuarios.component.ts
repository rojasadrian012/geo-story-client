import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
    OnInit,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmationService, MessageService } from 'primeng/api';

import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';

import { UserServiceService } from './services/userService.service';
import { UserListResponse } from './interface/user-list-response.interface';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,
        GeoLoadingComponent,

        FormsModule,

        ToastModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ConfirmDialogModule,
        DropdownModule,
        MultiSelectModule,
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService],
})
export default class UsuariosComponent implements OnInit {
    private readonly userService = inject(UserServiceService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    public users = signal<UserListResponse[]>([]);
    public loading = signal(false); //Para mostrar el cargando en la tabla
    public textSearch = model('');
    public userDialog = model<boolean>(false);
    public userSelected = model<UserListResponse>(this.emptyUser());
    public isNewUser = signal<boolean>(false);
    public submitted = signal(false);
    public isActiveValues = signal([
        {
            label: 'SI',
            value: true,
        },
        {
            label: 'NO',
            value: false,
        },
    ]);
    public userRols = signal([
        {
            label: 'Administrador',
            value: 'admin',
        },
        {
            label: 'Usuario',
            value: 'user',
        },
    ]);
    public show = signal(false);

    ngOnInit(): void {
        this.getUsers();
    }

    emptyUser() {
        return {
            id: '',
            nickname: '',
            fullName: '',
            isActive: true,
            roles: [],
            password: '',
        };
    }

    getUsers() {
        this.userService.getUsers().subscribe({
            next: (response) => {
                this.users.set(response);
                this.show.set(true);
            },
            error: (error) => console.error(error),
        });
    }

    searchUsers() {
        if (this.textSearch() === '') {
            this.getUsers();
            return;
        }
        this.userService.search(this.textSearch()).subscribe({
            next: (response) => {
                this.users.set(response);
            },
            error: (err) => console.error(err),
        });
    }

    editUser(user: UserListResponse) {
        this.isNewUser.set(false);
        this.userSelected.update(() => ({
            ...user,
        }));
        this.userDialog.set(true);
    }

    deleteUser(user: UserListResponse) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar a ' + user.fullName + '?',
            header: 'Confirmar',
            icon: 'pi pi-trash',
            accept: () => {
                this.userService.delete(user.id).subscribe({
                    next: () => {
                        this.getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Eliminado',
                            detail: 'Usuario eliminado exitosamente.',
                            life: 3000,
                        });
                    },
                });
            },
        });
    }

    hideDialog() {
        this.userDialog.set(false);
        this.submitted.set(false);
    }

    saveProduct() {
        this.submitted.set(true);

        if (this.userSelected().nickname?.trim()) {
            if (this.userSelected().id) {
                this.userService.edit(this.userSelected()).subscribe({
                    next: () => {
                        this.getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Editado',
                            detail: 'Usuario actualizado correctamente.',
                            life: 3000,
                        });
                    },
                    error: (err) => console.error(err),
                });
            } else {
                this.userService.create(this.userSelected()).subscribe({
                    next: () => {
                        this.getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Creado',
                            detail: 'Usuario Creado correctamente.',
                            life: 3000,
                        });
                    },
                    error: (err) => console.error(err),
                });
            }

            this.userDialog.set(false);
            this.userSelected.set(this.emptyUser());
        }
    }

    openNew() {
        this.userSelected.set(this.emptyUser());
        this.submitted.set(false);
        this.userDialog.set(true);
    }
}
