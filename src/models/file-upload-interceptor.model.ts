import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

import { PATH_IMAGES, PATH_VIDEOS } from '@/constants/upload-file-paths';
import { InvalidFileException } from '@/errors';

export class FileUploadInterceptorModel {
  constructor(readonly request: any, readonly file: any) {}

  get isImage() {
    return !!this.file?.mimetype?.includes('image');
  }

  get isVideo() {
    return !!this.file?.mimetype?.includes('video');
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

  get filename() {
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
