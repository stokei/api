import { ImageModel } from '@/models/image.model';

interface IDataImageUpdatedEvent {
  readonly updatedBy: string;
  readonly image: ImageModel;
}

export class ImageUpdatedEvent {
  readonly updatedBy: string;
  readonly image: ImageModel;

  constructor(data: IDataImageUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.image = data.image;
  }
}
