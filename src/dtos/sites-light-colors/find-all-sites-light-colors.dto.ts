import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSitesLightColorsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSitesLightColorsDTO =
  keyof WhereDataFindAllSitesLightColorsDTO;

export interface OrderByDataFindAllSitesLightColorsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSitesLightColorsDTO =
  keyof OrderByDataFindAllSitesLightColorsDTO;

export type FindAllSitesLightColorsDTO = IBaseFindManyDTO<
  WhereDataFindAllSitesLightColorsDTO,
  OrderByDataFindAllSitesLightColorsDTO
>;
