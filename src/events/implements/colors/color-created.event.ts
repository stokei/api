import { ColorModel } from '@/models/color.model';

interface IDataColorCreatedEvent {
  readonly color: ColorModel;
}

export class ColorCreatedEvent {
  readonly color: ColorModel;

  constructor(data: IDataColorCreatedEvent) {
    this.color = data.color;
  }
}
