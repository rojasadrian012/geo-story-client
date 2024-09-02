import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GeoCenterContainerComponent } from '../../components/core/geo-center-container/geo-center-container.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Survey } from './interfaces/survey.interface';
import { SurveyService } from './services/survey.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormatNewSurve as FormatNewSurvey } from './interfaces/format-new-survey.interface';
import { ConfigService } from 'src/app/demo/service/config.service';
import { SurveyType } from './interfaces/survey-type.emun';

interface SurveyResponse {
    [key: string]: {
        answer: {
            id: string;
            name: string;
            value: string;
        };
    };
}

@Component({
    selector: 'app-survey',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,

        NgFor,
        NgIf,

        ReactiveFormsModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
    ],
    templateUrl: './survey.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export class SurveyComponent implements OnInit {
    private fb = inject(FormBuilder);
    private readonly surveyService = inject(SurveyService);
    private readonly messageService = inject(MessageService);
    private readonly configService = inject(ConfigService);

    public surveys = signal<Survey[] | null>(null); // Las preguntas de la encuesta
    public isFirstSurvey = signal(false);
    public surveyForm: FormGroup;
    public showForm = signal(false);

    ngOnInit(): void {
        this.getFirstSurveyConfig();
    }

    getSurveyList() {
        this.surveyService.getSurveys(this.isFirstSurvey()).subscribe({
            next: (res) => {
                this.surveys.set(res);
                this.configForm();
            },
            error: (err) => console.log(err),
        });
    }

    configForm() {
        const formControls = this.surveys().reduce((acc, survey) => {
            acc[survey.id] = this.fb.group({
                answer: ['', Validators.required],
            });
            return acc;
        }, {} as { [key: string]: FormGroup });

        this.surveyForm = this.fb.group(formControls);
        this.showForm.set(true);
    }

    onSubmit() {
        if (this.surveyForm.valid) {
            const formValue: SurveyResponse = this.surveyForm.value;

            const responses: FormatNewSurvey[] = Object.keys(formValue).map(
                (surveyId) => ({
                    surveyId: surveyId,
                    response: formValue[surveyId].answer.value,
                    type: this.isFirstSurvey()
                        ? SurveyType.FIRST
                        : SurveyType.SECOND,
                })
            );

            this.surveyService.saveSurveyResponses(responses).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Encuesta guardada.',
                        summary: 'Éxito',
                    });

                    this.surveyForm.disable();
                },
                error: (err) =>
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Error.',
                        summary:
                            'Ocurrió un error al guardar la encuesta' + err,
                    }),
            });
        }
    }

    getFirstSurveyConfig() {
        this.configService.getConfigs().subscribe({
            next: (res) => {
                const firstSurveyConfig = res.find(
                    (config) => config.name === 'firstSurvey'
                );

                this.isFirstSurvey.set(
                    firstSurveyConfig ? firstSurveyConfig.value : false
                );

                this.getSurveyList();
            },
            error: (err) => console.log(err),
        });
    }
}
