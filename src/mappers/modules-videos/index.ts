import { convertToISODateString } from '@stokei/nestjs';

import { ModulesVideoEntity } from '@/entities';
import { ModulesVideoModel } from '@/models/modules-video.model';

export class ModulesVideoMapper {
  toModel(modulesVideo: ModulesVideoEntity) {
    return (
      modulesVideo &&
      new ModulesVideoModel({
        ...modulesVideo,
        updatedAt: convertToISODateString(modulesVideo.updatedAt),
        createdAt: convertToISODateString(modulesVideo.createdAt)
      })
    );
  }
  toModels(modulesVideos: ModulesVideoEntity[]) {
    return modulesVideos?.length > 0
      ? modulesVideos.map(this.toModel).filter(Boolean)
      : [];
  }
}
