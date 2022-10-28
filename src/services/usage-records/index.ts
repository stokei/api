import { CreateUsageRecordService } from './create-usage-record';
import { FindAllUsageRecordsService } from './find-all-usage-records';
import { FindUsageRecordByIdService } from './find-usage-record-by-id';

export const UsageRecordServices = [
  CreateUsageRecordService,
  FindUsageRecordByIdService,
  FindAllUsageRecordsService
];
