import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

import { digitaloceanS3 } from '@/clients/digitalocean';
import { DIGITALOCEAN_SPACES_NAME } from '@/environments';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';

export const digitaloceanStorageFiles = multerS3({
  s3: digitaloceanS3,
  bucket: 'some-bucket',
  acl: 'public-read',
  key: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(request, file).filename)
});

export const deleteFile = async (filePath: string): Promise<boolean> => {
  const response = await digitaloceanS3.send(
    new DeleteObjectCommand({
      Bucket: DIGITALOCEAN_SPACES_NAME,
      Key: filePath
    })
  );
  return !!response;
};
