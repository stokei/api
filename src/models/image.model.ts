import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';

export interface IImageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly file: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ImageModel extends AggregateRoot {
  readonly id: string;
  readonly file: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IImageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.IMAGES,
      module: ServerStokeiApiIdPrefix.IMAGES,
      id: data._id?.toString() || data.id
    });
    this.file = data.file;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdImage({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ImageCreatedEvent({
          createdBy,
          image: this
        })
      );
    }
  }

  removedImage({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ImageRemovedEvent({
          removedBy,
          image: this
        })
      );
    }
  }
}
