import { ColorModel } from '@/models/color.model';

interface IDataColorUpdatedEvent {
  readonly updatedBy: string;
  readonly color: ColorModel;
}

export class ColorUpdatedEvent {
  readonly updatedBy: string;
  readonly color: ColorModel;

  constructor(data: IDataColorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.color = data.color;
  }
}
