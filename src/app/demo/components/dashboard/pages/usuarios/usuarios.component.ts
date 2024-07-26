import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
    OnInit,
    signal,
} from '@angular/core';

import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { UserServiceService } from './services/userService.service';
import { UserListResponse } from './interface/user-list-response.interface';
import { NgIf } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { TableComponent } from './components/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,
        TableComponent,
        
        NgIf,
        FormsModule,
        
        ToolbarModule,
        // ButtonModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        ConfirmDialogModule,
        InputTextareaModule,
        RadioButtonModule,
        InputNumberModule,
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {
    private readonly userService = inject(UserServiceService);

    public users = signal<UserListResponse[]>([]);
    public statuses = signal([
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
    public user = model<UserListResponse>({
        id: '',
        nickname: '',
        fullName: '',
        isActive: true,
        roles: [],
        password: '',
    });
    public userDialog = model<boolean>(false);
    public isNewUser = signal<boolean>(false);

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getList().subscribe({
            next: (response) => {
                this.users.set(response);
            },
            error: (error) => console.error(error),
        });
    }

    openNew() {
        this.userDialog.set(true);
        this.isNewUser.set(true);
    }

    openEdit(user: UserListResponse) {
        this.isNewUser.set(false);
        this.userDialog.set(true);
        this.user.set(user);
    }

    resetUser() {
        this.user.set({
            id: '',
            nickname: '',
            fullName: '',
            isActive: false,
            roles: [],
        });
    }

    hideDialog() {
        this.userDialog.set(false);
        this.resetUser();
    }

    saveProduct() {
        if (this.isNewUser()) {
            this.saveNewUser();
            this.hideDialog();
            return;
        }
        this.saveUserEdited();
        this.hideDialog();
    }
    saveUserEdited() {
        this.userService.edit(this.user()).subscribe({
            next: () => this.getUsers(),
            error: (e) => console.error({ e }),
        });
    }

    saveNewUser() {
        this.userService.create(this.user()).subscribe({
            next: () => this.getUsers(),
            error: (err) => console.error(err),
        });
    }
}
