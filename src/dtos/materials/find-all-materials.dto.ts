import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllMaterialsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  free?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllMaterialsDTO =
  keyof WhereDataFindAllMaterialsDTO;

export interface OrderByDataFindAllMaterialsDTO {
  name?: IOrderBy;
  free?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllMaterialsDTO =
  keyof OrderByDataFindAllMaterialsDTO;

export type FindAllMaterialsDTO = IBaseFindManyDTO<
  WhereDataFindAllMaterialsDTO,
  OrderByDataFindAllMaterialsDTO
>;
