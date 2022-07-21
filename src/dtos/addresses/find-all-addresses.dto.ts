import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllAddressesDTO {
  ids?: string[];
  parent?: IWhereData;
  default?: IWhereData<boolean>;
  street?: IWhereDataSearch;
  complement?: IWhereDataSearch;
  city?: IWhereDataSearch;
  country?: IWhereDataSearch;
  state?: IWhereDataSearch;
  postalCode?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAddressesDTO =
  keyof WhereDataFindAllAddressesDTO;

export interface OrderByDataFindAllAddressesDTO {
  default?: IOrderBy;
  street?: IOrderBy;
  complement?: IOrderBy;
  city?: IOrderBy;
  country?: IOrderBy;
  state?: IOrderBy;
  postalCode?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAddressesDTO =
  keyof OrderByDataFindAllAddressesDTO;

export type FindAllAddressesDTO = IBaseFindManyDTO<
  WhereDataFindAllAddressesDTO,
  OrderByDataFindAllAddressesDTO
>;
