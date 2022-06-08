import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPagesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountPagesWhereDTO = keyof CountPagesWhereDTO;

export type CountPagesDTO = IBaseCountDTO<CountPagesWhereDTO>;
