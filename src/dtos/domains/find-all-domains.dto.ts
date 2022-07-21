import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';

export interface WhereDataFindAllDomainsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  default?: IWhereData<boolean>;
  active?: IWhereData<boolean>;
  fulldomain?: IWhereDataSearch;
  extension?: IWhereData;
  language?: IWhereData;
  status?: DomainStatus;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllDomainsDTO = keyof WhereDataFindAllDomainsDTO;

export interface OrderByDataFindAllDomainsDTO {
  name?: IOrderBy;
  default?: IOrderBy;
  active?: IOrderBy;
  fulldomain?: IOrderBy;
  extension?: IOrderBy;
  language?: IOrderBy;
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
