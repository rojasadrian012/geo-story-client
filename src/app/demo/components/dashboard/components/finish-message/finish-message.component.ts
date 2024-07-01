import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { DialogModule } from "primeng/dialog";

@Component({
    selector: 'app-finish-message',
    standalone: true,
    imports: [
        DialogModule,
    ],
    template: `
        <p-dialog
            [header]="titleMessage()"
            [(visible)]="showMessage"
            [modal]="true"
            [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
            [style]="{ width: '50vw' }"
            [draggable]="false"
            [resizable]="false">
            <p>
                {{textMessage()}}
            </p>
        </p-dialog>
    `
    ,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishMessageComponent {
    @Input({
        required: true
    })
    public showMessage : boolean = false
    public textMessage = input.required<string>()
    public titleMessage = input.required<string>()


}
