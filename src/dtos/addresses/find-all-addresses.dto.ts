import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllAddressesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllAddressesDTO =
  keyof WhereDataFindAllAddressesDTO;

export interface OrderByDataFindAllAddressesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAddressesDTO =
  keyof OrderByDataFindAllAddressesDTO;

export type FindAllAddressesDTO = IBaseFindManyDTO<
  WhereDataFindAllAddressesDTO,
  OrderByDataFindAllAddressesDTO
>;
