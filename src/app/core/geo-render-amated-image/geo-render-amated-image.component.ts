import { ChangeDetectionStrategy, Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationOptions, LottieComponent } from "ngx-lottie";

@Component({
    selector: 'app-render-amated-image',
    standalone: true,
    imports: [
        LottieComponent,
    ],
    templateUrl: './geo-render-amated-image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoRenderAmatedImageComponent implements OnChanges {

    public image = input.required<string>();
    public height = input.required<string>();
    public width = input.required<string>();

    public options: AnimationOptions = {
        path: '',
    };
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['image']) this.options = {
            ...this.options,
            path: this.image(),
        };
    }


}
