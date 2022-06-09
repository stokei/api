import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';
import { ImageUpdatedEvent } from '@/events/implements/images/image-updated.event';

export interface IImageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ImageModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IImageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.IMAGES,
      module: ServerStokeiApiIdPrefix.IMAGES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdImage() {
    if (this.id) {
      this.apply(
        new ImageCreatedEvent({
          image: this
        })
      );
    }
  }

  updatedImage() {
    if (this.id) {
      this.apply(
        new ImageUpdatedEvent({
          image: this
        })
      );
    }
  }

  removedImage() {
    if (this.id) {
      this.apply(
        new ImageRemovedEvent({
          image: this
        })
      );
    }
  }
}
