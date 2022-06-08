import { Injectable, Scope } from '@nestjs/common';
import { FindAllModulesVideosService } from '@/services/modules-videos/find-all-modules-videos';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ModulesVideosLoader {
  constructor(
    private readonly modulesVideosService: FindAllModulesVideosService
  ) {}

  readonly findByIds = new DataLoader(async (modulesVideoIds: string[]) => {
    const modulesVideos = await this.modulesVideosService.execute({
      where: {
        AND: {
          ids: modulesVideoIds
        }
      }
    });
    const modulesVideosMap = new Map(
      modulesVideos?.items?.map((modulesVideo) => [
        modulesVideo.id,
        modulesVideo
      ])
    );
    return modulesVideoIds.map((modulesVideoId) =>
      modulesVideosMap.get(modulesVideoId)
    );
  });
}
