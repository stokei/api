import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { RatingCreatedEvent } from '@/events/implements/ratings/rating-created.event';
import { RatingUpdatedEvent } from '@/events/implements/ratings/rating-updated.event';
import { RatingRemovedEvent } from '@/events/implements/ratings/rating-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IRatingModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class RatingModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IRatingModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.RATINGS,
      module: ServerStokeiApiIdPrefix.RATINGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdRating() {
    if (this.id) {
      this.apply(
        new RatingCreatedEvent({
          rating: this
        })
      );
    }
  }

  updatedRating() {
    if (this.id) {
      this.apply(
        new RatingUpdatedEvent({
          rating: this
        })
      );
    }
  }

  removedRating() {
    if (this.id) {
      this.apply(
        new RatingRemovedEvent({
          rating: this
        })
      );
    }
  }
}
