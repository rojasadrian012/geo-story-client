import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { bearerTokenInterceptor } from './demo/interceptor/bearer-token.interceptor';

import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },

        [provideHttpClient(withInterceptors([bearerTokenInterceptor]))],
        provideLottieOptions({ player: () => player }),
        provideCacheableAnimationLoader(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
