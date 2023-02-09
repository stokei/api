import { TusFileMetadataModel } from '@/models/tus-file-metadata.model';

export const getFileMetadata = (
  uploadMeta: string | Record<string, string>
): TusFileMetadataModel => {
  if (typeof uploadMeta === 'object') {
    return new TusFileMetadataModel(uploadMeta);
  }

  const metadata = new TusFileMetadataModel();

  uploadMeta?.split?.(',')?.map((item) => {
    const tmp = item.split(' ');
    const key = tmp[0];
    const value = Buffer.from(tmp[1], 'base64').toString('ascii');
    metadata[`${key}`] = value;
  });

  let extension: string = metadata?.filename
    ? metadata?.filename?.split('.')?.pop()
    : null;
  extension = extension || null;
  metadata.extension = extension;

  return metadata;
};
