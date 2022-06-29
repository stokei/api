import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllColorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllColorsDTO = keyof WhereDataFindAllColorsDTO;

export interface OrderByDataFindAllColorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllColorsDTO =
  keyof OrderByDataFindAllColorsDTO;

export type FindAllColorsDTO = IBaseFindManyDTO<
  WhereDataFindAllColorsDTO,
  OrderByDataFindAllColorsDTO
>;
