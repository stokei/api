import { ImageModel } from '@/models/image.model';

interface IDataImageUpdatedEvent {
  readonly image: ImageModel;
}

export class ImageUpdatedEvent {
  readonly image: ImageModel;

  constructor(data: IDataImageUpdatedEvent) {
    this.image = data.image;
  }
}
