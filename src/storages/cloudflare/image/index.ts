import { Request } from 'express';
import FormData from 'form-data';
import multer from 'multer';

import { axiosClient } from '@/clients/axios';
import { CLOUDFLARE_ACCOUNT, CLOUDFLARE_TOKEN } from '@/environments';
import {
  ErrorRemovingFileException,
  ErrorUploadingFileException
} from '@/errors';
import { CloudflareCDNUploadResponse } from '@/interfaces';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';

const DESTINATION_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT}/images/v1`;

class CloudflareStorageImageEngine implements multer.StorageEngine {
  _handleFile(
    _req: Request,
    file: any,
    callback: (error: Error | null, info?: Partial<any>) => void
  ): void {
    const body = new FormData();
    body.append('file', file.stream);

    const fileUploadInterceptorModel = new FileUploadInterceptorModel(file);
    const mimetype = fileUploadInterceptorModel.mimetype;
    const extension = fileUploadInterceptorModel.extension;

    void axiosClient
      .post<CloudflareCDNUploadResponse>(DESTINATION_URL, body, {
        headers: {
          ...body.getHeaders(),
          Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
        }
      })
      .then((response) => {
        if (response.data) {
          return callback(null, {
            url: response.data.result.variants[0],
            filename: response.data.result.id,
            mimetype,
            extension
          });
        }
        return callback(new ErrorUploadingFileException());
      })
      .catch(() => {
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
          Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
        }
      })
      .then((response) => {
        if (response.data) return callback(null);
        return callback(new ErrorRemovingFileException());
      });
  }
}

export const cloudflareImageStorage = new CloudflareStorageImageEngine();
