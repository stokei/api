import { FindAllUsageRecordsQueryHandler } from './find-all-usage-records';
import { FindUsageRecordByIdQueryHandler } from './find-usage-record-by-id';
import { SumUsageRecordByParentQueryHandler } from './sum-usage-record-by-parent';

export const UsageRecordQueriesHandlers = [
  FindUsageRecordByIdQueryHandler,
  FindAllUsageRecordsQueryHandler,
  SumUsageRecordByParentQueryHandler
];
