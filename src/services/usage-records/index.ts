import { CreateUsageRecordService } from './create-usage-record';
import { FindAllUsageRecordsService } from './find-all-usage-records';
import { FindUsageRecordByIdService } from './find-usage-record-by-id';
import { RemoveUsageRecordService } from './remove-usage-record';
import { UpdateUsageRecordService } from './update-usage-record';

export const UsageRecordServices = [
  CreateUsageRecordService,
  RemoveUsageRecordService,
  UpdateUsageRecordService,
  FindUsageRecordByIdService,
  FindAllUsageRecordsService
];
