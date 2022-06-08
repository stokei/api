import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCartsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCartsWhereDTO = keyof CountCartsWhereDTO;

export type CountCartsDTO = IBaseCountDTO<CountCartsWhereDTO>;
