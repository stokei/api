import { ICommand } from '@nestjs/cqrs';

import { RemoveVideoFromAppSubscriptionContractDTO } from '@/dtos/files/remove-video-from-app-subscription-contract.dto';
import { FileModel } from '@/models/file.model';

export class RemoveVideoFromAppSubscriptionContractCommand
  implements ICommand, RemoveVideoFromAppSubscriptionContractDTO
{
  file: FileModel;
  removedBy: string;

  constructor(data: RemoveVideoFromAppSubscriptionContractDTO) {
    this.file = data.file;
    this.removedBy = data.removedBy;
  }
}
