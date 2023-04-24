import { ICommand } from '@nestjs/cqrs';

import { RemoveVideoFromAppSubscriptionContractDTO } from '@/dtos/files/remove-video-from-app-subscription-contract.dto';

export class RemoveVideoFromAppSubscriptionContractCommand
  implements ICommand, RemoveVideoFromAppSubscriptionContractDTO
{
  file: string;
  removedBy: string;

  constructor(data: RemoveVideoFromAppSubscriptionContractDTO) {
    this.file = data.file;
    this.removedBy = data.removedBy;
  }
}
