import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { FileStatus } from '@/enums/file-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { IS_PRODUCTION, SERVER_URL } from '@/environments';
import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileEncodingStartedEvent } from '@/events/implements/files/file-encoding-started.event';
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
  @ApiProperty()
  readonly canStartEncoding: boolean;
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
      module: ServerStokeiApiIdPrefix.FILES,
      id: data._id?.toString() || data.id
    });
    this.filename = data.filename;
    this.mimetype = data.mimetype;
    this.extension = data.extension;
    this.status = data.status;
    this.size = data.size;
    this.isImage = FileModel.isImage(this.mimetype);
    this.isVideo = FileModel.isVideo(this.mimetype);
    this.url = FileModel.createFileURL({
      url: data.url,
      filename: this.filename
    });
    this.canStartEncoding = this.fileCanStartEncoding();
    this.duration = data.duration;
    this.active = this.status === FileStatus.ACTIVE || data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  private fileCanStartEncoding(): boolean {
    const statusAllowed: FileStatus[] = [FileStatus.PENDING, FileStatus.ERROR];
    return IS_PRODUCTION && statusAllowed.includes(this.status);
  }

  static createFileURL({ url, filename }: { filename?: string; url?: string }) {
    if (url) {
      return url;
    }
    return appendPathnameToURL(
      SERVER_URL,
      `${REST_VERSIONS.V1_TEXT}/${REST_CONTROLLERS_URL_NAMES.VIDEOS}/${filename}`
    );
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

  fileEncodingStarted({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new FileEncodingStartedEvent({
          updatedBy,
          file: this
        })
      );
    }
  }
}
