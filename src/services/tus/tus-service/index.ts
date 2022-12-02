import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

import { PATH_FILES } from '@/constants/upload-file-paths';
import { TusFileMetadataModel } from '@/models/tus-file-metadata.model';

import tus = require('tus-node-server');

import { LOCAL_UPLOAD_URL_PATHNAME } from '@/constants/upload-url';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';

@Injectable()
export class TusService implements OnModuleInit {
  private logger = new Logger('TusService');
  private tusServer: tus.Server;

  constructor(
    private readonly updateFileService: UpdateFileService,
    private readonly findFileByIdService: FindFileByIdService,
    private readonly activateFileService: ActivateFileService
  ) {
    this.tusServer = new tus.Server({
      path: LOCAL_UPLOAD_URL_PATHNAME,
      namingFunction: this.fileNameFromRequest
    });
  }

  onModuleInit() {
    this.initializeTusServer();
  }

  async handleTus(req, res) {
    return this.tusServer.handle(req, res);
  }

  private initializeTusServer() {
    this.logger.log(`Initializing Tus Server`);

    if (!existsSync(PATH_FILES)) {
      mkdirSync(PATH_FILES, { recursive: true });
    }

    this.tusServer.datastore = new tus.FileStore({
      directory: PATH_FILES
    });

    this.tusServer.on(tus.EVENTS.EVENT_FILE_CREATED, (event) => {
      const metadata = this.getFileMetadata(event.file?.upload_metadata);
      const [fileId] = event.file?.id?.split('.') || [];
      this.findFileByIdService.execute(fileId).then((file) => {
        this.updateFileService
          .execute({
            data: {
              filename: fileId as string,
              mimetype: metadata?.filetype,
              extension: metadata?.extension,
              size: parseInt(metadata?.size, 10),
              updatedBy: metadata?.accountId
            },
            where: {
              app: metadata?.appId,
              file: file.id
            }
          })
          .catch((e) => this.logger.error(e.message));
      });
    });

    this.tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
      const metadata = this.getFileMetadata(event.file?.upload_metadata);
      const [fileId] = event.file?.id?.split('.') || [];

      this.findFileByIdService
        .execute(fileId)
        .then((file) => {
          this.activateFileService
            .execute({
              app: metadata?.appId,
              file: file.id,
              updatedBy: metadata?.accountId
            })
            .catch((e) => this.logger.error(e.message));
        })
        .catch((e) => this.logger.error(e.message));
    });
  }

  private fileNameFromRequest = (req) => {
    try {
      const metadata = this.getFileMetadata(req.header('Upload-Metadata'));
      const [fileId] = req.params.file?.split('.') || [];
      const fileName = metadata.extension
        ? fileId + '.' + metadata.extension
        : fileId;
      return fileName;
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  };

  private getFileMetadata(uploadMeta: string): TusFileMetadataModel {
    const metadata = new TusFileMetadataModel();

    uploadMeta.split(',').map((item) => {
      const tmp = item.split(' ');
      const key = tmp[0];
      const value = Buffer.from(tmp[1], 'base64').toString('ascii');
      metadata[`${key}`] = value;
    });

    let extension: string = metadata.filename
      ? metadata.filename.split('.').pop()
      : null;
    extension = extension && extension.length === 3 ? extension : null;
    metadata.extension = extension;

    return metadata;
  }
}
