import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllAppInstructorsDTO {
  ids?: string[];
  app?: IWhereData;
  instructor?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAppInstructorsDTO =
  keyof WhereDataFindAllAppInstructorsDTO;

export interface OrderByDataFindAllAppInstructorsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAppInstructorsDTO =
  keyof OrderByDataFindAllAppInstructorsDTO;

export type FindAllAppInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllAppInstructorsDTO,
  OrderByDataFindAllAppInstructorsDTO
>;
