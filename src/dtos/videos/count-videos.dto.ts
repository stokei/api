import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { VideoStatus } from '@/enums/video-status.enum';

export interface CountVideosWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  name?: IWhereDataSearch;
  slug?: IWhereData<string>;
  description?: IWhereData<string>;
  status?: VideoStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVideosWhereDTO = keyof CountVideosWhereDTO;

export type CountVideosDTO = IBaseCountDTO<CountVideosWhereDTO>;
