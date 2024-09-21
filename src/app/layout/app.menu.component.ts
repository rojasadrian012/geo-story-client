import { OnInit, inject, signal, effect } from '@angular/core';
import { Component } from '@angular/core';

import { LayoutService } from './service/app.layout.service';
import { MenuService } from './app.menu.service';
import { ConfigService } from '../shared/service/config.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    public layoutService = inject(LayoutService);
    public readonly menuService = inject(MenuService);
    private readonly configService = inject(ConfigService);

    ngOnInit() {
        this.getConfigs();
    }

    getConfigs() {
        this.configService.getConfigs().subscribe({
            next: (res) => {
                const showSurveyInMenu = res.find(
                    (config) => config.name === 'showSurveyInMenu'
                );

                this.menuService.showSurveyInMenu.set(
                    showSurveyInMenu ? showSurveyInMenu.value : false
                );

                this.menuService.updateModel();
            },
            error: (err) => console.log(err),
        });
    }
}
