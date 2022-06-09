import { convertToISODateString } from '@stokei/nestjs';

import { VideosMaterialEntity } from '@/entities';
import { VideosMaterialModel } from '@/models/videos-material.model';

export class VideosMaterialMapper {
  toModel(videosMaterial: VideosMaterialEntity) {
    return (
      videosMaterial &&
      new VideosMaterialModel({
        ...videosMaterial,
        updatedAt: convertToISODateString(videosMaterial.updatedAt),
        createdAt: convertToISODateString(videosMaterial.createdAt)
      })
    );
  }
  toModels(videosMaterials: VideosMaterialEntity[]) {
    return videosMaterials?.length > 0
      ? videosMaterials.map(this.toModel).filter(Boolean)
      : [];
  }
}
