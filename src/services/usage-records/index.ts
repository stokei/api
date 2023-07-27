import { CreateUsageRecordService } from './create-usage-record';
import { FindAllUsageRecordsService } from './find-all-usage-records';
import { FindUsageRecordByIdService } from './find-usage-record-by-id';
import { SumUsageRecordByParentService } from './sum-usage-record-by-parent';

export const UsageRecordServices = [
  CreateUsageRecordService,
  FindUsageRecordByIdService,
  FindAllUsageRecordsService,
  SumUsageRecordByParentService
];
