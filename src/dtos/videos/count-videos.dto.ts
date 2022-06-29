import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideosWhereDTO = keyof CountVideosWhereDTO;

export type CountVideosDTO = IBaseCountDTO<CountVideosWhereDTO>;
