import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
    signal,
} from '@angular/core';
import { UserListResponse } from '../../interface/user-list-response.interface';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeoModalConfirmComponent } from '../../../../components/core/geo-modal-confirm/geo-modal-confirm.component';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, ButtonModule, GeoModalConfirmComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export class TableComponent {
    public users = input.required<UserListResponse[]>();
    public onEditUser = output<UserListResponse>();

    public messageDialogConfirm = signal<string>('');
    public openDialog = signal<boolean>(false);

    constructor(private messageService: MessageService) {}

    editProduct(user: UserListResponse) {
        this.onEditUser.emit(user);
    }

    selectionUser(acepted: boolean) {
        this.openDialog.set(false);
        if (acepted) {
            console.log('Llamar a la api y eliminar.');
        }
    }

    deleteUser(user: UserListResponse) {
        this.openDialog.set(true);
        this.messageDialogConfirm.set(
            `¿Estás seguro que quieres eliminar a ${user.fullName}?`
        );
    }
}
