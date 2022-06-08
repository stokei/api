import { ColorModel } from '@/models/color.model';

interface IDataColorRemovedEvent {
  readonly color: ColorModel;
}

export class ColorRemovedEvent {
  readonly color: ColorModel;

  constructor(data: IDataColorRemovedEvent) {
    this.color = data.color;
  }
}
