import { Request } from 'express';
import FormData from 'form-data';
import multer from 'multer';
import fetch from 'node-fetch';
import * as tus from 'tus-js-client';

import { CLOUDFLARE_KEY, CLOUDFLARE_SECRET } from '@/environments';
import {
  ErrorRemovingFileException,
  ErrorUploadingFileException
} from '@/errors';
import { CloudflareCDNUploadResponse } from '@/interfaces';

const DESTINATION_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_KEY}/stream`;

class CloudflareStorageVideoEngine implements multer.StorageEngine {
  _handleFile(
    _req: Request,
    file: any,
    callback: (error: Error | null, info?: Partial<any>) => void
  ): void {
    const body = new FormData();
    body.append('file', file.stream);

    const headers = {
      Authorization: `Bearer ${CLOUDFLARE_SECRET}`,
      ...body.getHeaders()
    };

    const upload = new tus.Upload(file, {
      endpoint: DESTINATION_URL,
      chunkSize: 5242880,
      headers: headers,
      onError(error) {
        callback(error);
      },
      onSuccess() {
        void fetch(upload.url, {
          method: 'POST',
          headers,
          body
        })
          .then((response) => {
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
          })
          .catch(() => {
            return callback(new ErrorUploadingFileException());
          });
      }
    });
    upload.start();
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

export const cloudflareVideoStorage = new CloudflareStorageVideoEngine();
