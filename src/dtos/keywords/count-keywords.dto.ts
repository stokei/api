import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountKeywordsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountKeywordsWhereDTO = keyof CountKeywordsWhereDTO;

export type CountKeywordsDTO = IBaseCountDTO<CountKeywordsWhereDTO>;
