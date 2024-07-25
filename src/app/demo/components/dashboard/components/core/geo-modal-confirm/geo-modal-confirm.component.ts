import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnChanges,
    output,
    SimpleChanges,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'geo-modal-confirm',
    standalone: true,
    imports: [ConfirmDialogModule],
    templateUrl: './geo-modal-confirm.component.html',
    styleUrl: './geo-modal-confirm.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfirmationService],
})
export class GeoModalConfirmComponent implements OnChanges {
    public header = input.required<string>();
    public message = input.required<string>();
    public isOpen = input.required<boolean>();
    public onAcepted = output<boolean>();

    private readonly confirmationService = inject(ConfirmationService);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && this.isOpen() === true) {
            this.confirm();
        }
    }

    confirm() {
        this.confirmationService.confirm({
            header: this.header(),
            message: this.message(),
            accept: () => {
                this.onAcepted.emit(true);
            },
            reject: () => {
                this.onAcepted.emit(false);
            },
        });
    }
}
