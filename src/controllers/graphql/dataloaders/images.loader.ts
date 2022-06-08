import { Injectable, Scope } from '@nestjs/common';
import { FindAllImagesService } from '@/services/images/find-all-images';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ImagesLoader {
  constructor(private readonly imagesService: FindAllImagesService) {}

  readonly findByIds = new DataLoader(async (imageIds: string[]) => {
    const images = await this.imagesService.execute({
      where: {
        AND: {
          ids: imageIds
        }
      }
    });
    const imagesMap = new Map(images?.items?.map((image) => [image.id, image]));
    return imageIds.map((imageId) => imagesMap.get(imageId));
  });
}
