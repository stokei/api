import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { AccountRole } from '@/enums/account-role.enum';

export interface WhereDataFindAllAccountsDTO {
  ids?: string[];
  parent?: IWhereData;
  firstname?: IWhereDataSearch;
  lastname?: IWhereDataSearch;
  email?: IWhereData;
  username?: IWhereData;
  roles?: AccountRole[];
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
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAccountsDTO =
  keyof OrderByDataFindAllAccountsDTO;

export type FindAllAccountsDTO = IBaseFindManyDTO<
  WhereDataFindAllAccountsDTO,
  OrderByDataFindAllAccountsDTO
>;
