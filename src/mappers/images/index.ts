import { convertToISODateString } from '@stokei/nestjs';

import { ImageEntity } from '@/entities';
import { ImageModel } from '@/models/image.model';

export class ImageMapper {
  toModel(image: ImageEntity) {
    return (
      image &&
      new ImageModel({
        ...image,
        updatedAt: convertToISODateString(image.updatedAt),
        createdAt: convertToISODateString(image.createdAt)
      })
    );
  }
  toModels(images: ImageEntity[]) {
    return images?.length > 0 ? images.map(this.toModel).filter(Boolean) : [];
  }
}
