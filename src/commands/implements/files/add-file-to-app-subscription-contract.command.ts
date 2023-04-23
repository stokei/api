import { ICommand } from '@nestjs/cqrs';

import { AddFileToAppSubscriptionContractDTO } from '@/dtos/files/add-file-to-app-subscription-contract.dto';

export class AddFileToAppSubscriptionContractCommand
  implements ICommand, AddFileToAppSubscriptionContractDTO
{
  file: string;
  createdBy: string;

  constructor(data: AddFileToAppSubscriptionContractDTO) {
    this.file = data.file;
    this.createdBy = data.createdBy;
  }
}
