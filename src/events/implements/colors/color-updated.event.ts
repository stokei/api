import { ColorModel } from '@/models/color.model';

interface IDataColorUpdatedEvent {
  readonly color: ColorModel;
}

export class ColorUpdatedEvent {
  readonly color: ColorModel;

  constructor(data: IDataColorUpdatedEvent) {
    this.color = data.color;
  }
}
