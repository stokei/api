import { ICommand } from '@nestjs/cqrs';

import { AddDomainToAppSubscriptionContractDTO } from '@/dtos/domains/add-domain-to-app-subscription-contract.dto';

export class AddDomainToAppSubscriptionContractCommand
  implements ICommand, AddDomainToAppSubscriptionContractDTO
{
  domain: string;
  app: string;
  createdBy: string;

  constructor(data: AddDomainToAppSubscriptionContractDTO) {
    this.domain = data.domain;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
