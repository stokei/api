import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { PlanRemovedEvent } from '@/events/implements/plans/plan-removed.event';
import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

export interface IPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly type: PlanType;
  readonly checkoutVisible: boolean;
  readonly status: PlanStatus;
  readonly hasCustomDomain: boolean;
  readonly hasCustomSite: boolean;
  readonly quantityCourses: number;
  readonly quantityInstructorPerCourses: number;
  readonly quantityClassroomsPerCourses: number;
  readonly quantityModulesPerClassrooms: number;
  readonly quantityVideosPerModules: number;
  readonly salesCommissionPercentage: number;
  readonly active: boolean;
  readonly canceledAt: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PlanModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly type: PlanType;
  readonly checkoutVisible: boolean;
  readonly status: PlanStatus;
  readonly hasCustomDomain: boolean;
  readonly hasCustomSite: boolean;
  readonly quantityCourses: number;
  readonly quantityInstructorPerCourses: number;
  readonly quantityClassroomsPerCourses: number;
  readonly quantityModulesPerClassrooms: number;
  readonly quantityVideosPerModules: number;
  readonly salesCommissionPercentage: number;
  readonly active: boolean;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPlanModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PLANS,
      module: ServerStokeiApiIdPrefix.PLANS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.type = data.type;
    this.checkoutVisible = data.checkoutVisible;
    this.status = data.status;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorPerCourses = data.quantityInstructorPerCourses;
    this.quantityClassroomsPerCourses = data.quantityClassroomsPerCourses;
    this.quantityModulesPerClassrooms = data.quantityModulesPerClassrooms;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
    this.salesCommissionPercentage = data.salesCommissionPercentage;
    this.active = data.active;
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
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
