import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { UsageRecordAction } from '@/enums/usage-record-action.enum';
import { UsageRecordCreatedEvent } from '@/events/implements/usage-records/usage-record-created.event';

export interface IUsageRecordModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly quantity: number;
  readonly action: UsageRecordAction;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class UsageRecordModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly quantity: number;
  readonly action: UsageRecordAction;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IUsageRecordModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.USAGE_RECORDS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.quantity = data.quantity;
    this.action = data.action;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdUsageRecord({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new UsageRecordCreatedEvent({
          createdBy,
          usageRecord: this
        })
      );
    }
  }
}
