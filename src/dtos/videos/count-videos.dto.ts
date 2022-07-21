import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVideosWhereDTO = keyof CountVideosWhereDTO;

export type CountVideosDTO = IBaseCountDTO<CountVideosWhereDTO>;
