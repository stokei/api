import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSortedItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountSortedItemsWhereDTO = keyof CountSortedItemsWhereDTO;

export type CountSortedItemsDTO = IBaseCountDTO<CountSortedItemsWhereDTO>;
