import { FileModel } from '@/models/file.model';

export interface CreateImageUploadURLResponse {
  file: FileModel;
  uploadURL: string;
}
