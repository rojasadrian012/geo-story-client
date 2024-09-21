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

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { SurveyService } from './services/survey.service';
import { Survey } from './interfaces/survey.interface';
import { FormatNewSurve as FormatNewSurvey } from './interfaces/format-new-survey.interface';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { SurveyType } from './interfaces/survey-type.emun';
import { ConfigService } from 'src/app/shared/service/config.service';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

interface SurveyResponse {
    [key: string]: {
        answer: string;
    };
}

@Component({
    selector: 'app-survey',
    standalone: true,
    imports: [
        GeoCenterContainerComponent,
        GeoLoadingComponent,

        NgFor,
        NgIf,

        ReactiveFormsModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
    ],
    templateUrl: './survey.component.html',
    styles: `
        
        label {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        input[type="radio"] {
            margin-right: 1rem;
            margin-left: 2rem;
            margin-top: 0;
            accent-color: var(--primary-color); /* Esto cambia el color del radio button */
            border: 2px solid transparent; /* Elimina el borde predeterminado */
            outline: none; /* Elimina el borde al enfocar */
            appearance: none; /* Elimina el estilo predeterminado del radio button */
            width: 16px;
            height: 16px;
            border-radius: 50%;
            box-shadow: inset 0 0 0 2px var(--primary-color); /* Añade un borde personalizado */
            display: grid;
            place-content: center;
        }

        input[type="radio"]:checked::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary-color); /* Color del punto interior */
        }

        label:hover {
            color: var(--primary-color); 
        }


    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export default class SurveyComponent implements OnInit {
    private fb = inject(FormBuilder);
    private readonly surveyService = inject(SurveyService);
    private readonly messageService = inject(MessageService);
    private readonly configService = inject(ConfigService);

    public surveys = signal<Survey[] | null>(null); // Las preguntas de la encuesta
    public isFirstSurvey = signal(false);
    public showForm = signal(false);

    public surveyForm: FormGroup;

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
                    response: formValue[surveyId].answer,
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
                        detail: err.error.message,
                        summary: 'Ocurrió un error al guardar la encuesta',
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

    selected(surveyId: string, value: string) {
        const control = this.surveyForm.get([surveyId, 'answer']);
        if (control) {
            control.setValue(value); // Actualizamos el valor seleccionado en el FormControl
        }
    }
}
