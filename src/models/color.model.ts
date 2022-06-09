import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ColorCreatedEvent } from '@/events/implements/colors/color-created.event';
import { ColorRemovedEvent } from '@/events/implements/colors/color-removed.event';
import { ColorUpdatedEvent } from '@/events/implements/colors/color-updated.event';

export interface IColorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ColorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IColorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COLORS,
      module: ServerStokeiApiIdPrefix.COLORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdColor() {
    if (this.id) {
      this.apply(
        new ColorCreatedEvent({
          color: this
        })
      );
    }
  }

  updatedColor() {
    if (this.id) {
      this.apply(
        new ColorUpdatedEvent({
          color: this
        })
      );
    }
  }

  removedColor() {
    if (this.id) {
      this.apply(
        new ColorRemovedEvent({
          color: this
        })
      );
    }
  }
}
