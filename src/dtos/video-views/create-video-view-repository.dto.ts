import { CreateVideoViewDTO } from './create-video-view.dto';

export interface CreateVideoViewRepositoryDTO extends CreateVideoViewDTO {
  viewedDuration: number;
  videoDuration: number;
}
