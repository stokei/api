import { CountUsageRecordsRepository } from './count-usage-records';
import { CreateUsageRecordRepository } from './create-usage-record';
import { FindAllUsageRecordsRepository } from './find-all-usage-records';
import { FindUsageRecordByIdRepository } from './find-usage-record-by-id';

export const UsageRecordsRepositories = [
  CountUsageRecordsRepository,
  CreateUsageRecordRepository,
  FindUsageRecordByIdRepository,
  FindAllUsageRecordsRepository
];
