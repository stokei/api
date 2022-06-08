import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrdersAddressesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllOrdersAddressesDTO =
  keyof WhereDataFindAllOrdersAddressesDTO;

export interface OrderByDataFindAllOrdersAddressesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrdersAddressesDTO =
  keyof OrderByDataFindAllOrdersAddressesDTO;

export type FindAllOrdersAddressesDTO = IBaseFindManyDTO<
  WhereDataFindAllOrdersAddressesDTO,
  OrderByDataFindAllOrdersAddressesDTO
>;
