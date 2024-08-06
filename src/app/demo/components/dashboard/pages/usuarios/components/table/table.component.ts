import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { UserListResponse } from '../../interface/user-list-response.interface';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeoModalConfirmComponent } from '../../../../components/core/geo-modal-confirm/geo-modal-confirm.component';
import { UserServiceService } from '../../services/userService.service';

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
    private userSelected = signal<UserListResponse | null>(null);
    public onEditUser = output<UserListResponse>();
    public onDeletedUser = output<boolean>();

    public messageDialogConfirm = signal<string>('');
    public openDialog = signal<boolean>(false);

    private readonly userService = inject(UserServiceService);


    constructor(private messageService: MessageService) { }

    editProduct(user: UserListResponse) {
        this.onEditUser.emit(user);
    }

    selectionUser(acepted: boolean) {
        this.openDialog.set(false);
        if (acepted) {
            this.userService.delete(this.userSelected().id).subscribe({
                next: () => this.onDeletedUser.emit(true),
                error: (error) => console.error({ error }),
            })
        } else {
            this.userSelected.set(null);
        }
    }

    deleteUser(user: UserListResponse) {
        this.userSelected.set(user);
        this.openDialog.set(true);
        this.messageDialogConfirm.set(
            `¿Estás seguro que quieres eliminar a ${user.fullName}?`
        );
    }
}
