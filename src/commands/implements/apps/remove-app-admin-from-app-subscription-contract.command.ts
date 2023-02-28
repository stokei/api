import { ICommand } from '@nestjs/cqrs';

import { RemoveAppAdminFromAppSubscriptionContractDTO } from '@/dtos/apps/remove-app-admin-from-app-subscription-contract.dto';

export class RemoveAppAdminFromAppSubscriptionContractCommand
  implements ICommand, RemoveAppAdminFromAppSubscriptionContractDTO
{
  app: string;
  admin: string;
  removedBy: string;

  constructor(data: RemoveAppAdminFromAppSubscriptionContractDTO) {
    this.app = data.app;
    this.admin = data.admin;
    this.removedBy = data.removedBy;
  }
}
