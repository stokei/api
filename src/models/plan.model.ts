import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { PlanRemovedEvent } from '@/events/implements/plans/plan-removed.event';
import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

export interface IPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PlanModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPlanModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PLANS,
      module: ServerStokeiApiIdPrefix.PLANS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPlan() {
    if (this.id) {
      this.apply(
        new PlanCreatedEvent({
          plan: this
        })
      );
    }
  }

  updatedPlan() {
    if (this.id) {
      this.apply(
        new PlanUpdatedEvent({
          plan: this
        })
      );
    }
  }

  removedPlan() {
    if (this.id) {
      this.apply(
        new PlanRemovedEvent({
          plan: this
        })
      );
    }
  }
}
