import { ColorModel } from '@/models/color.model';

interface IDataColorRemovedEvent {
  readonly removedBy: string;
  readonly color: ColorModel;
}

export class ColorRemovedEvent {
  readonly removedBy: string;
  readonly color: ColorModel;

  constructor(data: IDataColorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.color = data.color;
  }
}
