import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { FileStore } from '@tus/file-store';
import { Server } from '@tus/server';
import { existsSync, mkdirSync } from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuid } from 'uuid';

import { PATH_FILES } from '@/constants/upload-file-paths';
import { LOCAL_UPLOAD_VIDEO_URL_PATHNAME } from '@/constants/upload-url';
import { ActivateFileService } from '@/services/files/activate-file';
import { CreateFileService } from '@/services/files/create-file';
import { FindFileByFilenameService } from '@/services/files/find-file-by-filename';
import { UpdateFileService } from '@/services/files/update-file';
import { getFileMetadata } from '@/utils/get-file-metadata';

@Injectable()
export class TusService implements OnModuleInit {
  private logger: Logger;
  private tusServer: Server;

  constructor(
    private readonly updateFileService: UpdateFileService,
    private readonly createFileService: CreateFileService,
    private readonly findFileByFilenameService: FindFileByFilenameService,
    private readonly activateFileService: ActivateFileService
  ) {
    this.logger = new Logger(TusService.name);
  }

  onModuleInit() {
    this.tusServer = new Server({
      path: LOCAL_UPLOAD_VIDEO_URL_PATHNAME,
      onUploadCreate: (...args) => this.onUploadCreate(...args),
      onUploadFinish: (...args) => this.onUploadFinish(...args),
      namingFunction: (...args) => this.fileNameFromRequest(...args),
      datastore: new FileStore({
        directory: PATH_FILES
      })
    });
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
  }

  private getFilenameFromUploadID(uploadID: string): string {
    const [fileId] = uploadID?.split('.') || [];
    return fileId;
  }

  private fileNameFromRequest(req) {
    try {
      const metadata = getFileMetadata(
        req.header('Upload-Metadata') || req.header('upload-metadata')
      );
      const id = uuid();
      const fileName = metadata.extension ? id + '.' + metadata.extension : id;
      return fileName;
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }

  private async onUploadCreate(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    upload: any
  ): Promise<ServerResponse<IncomingMessage>> {
    const metadata = getFileMetadata(upload?.metadata);
    const filename = this.getFilenameFromUploadID(upload?.id);

    const file = await this.createFileService.execute({
      filename,
      mimetype: metadata?.filetype,
      extension: metadata?.extension,
      size: upload?.size || parseInt(metadata?.size, 10),
      app: metadata?.appId,
      createdBy: metadata?.accountId
    });

    return res.setHeader('file-id', file.id);
  }

  private async onUploadFinish(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    upload: any
  ): Promise<ServerResponse<IncomingMessage>> {
    const metadata = getFileMetadata(upload?.metadata);
    const filename = this.getFilenameFromUploadID(upload?.id);
    const file = await this.findFileByFilenameService.execute(filename);

    this.activateFileService
      .execute({
        app: metadata?.appId,
        file: file.id,
        updatedBy: metadata?.accountId
      })
      .catch((e) => {
        this.logger.error(e.message);
        this.tusServer.datastore.remove(upload?.id);
      });
    return res.setHeader('file-id', file.id);
  }
}
