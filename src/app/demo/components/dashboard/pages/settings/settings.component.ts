import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent { }
