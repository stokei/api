import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrderItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  product?: IWhereDataSearch;
  quantity?: IWhereData<number>;
  price?: IWhereData;
  recurring?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrderItemsWhereDTO = keyof CountOrderItemsWhereDTO;

export type CountOrderItemsDTO = IBaseCountDTO<CountOrderItemsWhereDTO>;
