import { IncrementVideoViewDTO } from './increment-video-view.dto';

export interface IncrementVideoViewRepositoryDTO extends IncrementVideoViewDTO {
  viewedDuration: number;
}
