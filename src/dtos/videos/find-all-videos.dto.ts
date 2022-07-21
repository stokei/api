import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { VideoStatus } from '@/enums/video-status.enum';

export interface WhereDataFindAllVideosDTO {
  ids?: string[];
  name?: IWhereDataSearch;
  slug?: IWhereData<string>;
  description?: IWhereData<string>;
  status?: IWhereData<VideoStatus>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllVideosDTO = keyof WhereDataFindAllVideosDTO;

export interface OrderByDataFindAllVideosDTO {
  name?: IOrderBy;
  slug?: IOrderBy;
  description?: IOrderBy;
  duration?: IOrderBy;
  status?: IOrderBy;
  active?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosDTO =
  keyof OrderByDataFindAllVideosDTO;

export type FindAllVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosDTO,
  OrderByDataFindAllVideosDTO
>;
