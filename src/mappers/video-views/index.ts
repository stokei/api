import { VideoViewEntity } from '@/entities';
import { VideoViewModel } from '@/models/video-view.model';

export class VideoViewMapper {
  toModel(videoView: VideoViewEntity) {
    return videoView && new VideoViewModel(videoView);
  }
  toModels(videoViews: VideoViewEntity[]) {
    return videoViews?.length > 0
      ? videoViews.map(this.toModel).filter(Boolean)
      : [];
  }
}
