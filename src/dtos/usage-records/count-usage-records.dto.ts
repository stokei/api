import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { UsageRecordAction } from '@/enums/usage-record-action.enum';

export interface CountUsageRecordsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  action?: UsageRecordAction;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountUsageRecordsWhereDTO = keyof CountUsageRecordsWhereDTO;

export type CountUsageRecordsDTO = IBaseCountDTO<CountUsageRecordsWhereDTO>;
