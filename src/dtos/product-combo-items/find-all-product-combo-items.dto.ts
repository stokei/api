import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProductComboItemsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch<string | string[]>;
  product?: IWhereData<string | string[]>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllProductComboItemsDTO =
  keyof WhereDataFindAllProductComboItemsDTO;

export interface OrderByDataFindAllProductComboItemsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProductComboItemsDTO =
  keyof OrderByDataFindAllProductComboItemsDTO;

export type FindAllProductComboItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllProductComboItemsDTO,
  OrderByDataFindAllProductComboItemsDTO
>;
