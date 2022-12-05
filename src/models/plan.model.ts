import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PlanType } from '@/enums/plan-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

export interface IPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly name: string;
  readonly description?: string;
  readonly type: PlanType;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PlanModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly name: string;
  readonly description?: string;
  readonly type: PlanType;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPlanModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PLANS,
      id: data._id?.toString() || data.id
    });
    this.name = data.name;
    this.app = data.app;
    this.description = data.description;
    this.type = data.type;
    this.active = data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPlan({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PlanCreatedEvent({
          createdBy,
          plan: this
        })
      );
    }
  }

  updatedPlan({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PlanUpdatedEvent({
          updatedBy,
          plan: this
        })
      );
    }
  }
}
