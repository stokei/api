import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { AccountRole } from '@/enums/account-role.enum';

export interface WhereDataFindAllAccountsDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  firstname?: IWhereDataSearch;
  lastname?: IWhereDataSearch;
  email?: IWhereData;
  roles?: AccountRole[];
  username?: IWhereData;
}
export type IKeysWhereDataFindAllAccountsDTO =
  keyof WhereDataFindAllAccountsDTO;

export interface OrderByDataFindAllAccountsDTO {
  firstname?: IOrderBy;
  lastname?: IOrderBy;
  email?: IOrderBy;
  username?: IOrderBy;
  status?: IOrderBy;
  canceledAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAccountsDTO =
  keyof OrderByDataFindAllAccountsDTO;

export type FindAllAccountsDTO = IBaseFindManyDTO<
  WhereDataFindAllAccountsDTO,
  OrderByDataFindAllAccountsDTO
>;
