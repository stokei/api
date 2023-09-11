import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPagesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  slug?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPagesWhereDTO = keyof CountPagesWhereDTO;

export type CountPagesDTO = IBaseCountDTO<CountPagesWhereDTO>;
