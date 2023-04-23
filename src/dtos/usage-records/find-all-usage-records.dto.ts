import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { UsageRecordAction } from '@/enums/usage-record-action.enum';

export interface WhereDataFindAllUsageRecordsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  action?: UsageRecordAction;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllUsageRecordsDTO =
  keyof WhereDataFindAllUsageRecordsDTO;

export interface OrderByDataFindAllUsageRecordsDTO {
  quantity?: IOrderBy;
  action?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllUsageRecordsDTO =
  keyof OrderByDataFindAllUsageRecordsDTO;

export type FindAllUsageRecordsDTO = IBaseFindManyDTO<
  WhereDataFindAllUsageRecordsDTO,
  OrderByDataFindAllUsageRecordsDTO
>;
