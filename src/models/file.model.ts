import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import {
  convertToISODateString,
  createServiceId,
  Environment
} from '@stokei/nestjs';

import {
  CLOUDFLARE_IMAGE_URL,
  CLOUDFLARE_VIDEO_URL
} from '@/constants/cloudflare';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { FileStatus } from '@/enums/file-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { NODE_ENV, SERVER_URL } from '@/environments';
import { FileActivatedEvent } from '@/events/implements/files/file-activated.event';
import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export interface IFileModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly filename?: string;
  readonly extension?: string;
  readonly mimetype?: string;
  readonly size?: number;
  readonly url?: string;
  readonly duration?: number;
  readonly status: FileStatus;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class FileModel extends AggregateRoot {
  @ApiProperty()
  readonly id: string;
  @ApiProperty({ nullable: true })
  readonly filename?: string;
  @ApiProperty({ nullable: true })
  readonly filenameAndExtension?: string;
  @ApiProperty({ nullable: true })
  readonly extension?: string;
  @ApiProperty({ nullable: true })
  readonly mimetype?: string;
  @ApiProperty({ nullable: true })
  readonly size?: number;
  @ApiProperty({ nullable: true })
  readonly url?: string;
  @ApiProperty({ nullable: true })
  readonly duration?: number;
  @ApiProperty()
  readonly active: boolean;
  @ApiProperty()
  readonly isImage: boolean;
  @ApiProperty()
  readonly isVideo: boolean;
  @ApiProperty({ nullable: true })
  readonly updatedAt?: string;
  @ApiProperty({ nullable: true })
  readonly createdAt?: string;
  @ApiProperty({ nullable: true })
  readonly app: string;
  @ApiProperty({ nullable: true })
  readonly updatedBy?: string;
  @ApiProperty({ nullable: true })
  readonly createdBy?: string;
  @ApiProperty({ enum: FileStatus })
  readonly status: FileStatus;

  constructor(data: IFileModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.FILES,
      id: data._id?.toString() || data.id
    });
    this.filename = data.filename;
    this.mimetype = data.mimetype;
    this.extension = data.extension;
    this.filenameAndExtension = this.filename + '.' + this.extension;
    this.status = data.status;
    this.size = data.size;
    this.isImage = FileModel.isImage(this.mimetype);
    this.isVideo = FileModel.isVideo(this.mimetype);
    this.url = FileModel.createFileURL({
      fileId: this.id,
      url: data.url,
      filename: this.filename,
      mimetype: this.mimetype
    });
    this.duration = data.duration;
    this.active = this.status === FileStatus.ACTIVE || data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  static initialStatus({
    url,
    mimetype
  }: {
    url: string;
    mimetype: string;
  }): FileStatus {
    if (url) {
      return FileStatus.ACTIVE;
    }
    const isVideo = FileModel.isVideo(mimetype);
    if (isVideo) {
      return FileStatus.ENCODING;
    }
    return FileStatus.ACTIVE;
  }

  static initialActive({ status }: { status: FileStatus }): boolean {
    return FileStatus.ACTIVE === status;
  }

  static createFileURL({
    fileId,
    url,
    filename,
    mimetype
  }: {
    fileId?: string;
    mimetype?: string;
    filename?: string;
    url?: string;
  }) {
    if (url) {
      return url;
    }
    const isImage = FileModel.isImage(mimetype);
    const createURLFunctions = {
      [Environment.PRODUCTION]: () => {
        if (isImage) {
          return appendPathnameToURL(
            CLOUDFLARE_IMAGE_URL,
            filename + '/public'
          );
        }
        return appendPathnameToURL(
          CLOUDFLARE_VIDEO_URL,
          filename + '/manifest/video.m3u8'
        );
      },
      DEFAULT: () => {
        const baseURL = SERVER_URL;
        const basePathnameURL = REST_VERSIONS.V1_TEXT;
        return appendPathnameToURL(
          baseURL,
          `${basePathnameURL}/${REST_CONTROLLERS_URL_NAMES.UPLOADS}/${fileId}`
        );
      }
    };
    return createURLFunctions[NODE_ENV]?.() || createURLFunctions.DEFAULT();
  }

  static isImage(mimetype: string): boolean {
    return !!mimetype?.includes('image');
  }
  static isVideo(mimetype: string): boolean {
    return !!mimetype?.includes('video');
  }

  createdFile({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new FileCreatedEvent({
          createdBy,
          file: this
        })
      );
    }
  }

  updatedFile({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new FileUpdatedEvent({
          updatedBy,
          file: this
        })
      );
    }
  }

  removedFile({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new FileRemovedEvent({
          removedBy,
          file: this
        })
      );
    }
  }

  fileActivated({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new FileActivatedEvent({
          updatedBy,
          file: this
        })
      );
    }
  }
}
