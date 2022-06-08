import { ImageModel } from '@/models/image.model';

interface IDataImageCreatedEvent {
  readonly image: ImageModel;
}

export class ImageCreatedEvent {
  readonly image: ImageModel;

  constructor(data: IDataImageCreatedEvent) {
    this.image = data.image;
  }
}
