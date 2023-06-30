import { ICommand } from '@nestjs/cqrs';

import { RemoveDomainFromAppSubscriptionContractDTO } from '@/dtos/domains/remove-domain-from-app-subscription-contract.dto';
import { DomainModel } from '@/models/domain.model';

export class RemoveDomainFromAppSubscriptionContractCommand
  implements ICommand, RemoveDomainFromAppSubscriptionContractDTO
{
  domain: DomainModel;
  removedBy: string;

  constructor(data: RemoveDomainFromAppSubscriptionContractDTO) {
    this.domain = data.domain;
    this.removedBy = data.removedBy;
  }
}
