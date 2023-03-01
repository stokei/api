import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountCatalogItemsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  catalog?: IWhereData;
  product?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCatalogItemsWhereDTO = keyof CountCatalogItemsWhereDTO;

export type CountCatalogItemsDTO = IBaseCountDTO<CountCatalogItemsWhereDTO>;