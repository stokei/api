import { ColorModel } from '@/models/color.model';

interface IDataColorCreatedEvent {
  readonly createdBy: string;
  readonly color: ColorModel;
}

export class ColorCreatedEvent {
  readonly createdBy: string;
  readonly color: ColorModel;

  constructor(data: IDataColorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.color = data.color;
  }
}
