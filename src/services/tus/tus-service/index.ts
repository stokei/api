import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

import { PATH_FILES } from '@/constants/upload-file-paths';

import tus = require('tus-node-server');

import { LOCAL_UPLOAD_URL_PATHNAME } from '@/constants/upload-url';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';
import { getFileMetadata } from '@/utils/get-file-metadata';

@Injectable()
export class TusService implements OnModuleInit {
  private logger: Logger;
  private tusServer: tus.Server;

  constructor(
    private readonly updateFileService: UpdateFileService,
    private readonly findFileByIdService: FindFileByIdService,
    private readonly activateFileService: ActivateFileService
  ) {
    this.logger = new Logger(TusService.name);
    this.tusServer = new tus.Server({
      path: LOCAL_UPLOAD_URL_PATHNAME,
      namingFunction: this.fileNameFromRequest
    });
  }

  onModuleInit() {
    this.initializeTusServer();
  }

  async handleTus(req, res) {
    const [fileId] = req.params.file?.split('.') || [];
    await this.findFileByIdService.execute(fileId);
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
      const metadata = getFileMetadata(event.file?.upload_metadata);
      const [fileId] = event.file?.id?.split('.') || [];

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
            file: fileId
          }
        })
        .catch((e) => this.logger.error(e.message));
    });

    this.tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
      const metadata = getFileMetadata(event.file?.upload_metadata);
      const [fileId] = event.file?.id?.split('.') || [];

      this.activateFileService
        .execute({
          app: metadata?.appId,
          file: fileId,
          updatedBy: metadata?.accountId
        })
        .catch((e) => {
          this.logger.error(e.message);
          this.tusServer.datastore.remove(event.file.id);
        });
    });
  }

  private fileNameFromRequest = (req) => {
    try {
      const metadata = getFileMetadata(req.header('Upload-Metadata'));
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
}
