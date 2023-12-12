import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllCatalogItemsDTO {
  ids?: string[];
  app?: IWhereData;
  catalog?: IWhereData<string | string[]>;
  product?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCatalogItemsDTO =
  keyof WhereDataFindAllCatalogItemsDTO;

export interface OrderByDataFindAllCatalogItemsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCatalogItemsDTO =
  keyof OrderByDataFindAllCatalogItemsDTO;

export type FindAllCatalogItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllCatalogItemsDTO,
  OrderByDataFindAllCatalogItemsDTO
>;
