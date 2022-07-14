import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllModuleVideosDTO {
  ids?: string[];
  module?: IWhereData;
  video?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllModuleVideosDTO =
  keyof WhereDataFindAllModuleVideosDTO;

export interface OrderByDataFindAllModuleVideosDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllModuleVideosDTO =
  keyof OrderByDataFindAllModuleVideosDTO;

export type FindAllModuleVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllModuleVideosDTO,
  OrderByDataFindAllModuleVideosDTO
>;
