import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllAppAdminsDTO {
  ids?: string[];
  app?: IWhereData;
  admin?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAppAdminsDTO =
  keyof WhereDataFindAllAppAdminsDTO;

export interface OrderByDataFindAllAppAdminsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAppAdminsDTO =
  keyof OrderByDataFindAllAppAdminsDTO;

export type FindAllAppAdminsDTO = IBaseFindManyDTO<
  WhereDataFindAllAppAdminsDTO,
  OrderByDataFindAllAppAdminsDTO
>;
