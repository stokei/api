import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';

export interface IImageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly path: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ImageModel extends AggregateRoot {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
  @ApiProperty({ nullable: true })
  readonly updatedAt?: string;
  @ApiProperty({ nullable: true })
  readonly createdAt?: string;
  @ApiProperty({ nullable: true })
  readonly updatedBy?: string;
  @ApiProperty({ nullable: true })
  readonly createdBy?: string;

  constructor(data: IImageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.IMAGES,
      module: ServerStokeiApiIdPrefix.IMAGES,
      id: data._id?.toString() || data.id
    });
    this.path = data.path;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
