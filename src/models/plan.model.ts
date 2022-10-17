import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

export interface IPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly product: string;
  readonly price: string;
  readonly name: string;
  readonly hasCustomDomain: boolean;
  readonly hasCustomSite: boolean;
  readonly quantityCourses: number;
  readonly quantityInstructorsPerCourse: number;
  readonly quantityModulesPerCourse: number;
  readonly quantityVideosPerModules: number;
  readonly applicationFeePercentage: number;
  readonly active: boolean;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PlanModel extends AggregateRoot {
  readonly id: string;
  readonly product: string;
  readonly price: string;
  readonly name: string;
  readonly hasCustomDomain: boolean;
  readonly hasCustomSite: boolean;
  readonly quantityCourses: number;
  readonly quantityInstructorsPerCourse: number;
  readonly quantityModulesPerCourse: number;
  readonly quantityVideosPerModules: number;
  readonly applicationFeePercentage: number;
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
    this.name = data.name;
    this.product = data.product;
    this.price = data.price;
    this.hasCustomDomain = data.hasCustomDomain;
    this.hasCustomSite = data.hasCustomSite;
    this.quantityCourses = data.quantityCourses;
    this.quantityInstructorsPerCourse = data.quantityInstructorsPerCourse;
    this.quantityModulesPerCourse = data.quantityModulesPerCourse;
    this.quantityVideosPerModules = data.quantityVideosPerModules;
    this.applicationFeePercentage = data.applicationFeePercentage;
    this.active = data.active;
    this.canceledAt = convertToISODateString(data.canceledAt);
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
