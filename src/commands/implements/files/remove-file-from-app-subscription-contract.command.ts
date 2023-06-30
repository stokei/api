import { ICommand } from '@nestjs/cqrs';

import { RemoveFileFromAppSubscriptionContractDTO } from '@/dtos/files/remove-file-from-app-subscription-contract.dto';
import { FileModel } from '@/models/file.model';

export class RemoveFileFromAppSubscriptionContractCommand
  implements ICommand, RemoveFileFromAppSubscriptionContractDTO
{
  file: FileModel;
  removedBy: string;

  constructor(data: RemoveFileFromAppSubscriptionContractDTO) {
    this.file = data.file;
    this.removedBy = data.removedBy;
  }
}
