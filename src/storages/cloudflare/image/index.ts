import { Request } from 'express';
import FormData from 'form-data';
import multer from 'multer';
import fetch from 'node-fetch';

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
    void fetch(DESTINATION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_SECRET}`,
        ...body.getHeaders()
      },
      body
    }).then((response) => {
      void (response.json() as Promise<CloudflareCDNUploadResponse>).then(
        (data) => {
          if (response.ok)
            return callback(null, {
              path: data.result.variants[0],
              filename: data.result.filename,
              destination: data.result.id
            });
          return callback(new ErrorUploadingFileException());
        }
      );
    });
  }

  _removeFile(
    _req: Request,
    file: any,
    callback: (error: Error | null) => void
  ): void {
    void fetch(`${DESTINATION_URL}/${file.destination}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_SECRET}`
      }
    }).then((response) => {
      if (response.ok) return callback(null);
      return callback(new ErrorRemovingFileException());
    });
  }
}

export const cloudflareImageStorage = new CloudflareStorageImageEngine();
