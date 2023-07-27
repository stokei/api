import { CountUsageRecordsRepository } from './count-usage-records';
import { CreateUsageRecordRepository } from './create-usage-record';
import { FindAllUsageRecordsRepository } from './find-all-usage-records';
import { FindUsageRecordByIdRepository } from './find-usage-record-by-id';
import { SumUsageRecordByParentRepository } from './sum-usage-record-by-parent';

export const UsageRecordsRepositories = [
  CountUsageRecordsRepository,
  CreateUsageRecordRepository,
  FindUsageRecordByIdRepository,
  FindAllUsageRecordsRepository,
  SumUsageRecordByParentRepository
];
