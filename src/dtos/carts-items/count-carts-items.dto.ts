import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCartsItemsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCartsItemsWhereDTO = keyof CountCartsItemsWhereDTO;

export type CountCartsItemsDTO = IBaseCountDTO<CountCartsItemsWhereDTO>;
