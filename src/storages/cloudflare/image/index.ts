import { Request } from 'express';
import FormData from 'form-data';
import multer from 'multer';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_KEY, CLOUDFLARE_SECRET } from '@/environments';
import {
  ErrorRemovingFileException,
  ErrorUploadingFileException
} from '@/errors';
import { CloudflareCDNUploadResponse } from '@/interfaces';

const DESTINATION_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_KEY}/images/v1`;

class CloudflareStorageImageEngine implements multer.StorageEngine {
  _handleFile(
    _req: Request,
    file: any,
    callback: (error: Error | null, info?: Partial<any>) => void
  ): void {
    const body = new FormData();
    body.append('file', file.stream);
    void axiosClient
      .post<CloudflareCDNUploadResponse>(DESTINATION_URL, body, {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_SECRET}`,
          ...body.getHeaders()
        }
      })
      .then((response) => {
        if (response.data)
          return callback(null, {
            path: response.data.result.variants[0],
            filename: response.data.result.filename,
            destination: response.data.result.id
          });
        return callback(new ErrorUploadingFileException());
      });
  }

  _removeFile(
    _req: Request,
    file: any,
    callback: (error: Error | null) => void
  ): void {
    void axiosClient
      .delete(`${DESTINATION_URL}/${file.destination}`, {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_SECRET}`
        }
      })
      .then((response) => {
        if (response.data) return callback(null);
        return callback(new ErrorRemovingFileException());
      });
  }
}

export const cloudflareImageStorage = new CloudflareStorageImageEngine();
