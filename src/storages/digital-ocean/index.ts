import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

import { digitaloceanS3 } from '@/clients/digitalocean';
import { DIGITALOCEAN_SPACES_NAME } from '@/environments';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';

export const digitaloceanStorageFiles = multerS3({
  s3: digitaloceanS3,
  bucket: DIGITALOCEAN_SPACES_NAME,
  acl: 'public-read',
  key: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(file).generateFilename())
});

export const digitaloceanDeleteFile = async (
  filename: string
): Promise<boolean> => {
  const response = await digitaloceanS3.send(
    new DeleteObjectCommand({
      Bucket: DIGITALOCEAN_SPACES_NAME,
      Key: filename
    })
  );
  return !!response;
};

export const digitaloceanGetFile = async (filename: string) => {
  return digitaloceanS3.send(
    new GetObjectCommand({
      Bucket: DIGITALOCEAN_SPACES_NAME,
      Key: filename
    })
  );
};
