import { VideoStatus } from '@/enums/video-status.enum';

export interface StartVideoEncodingRepositoryDataDTO {
  status: VideoStatus;
  active: boolean;
  updatedBy: string;
}

export interface StartVideoEncodingRepositoryWhereDTO {
  app: string;
  video: string;
}

export interface StartVideoEncodingRepositoryDTO {
  data: StartVideoEncodingRepositoryDataDTO;
  where: StartVideoEncodingRepositoryWhereDTO;
}
