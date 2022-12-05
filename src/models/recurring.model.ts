import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { IntervalType } from '@/enums/interval-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { UsageType } from '@/enums/usage-type.enum';
import { RecurringCreatedEvent } from '@/events/implements/recurrings/recurring-created.event';
import { RecurringRemovedEvent } from '@/events/implements/recurrings/recurring-removed.event';

export interface IRecurringModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly usageType: UsageType;
  readonly intervalCount: number;
  readonly interval: IntervalType;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class RecurringModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly usageType: UsageType;
  readonly intervalCount: number;
  readonly interval: IntervalType;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IRecurringModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.RECURRINGS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.usageType = data.usageType;
    this.intervalCount = data.intervalCount;
    this.interval = data.interval;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdRecurring({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new RecurringCreatedEvent({
          createdBy,
          recurring: this
        })
      );
    }
  }

  removedRecurring({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new RecurringRemovedEvent({
          removedBy,
          recurring: this
        })
      );
    }
  }
}
