import { ImageModel } from '@/models/image.model';

interface IDataImageRemovedEvent {
  readonly image: ImageModel;
}

export class ImageRemovedEvent {
  readonly image: ImageModel;

  constructor(data: IDataImageRemovedEvent) {
    this.image = data.image;
  }
}
