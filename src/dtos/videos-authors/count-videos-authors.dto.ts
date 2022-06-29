import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountVideosAuthorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountVideosAuthorsWhereDTO = keyof CountVideosAuthorsWhereDTO;

export type CountVideosAuthorsDTO = IBaseCountDTO<CountVideosAuthorsWhereDTO>;
