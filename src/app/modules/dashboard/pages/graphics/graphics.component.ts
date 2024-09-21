import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { GeoCenterContainerComponent } from 'src/app/core/geo-center-container/geo-center-container.component';
import { ChartModule } from 'primeng/chart';
import { GraphicService } from './services/graphic.service';
import { SplitterModule } from 'primeng/splitter';
import { NgFor, NgIf } from '@angular/common';
import { Data } from './interfaces/data.interface';
import { CombinedData } from './interfaces/combinedData.interface';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GeoLoadingComponent } from 'src/app/core/geo-loading/geo-loading.component';

// Registrar el plugin de ChartDataLabels
Chart.register(ChartDataLabels);

@Component({
    selector: 'app-graphics',
    standalone: true,
    imports: [
        NgFor,
        NgIf,

        GeoCenterContainerComponent,
        GeoLoadingComponent,

        ChartModule,
        SplitterModule,
        ScrollPanelModule,
    ],
    templateUrl: './graphics.component.html',
    styles:`
        @media (max-width: 768px) {
            .pie-chart-container {
                width: 100% !important;
                display: block;
            }

            p-splitter {
                flex-direction: column !important;
            }
            
            .col {
                width: 100%;
            }

            .p-splitter-panel {
                flex-basis: 100% !important;
            }
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GraphicsComponent {
    private readonly graphicsService = inject(GraphicService);
    
    public chartData = signal<Data[]>([]);
    public combinedDataChart = signal<CombinedData[]>([]);
    public options = signal<any>(null);
    public show = signal(false)

    ngOnInit() {
        this.getData();

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.options.set({
            // cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
                // Configuración del plugin de datalabels para mostrar porcentajes
                datalabels: {
                    color: textColor,
                    font: {
                        weight: 'bold', // Estilo de texto en negrita
                        size: 14, // Ajustar tamaño de texto
                    },
                    formatter: (value: number, ctx: any) => {
                        let datasets = ctx.chart.data.datasets;

                        // Calcular el porcentaje
                        if (datasets.length > 0) {
                            let total = datasets[0].data.reduce(
                                (a: number, b: number) => a + b,
                                0
                            );
                            let percentage = Math.round((value / total) * 100);

                            // Ocultar los porcentajes de 0%
                            if (percentage === 0) {
                                return ''; // No mostrar nada si el valor es 0%
                            }

                            return percentage + '%';
                        }
                        return ''; // Retornar una cadena vacía si no hay datos
                    },
                },
            },
        });
    }

    getData() {
        const documentStyle = getComputedStyle(document.documentElement);
        const backgroundColor = [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
        ];
        const hoverBackgroundColor = [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
        ];

        this.graphicsService.getDataByGraphics().subscribe({
            next: (res: Data[]) => {
                const updatedData = res.map((item: Data) => ({
                    ...item,
                    data: {
                        ...item['data'],
                        labels: item['data'].labels.flat(),
                        datasets: item['data'].datasets.map((dataset) => ({
                            ...dataset,
                            backgroundColor: backgroundColor,
                            hoverBackgroundColor: hoverBackgroundColor,
                        })),
                    },
                }));

                // Agrupar los datos por tipo
                const firstData = updatedData.filter(
                    (item) => item.surveyType === 'first'
                );
                const secondData = updatedData.filter(
                    (item) => item.surveyType === 'second'
                );

                // Crear una estructura combinada
                const combinedData = firstData.map((firstChart, index) => ({
                    firstChart,
                    secondChart: secondData[index] || null,
                }));

                this.combinedDataChart.set(combinedData);
                this.show.set(true)
            },
            error: (err) => console.log(err),
        });
    }

    isMobileView(): boolean {
        return window.innerWidth < 768; // Cambia 768 por el ancho máximo que consideres "móvil"
    }
    
}
