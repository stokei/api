import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllModuleVideosService } from '@/services/module-videos/find-all-module-videos';

@Injectable({ scope: Scope.REQUEST })
export class ModuleVideosLoader {
  constructor(
    private readonly moduleVideosService: FindAllModuleVideosService
  ) {}

  readonly findByIds = new DataLoader(async (moduleVideoIds: string[]) => {
    const moduleVideos = await this.moduleVideosService.execute({
      where: {
        AND: {
          ids: moduleVideoIds
        }
      }
    });
    const moduleVideosMap = new Map(
      moduleVideos?.items?.map((moduleVideo) => [moduleVideo.id, moduleVideo])
    );
    return moduleVideoIds.map((moduleVideoId) =>
      moduleVideosMap.get(moduleVideoId)
    );
  });
}
