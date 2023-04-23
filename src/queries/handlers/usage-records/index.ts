import { FindAllUsageRecordsQueryHandler } from './find-all-usage-records';
import { FindUsageRecordByIdQueryHandler } from './find-usage-record-by-id';

export const UsageRecordQueriesHandlers = [
  FindUsageRecordByIdQueryHandler,
  FindAllUsageRecordsQueryHandler
];
