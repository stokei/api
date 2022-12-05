import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { FeatureCreatedEvent } from '@/events/implements/features/feature-created.event';
import { FeatureRemovedEvent } from '@/events/implements/features/feature-removed.event';
import { FeatureUpdatedEvent } from '@/events/implements/features/feature-updated.event';

export interface IFeatureModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class FeatureModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IFeatureModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.FEATURES,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdFeature({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new FeatureCreatedEvent({
          createdBy,
          feature: this
        })
      );
    }
  }

  updatedFeature({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new FeatureUpdatedEvent({
          updatedBy,
          feature: this
        })
      );
    }
  }

  removedFeature({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new FeatureRemovedEvent({
          removedBy,
          feature: this
        })
      );
    }
  }
}
