import { VideoStatus } from '@/enums/video-status.enum';

import { CreateVideoDTO } from './create-video.dto';

export interface CreateVideoRepositoryDTO extends CreateVideoDTO {
  status: VideoStatus;
}
