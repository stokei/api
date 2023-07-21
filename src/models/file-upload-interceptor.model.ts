import { existsSync, mkdirSync, ReadStream } from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

import { MAX_VIDEO_UPLOAD_SIZE } from '@/constants/max-upload-sizes';
import { PATH_FILES } from '@/constants/upload-file-paths';
import { InvalidFileException } from '@/errors';
import { FileModel } from '@/models/file.model';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export class FileUploadInterceptorModel {
  constructor(readonly file: any) {}

  get isImage() {
    return FileModel.isImage(this?.extension);
  }

  get isVideo() {
    return FileModel.isVideo(this?.extension);
  }

  get filename(): string {
    const fullname = this.file?.key || this.file?.filename;
    const filenameWithoutExtension = path.parse(fullname).name;
    return filenameWithoutExtension;
  }

  get mimetype(): string {
    return this.file?.mimetype;
  }

  get filenameAndExtension(): string {
    return this.filename + '.' + this.extension;
  }

  get filenameAndPath(): string {
    return appendPathnameToURL(PATH_FILES, this.filenameAndExtension);
  }

  get extension(): string {
    const filenameExtension = path
      .extname(this.file?.filename || this.file?.originalname)
      ?.slice(1);
    if (filenameExtension) {
      return filenameExtension;
    }
    const mimetypeExtension = this.mimetype?.split('/')?.pop();
    return mimetypeExtension;
  }

  get size(): number {
    const fileSize = this.file.size;
    return fileSize;
  }

  async getSizeFromStream(): Promise<{ size: number }> {
    let fileSize = 0;
    const stream: ReadStream = this.file.stream;
    return new Promise((resolve, reject) => {
      stream?.on('readable', () => {
        const maxSize = Math.floor(MAX_VIDEO_UPLOAD_SIZE / 1024);
        while (null !== stream.read(maxSize)) {}
      });
      stream?.on('error', (error) => {
        reject(error);
      });
      stream?.on('data', (chunk) => {
        fileSize += chunk.length;
      });
      stream?.on('end', () => {
        resolve({ size: fileSize });
      });
    });
  }

  get destination() {
    const dest = PATH_FILES;
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

  filterFile(callback: (error: Error, acceptFile: boolean) => void) {
    if (!!this.isVideo || !!this.isImage) {
      return callback(new InvalidFileException(), false);
    }
    callback(null, true);
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
