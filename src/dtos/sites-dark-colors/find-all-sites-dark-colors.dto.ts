import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSitesDarkColorsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSitesDarkColorsDTO =
  keyof WhereDataFindAllSitesDarkColorsDTO;

export interface OrderByDataFindAllSitesDarkColorsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSitesDarkColorsDTO =
  keyof OrderByDataFindAllSitesDarkColorsDTO;

export type FindAllSitesDarkColorsDTO = IBaseFindManyDTO<
  WhereDataFindAllSitesDarkColorsDTO,
  OrderByDataFindAllSitesDarkColorsDTO
>;
