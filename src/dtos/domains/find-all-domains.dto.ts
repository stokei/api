import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllDomainsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllDomainsDTO = keyof WhereDataFindAllDomainsDTO;

export interface OrderByDataFindAllDomainsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllDomainsDTO =
  keyof OrderByDataFindAllDomainsDTO;

export type FindAllDomainsDTO = IBaseFindManyDTO<
  WhereDataFindAllDomainsDTO,
  OrderByDataFindAllDomainsDTO
>;
