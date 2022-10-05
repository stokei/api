import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

import { PATH_IMAGES, PATH_VIDEOS } from '@/constants/upload-file-paths';
import { InvalidFileException } from '@/errors';
import { FileModel } from '@/models/file.model';

export class FileUploadInterceptorModel {
  constructor(readonly file: any) {}

  get isImage() {
    return FileModel.isImage(this.file?.mimetype);
  }

  get isVideo() {
    return FileModel.isVideo(this.file?.mimetype);
  }

  get filename(): string {
    return this.file?.key || this.file?.filename;
  }

  get destination() {
    let dest = '';
    if (this.isVideo) {
      dest = PATH_VIDEOS;
    }
    if (this.isImage) {
      dest = PATH_IMAGES;
    }
    if (!existsSync(dest)) {
      mkdirSync(dest);
    }
    return dest;
  }

  get path(): string {
    return this.destination + '/' + this.filename;
  }

  get temporaryURL(): string {
    return this.file?.location;
  }

  generateFilename() {
    return `${uuid()}${path.extname(this.file.originalname)}`;
  }

  filterVideo(callback: (error: Error, acceptFile: boolean) => void) {
    if (!this.isVideo) {
      return callback(new InvalidFileException(), false);
    }
    callback(null, true);
  }

  filterImage(callback: (error: Error, acceptFile: boolean) => void) {
    if (!this.isImage) {
      return callback(new InvalidFileException(), false);
    }
    callback(null, true);
  }
}
