import { ChartDataModel, IChartDataModelData } from '@/models/chart-data.model';

export class ChartDataMapper {
  toModel(chartData: IChartDataModelData) {
    return chartData && new ChartDataModel(chartData);
  }
  toModels(chartDatas: IChartDataModelData[]) {
    return chartDatas?.length > 0
      ? chartDatas.map(this.toModel).filter(Boolean)
      : [];
  }
}
