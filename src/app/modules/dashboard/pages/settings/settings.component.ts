import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { SelectThemeComponent } from '../../components/select-theme/select-theme.component';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { User } from '../../../auth/interfaces/user.interface.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        SelectThemeComponent, 
        GeoCenterContainerComponent,
    ],
    templateUrl: './settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsComponent {
    public authService = inject(AuthService);

    public currenUser = signal<User | null>(
        localStorage.getItem('currenUser')
            ? JSON.parse(localStorage.getItem('currenUser'))
            : null
    );
}
