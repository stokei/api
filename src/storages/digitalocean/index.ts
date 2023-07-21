import { existsSync, unlinkSync } from 'fs';
import multerS3 from 'multer-s3';

import { s3Client } from '@/clients/s3';
import { PATHNAME_FILES } from '@/constants/upload-file-paths';
import { DIGITALOCEAN_BUCKET } from '@/environments';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export const digitalOceanStorageFiles = multerS3({
  s3: s3Client,
  bucket: DIGITALOCEAN_BUCKET,
  acl: 'private',
  key: (request, file, callback) => {
    const currentFile = new FileUploadInterceptorModel(file);
    const filename = currentFile.generateFilename();
    const filenameAndPath = appendPathnameToURL(PATHNAME_FILES, filename);
    callback(null, filenameAndPath);
  }
});

export const digitalOceanDeleteFile = async (
  filename: string
): Promise<boolean> => {
  try {
    if (!existsSync(filename)) {
      return false;
    }
    await unlinkSync(filename);
    return true;
  } catch (err) {
    return false;
  }
};
