import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrdersItemsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountOrdersItemsWhereDTO = keyof CountOrdersItemsWhereDTO;

export type CountOrdersItemsDTO = IBaseCountDTO<CountOrdersItemsWhereDTO>;
