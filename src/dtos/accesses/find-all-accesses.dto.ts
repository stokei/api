import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllAccessesDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAccessesDTO =
  keyof WhereDataFindAllAccessesDTO;

export interface OrderByDataFindAllAccessesDTO {
  active?: IOrderBy;
  expiresIn?: IOrderBy;
  canceledAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAccessesDTO =
  keyof OrderByDataFindAllAccessesDTO;

export type FindAllAccessesDTO = IBaseFindManyDTO<
  WhereDataFindAllAccessesDTO,
  OrderByDataFindAllAccessesDTO
>;
