import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllCartsDTO {
  ids?: string[];
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCartsDTO = keyof WhereDataFindAllCartsDTO;

export interface OrderByDataFindAllCartsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCartsDTO = keyof OrderByDataFindAllCartsDTO;

export type FindAllCartsDTO = IBaseFindManyDTO<
  WhereDataFindAllCartsDTO,
  OrderByDataFindAllCartsDTO
>;
