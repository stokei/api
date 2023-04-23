import { ICommand } from '@nestjs/cqrs';

import { RemoveFileFromAppSubscriptionContractDTO } from '@/dtos/files/remove-file-from-app-subscription-contract.dto';

export class RemoveFileFromAppSubscriptionContractCommand
  implements ICommand, RemoveFileFromAppSubscriptionContractDTO
{
  file: string;
  removedBy: string;

  constructor(data: RemoveFileFromAppSubscriptionContractDTO) {
    this.file = data.file;
    this.removedBy = data.removedBy;
  }
}
