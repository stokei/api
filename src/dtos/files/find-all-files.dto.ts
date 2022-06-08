import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllFilesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllFilesDTO = keyof WhereDataFindAllFilesDTO;

export interface OrderByDataFindAllFilesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllFilesDTO = keyof OrderByDataFindAllFilesDTO;

export type FindAllFilesDTO = IBaseFindManyDTO<
  WhereDataFindAllFilesDTO,
  OrderByDataFindAllFilesDTO
>;
