import { convertToISODateString } from '@stokei/nestjs';

import { ModuleVideoEntity } from '@/entities';
import { ModuleVideoModel } from '@/models/module-video.model';

export class ModuleVideoMapper {
  toModel(moduleVideo: ModuleVideoEntity) {
    return (
      moduleVideo &&
      new ModuleVideoModel({
        ...moduleVideo,
        updatedAt: convertToISODateString(moduleVideo.updatedAt),
        createdAt: convertToISODateString(moduleVideo.createdAt)
      })
    );
  }
  toModels(moduleVideos: ModuleVideoEntity[]) {
    return moduleVideos?.length > 0
      ? moduleVideos.map(this.toModel).filter(Boolean)
      : [];
  }
}
