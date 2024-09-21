import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { isAuthenticatedGuard } from './modules/auth/guards/is-authenticated.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [isAuthenticatedGuard],
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './modules/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./modules/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
