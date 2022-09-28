import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { IS_DEVELOPMENT, SERVER_URL } from '@/environments';
import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export interface IImageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly path: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ImageModel extends AggregateRoot {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
  @ApiProperty()
  readonly url: string;
  @ApiProperty({ nullable: true })
  readonly updatedAt?: string;
  @ApiProperty({ nullable: true })
  readonly createdAt?: string;
  @ApiProperty({ nullable: true })
  readonly app: string;
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
    this.url = ImageModel.createImageURL(data.path);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  static createImageURL(imagePath: string) {
    if (IS_DEVELOPMENT) {
      return appendPathnameToURL(
        SERVER_URL,
        `${REST_VERSIONS.V1_TEXT}/${REST_CONTROLLERS_URL_NAMES.IMAGES}/${imagePath}`
      );
    }
    return imagePath;
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
