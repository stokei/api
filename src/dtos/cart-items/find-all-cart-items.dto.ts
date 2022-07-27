import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllCartItemsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  price?: IWhereData;
  quantity?: IWhereData<number>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCartItemsDTO =
  keyof WhereDataFindAllCartItemsDTO;

export interface OrderByDataFindAllCartItemsDTO {
  quantity?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCartItemsDTO =
  keyof OrderByDataFindAllCartItemsDTO;

export type FindAllCartItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllCartItemsDTO,
  OrderByDataFindAllCartItemsDTO
>;
