import { NgFor } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import {
    AppConfig,
    LayoutService,
} from '../../../../layout/service/app.layout.service';

export interface TitleAndThemes {
    title: string;
    themes: Theme[];
}

export interface Theme {
    theme: string;
    colorScheme: string;
    image: string;
}

@Component({
    selector: 'app-select-theme',
    standalone: true,
    imports: [NgFor],
    templateUrl: './select-theme.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectThemeComponent {
    private readonly layoutService = inject(LayoutService);

    public currentTheme = signal<AppConfig | null>(
        localStorage.getItem('appConfig')
            ? JSON.parse(localStorage.getItem('appConfig'))
            : null
    );

    public titleAndThemes = signal<TitleAndThemes>({
        title: 'Temas disponibles',
        themes: [
            {
                theme: 'lara-light-indigo',
                colorScheme: 'light',
                image: 'assets/layout/images/themes/lara-light-indigo.png',
            },
            {
                theme: 'lara-light-blue',
                colorScheme: 'light',
                image: 'assets/layout/images/themes/lara-light-blue.png',
            },
            {
                theme: 'lara-light-teal',
                colorScheme: 'light',
                image: 'assets/layout/images/themes/lara-light-teal.png',
            },
            {
                theme: 'lara-dark-indigo',
                colorScheme: 'dark',
                image: 'assets/layout/images/themes/lara-dark-indigo.png',
            },
            {
                theme: 'lara-dark-blue',
                colorScheme: 'dark',
                image: 'assets/layout/images/themes/lara-dark-blue.png',
            },
            {
                theme: 'lara-dark-teal',
                colorScheme: 'dark',
                image: 'assets/layout/images/themes/lara-dark-teal.png',
            },
        ],
    });

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }
    get theme(): string {
        return this.layoutService.config().theme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }
    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    getCurrentThemeImage(): string {
        const currentTheme = this.theme;
        const selectedTheme = this.titleAndThemes().themes.find(
            (t) => t.theme === currentTheme
        );
        return selectedTheme
            ? selectedTheme.image
            : 'assets/layout/images/themes/lara-light-indigo.png';
    }
}
