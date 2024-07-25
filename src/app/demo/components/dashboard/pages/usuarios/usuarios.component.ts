import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { UserServiceService } from './services/userService.service';
import { UserListResponse } from './interface/user-list-response.interface';
import { CommonModule, JsonPipe } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from './components/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,
        ToolbarModule,
        // ButtonModule,
        
        DialogModule,
        DropdownModule,
        InputTextModule,
        TableComponent,
        TableModule,
        RippleModule,
        ToastModule,
        ConfirmDialogModule,
        InputTextareaModule,
        CommonModule,
        FileUploadModule,
        TagModule,
        RadioButtonModule,
        RatingModule,
        FormsModule,
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
            label: 'No',
            value: false,
        },
    ]);

    public userDialog: boolean = false;
    public user: UserListResponse;

    ngOnInit(): void {
        this.userService.getUserList().subscribe({
            next: (response) => {
                console.log({ response });
                this.users.set(response);
            },
            error: (error) => console.error(error),
        });
    }

    editUser(user: UserListResponse) {
        this.userDialog = true;
        this.user = user;
    }
    
    hideDialog(){
        this.userDialog = false
    }
    
    saveProduct(){
        this.userDialog = false
        console.log({ user: this.user });
    }
}
