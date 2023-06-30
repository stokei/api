import { FileModel } from '@/models/file.model';

export interface RemoveFileFromAppSubscriptionContractDTO {
  file: FileModel;
  removedBy: string;
}
