import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCartsItemsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCartsItemsWhereDTO = keyof CountCartsItemsWhereDTO;

export type CountCartsItemsDTO = IBaseCountDTO<CountCartsItemsWhereDTO>;
