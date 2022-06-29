import { ImageModel } from '@/models/image.model';

interface IDataImageRemovedEvent {
  readonly removedBy: string;
  readonly image: ImageModel;
}

export class ImageRemovedEvent {
  readonly removedBy: string;
  readonly image: ImageModel;

  constructor(data: IDataImageRemovedEvent) {
    this.removedBy = data.removedBy;
    this.image = data.image;
  }
}
