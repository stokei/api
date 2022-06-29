import { ImageModel } from '@/models/image.model';

interface IDataImageCreatedEvent {
  readonly createdBy: string;
  readonly image: ImageModel;
}

export class ImageCreatedEvent {
  readonly createdBy: string;
  readonly image: ImageModel;

  constructor(data: IDataImageCreatedEvent) {
    this.createdBy = data.createdBy;
    this.image = data.image;
  }
}
