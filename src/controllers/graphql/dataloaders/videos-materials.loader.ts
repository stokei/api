import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllVideosMaterialsService } from '@/services/videos-materials/find-all-videos-materials';

@Injectable({ scope: Scope.REQUEST })
export class VideosMaterialsLoader {
  constructor(
    private readonly videosMaterialsService: FindAllVideosMaterialsService
  ) {}

  readonly findByIds = new DataLoader(async (videosMaterialIds: string[]) => {
    const videosMaterials = await this.videosMaterialsService.execute({
      where: {
        AND: {
          ids: videosMaterialIds
        }
      }
    });
    const videosMaterialsMap = new Map(
      videosMaterials?.items?.map((videosMaterial) => [
        videosMaterial.id,
        videosMaterial
      ])
    );
    return videosMaterialIds.map((videosMaterialId) =>
      videosMaterialsMap.get(videosMaterialId)
    );
  });
}
