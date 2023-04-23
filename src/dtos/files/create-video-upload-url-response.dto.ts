import { FileModel } from '@/models/file.model';

export interface CreateVideoUploadURLResponse {
  file: FileModel;
  uploadURL: string;
}
