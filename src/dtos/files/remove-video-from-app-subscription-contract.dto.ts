import { FileModel } from '@/models/file.model';

export interface RemoveVideoFromAppSubscriptionContractDTO {
  file: FileModel;
  removedBy: string;
}
