import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrderItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrderItemsWhereDTO = keyof CountOrderItemsWhereDTO;

export type CountOrderItemsDTO = IBaseCountDTO<CountOrderItemsWhereDTO>;
