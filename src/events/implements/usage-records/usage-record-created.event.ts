import { UsageRecordModel } from '@/models/usage-record.model';

interface IDataUsageRecordCreatedEvent {
  readonly createdBy: string;
  readonly usageRecord: UsageRecordModel;
}

export class UsageRecordCreatedEvent {
  readonly createdBy: string;
  readonly usageRecord: UsageRecordModel;

  constructor(data: IDataUsageRecordCreatedEvent) {
    this.createdBy = data.createdBy;
    this.usageRecord = data.usageRecord;
  }
}
