import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  slug?: IWhereData<string>;
  description?: IWhereDataSearch;
  private?: IWhereData<boolean>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVideosWhereDTO = keyof CountVideosWhereDTO;

export type CountVideosDTO = IBaseCountDTO<CountVideosWhereDTO>;
