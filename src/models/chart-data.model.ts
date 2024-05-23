import { convertToISODateString } from '@stokei/nestjs';

export interface IChartDataModelData {
  readonly label: string;
  readonly value: string | number | Date;
}

export class ChartDataModel {
  readonly label: string;
  readonly value: string;

  constructor(data: IChartDataModelData) {
    this.value = this.convertToString(data.value);
    this.label = this.convertToString(data.label);
  }

  convertToString(value: string | number | Date) {
    if (typeof value === 'number' || typeof value === 'bigint') {
      const num = Number(value);
      return !isNaN(num) ? num + '' : '';
    }
    if (value instanceof Date) {
      return convertToISODateString(value) || '';
    }
    return value || '';
  }
}
