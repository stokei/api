import { ICommand } from '@nestjs/cqrs';

import { AddVideoFileToAppSubscriptionContractDTO } from '@/dtos/files/add-video-file-to-app-subscription-contract.dto';

export class AddVideoFileToAppSubscriptionContractCommand
  implements ICommand, AddVideoFileToAppSubscriptionContractDTO
{
  file: string;
  createdBy: string;

  constructor(data: AddVideoFileToAppSubscriptionContractDTO) {
    this.file = data.file;
    this.createdBy = data.createdBy;
  }
}
