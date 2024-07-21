import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { LayoutService } from '../../../../../layout/service/app.layout.service';

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
    imports: [CommonModule],
    templateUrl: './select-theme.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectThemeComponent {
    private readonly layoutService = inject(LayoutService);

    public titleAndThemes = signal<TitleAndThemes[]>([
        {
            title: 'Aventuras Espaciales',
            themes: [
                {
                    theme: 'lara-light-indigo',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/lara-light-indigo.png',
                },
            ],
        },
        {
            title: 'Mundos Submarinos',
            themes: [
                {
                    theme: 'lara-light-blue',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/lara-light-blue.png',
                },
                {
                    theme: 'lara-light-purple',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/lara-light-purple.png',
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
                    theme: 'lara-dark-purple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/lara-dark-purple.png',
                },
                {
                    theme: 'lara-dark-teal',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/lara-dark-teal.png',
                },
            ],
        },
        {
            title: 'Criaturas Fantásticas',
            themes: [
                {
                    theme: 'bootstrap4-light-blue',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/bootstrap4-light-blue.svg',
                },
                {
                    theme: 'bootstrap4-light-purple',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/bootstrap4-light-purple.svg',
                },
                {
                    theme: 'bootstrap4-dark-blue',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/bootstrap4-dark-blue.svg',
                },
                {
                    theme: 'bootstrap4-dark-purple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/bootstrap4-dark-purple.svg',
                },
            ],
        },
        {
            title: 'Exploración Espacial',
            themes: [
                {
                    theme: 'md-light-indigo',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/md-light-indigo.svg',
                },
                {
                    theme: 'md-light-deeppurple',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/md-light-deeppurple.svg',
                },
                {
                    theme: 'md-dark-indigo',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/md-dark-indigo.svg',
                },
                {
                    theme: 'md-dark-deeppurple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/md-dark-deeppurple.svg',
                },
            ],
        },
        {
            title: 'Exploración Espacial 2',
            themes: [
                {
                    theme: 'mdc-light-indigo',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/md-light-indigo.svg',
                },
                {
                    theme: 'mdc-light-deeppurple',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/md-light-deeppurple.svg',
                },
                {
                    theme: 'mdc-dark-indigo',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/md-dark-indigo.svg',
                },
                {
                    theme: 'mdc-dark-deeppurple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/md-dark-deeppurple.svg',
                },
            ],
        },
        {
            title: 'Exploración de Planetas',
            themes: [
                {
                    theme: 'tailwind-light',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/tailwind-light.png',
                },
            ],
        },
        {
            title: 'Aventuras de Ciencia Ficción',
            themes: [
                {
                    theme: 'fluent-light',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/fluent-light.png',
                },
            ],
        },
        {
            title: 'Superhéroes y Villanos',
            themes: [
                {
                    theme: 'saga-blue',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/saga-blue.png',
                },
                {
                    theme: 'saga-green',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/saga-green.png',
                },
                {
                    theme: 'saga-orange',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/saga-orange.png',
                },
                {
                    theme: 'saga-purple',
                    colorScheme: 'light',
                    image: 'assets/layout/images/themes/saga-purple.png',
                },
                {
                    theme: 'vela-blue',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/vela-blue.png',
                },
                {
                    theme: 'vela-green',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/vela-green.png',
                },
                {
                    theme: 'vela-orange',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/vela-orange.png',
                },
                {
                    theme: 'vela-purple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/vela-purple.png',
                },
                {
                    theme: 'arya-blue',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/arya-blue.png',
                },
                {
                    theme: 'arya-green',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/arya-green.png',
                },
                {
                    theme: 'arya-orange',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/arya-orange.png',
                },
                {
                    theme: 'arya-purple',
                    colorScheme: 'dark',
                    image: 'assets/layout/images/themes/arya-purple.png',
                },
            ],
        },
    ]);

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
}
