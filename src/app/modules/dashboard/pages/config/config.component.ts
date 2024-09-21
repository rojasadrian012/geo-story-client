import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { ConfigService } from 'src/app/shared/service/config.service';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuService } from '../../../../layout/app.menu.service';

@Component({
    selector: 'app-config',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,

        ReactiveFormsModule,
        NgFor,
        NgIf,

        CheckboxModule,
        ToastModule,
    ],
    templateUrl: './config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export default class ConfigComponent implements OnInit {
    private readonly configService = inject(ConfigService);
    private readonly messageService = inject(MessageService);
    private readonly menuService = inject(MenuService);

    public configs = signal<undefined>(undefined);
    public formGroup: FormGroup;

    ngOnInit() {
        this.getConfigs();
    }

    getConfigs() {
        this.configService.getConfigs().subscribe({
            next: (res) => {
                this.configs.set(res);
                this.initializeForm(res);
            },
            error: (err) => console.error(err),
        });
    }

    initializeForm(configs: any[]) {
        const formControls = configs.reduce((acc, config) => {
            acc[config.name] = new FormControl(config.value);
            return acc;
        }, {});
        this.formGroup = new FormGroup(formControls);
    }

    save(configName: string, checked: boolean) {
        const updateMenu = configName === 'showSurveyInMenu' ? true : false;
        this.configService.saveConfig(configName, checked).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Configuración actualizada.',
                });

                if (updateMenu) {
                    this.menuService.showSurveyInMenu.set(checked);
                    this.menuService.updateModel();
                }
            },
            error: (err) =>
                console.error('Error al guardar configuración:', err),
        });
    }
}
