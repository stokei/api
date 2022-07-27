import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';

export interface WhereDataFindAllDomainsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  name?: IWhereDataSearch;
  active?: IWhereData<boolean>;
  status?: DomainStatus;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllDomainsDTO = keyof WhereDataFindAllDomainsDTO;

export interface OrderByDataFindAllDomainsDTO {
  name?: IOrderBy;
  active?: IOrderBy;
  status?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllDomainsDTO =
  keyof OrderByDataFindAllDomainsDTO;

export type FindAllDomainsDTO = IBaseFindManyDTO<
  WhereDataFindAllDomainsDTO,
  OrderByDataFindAllDomainsDTO
>;
