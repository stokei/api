import { ICommand } from '@nestjs/cqrs';

import { RemoveAppAdminFromAppSubscriptionContractDTO } from '@/dtos/app-admins/remove-app-admin-from-app-subscription-contract.dto';

export class RemoveAppAdminFromAppSubscriptionContractCommand
  implements ICommand, RemoveAppAdminFromAppSubscriptionContractDTO
{
  appAdmin: string;
  removedBy: string;

  constructor(data: RemoveAppAdminFromAppSubscriptionContractDTO) {
    this.appAdmin = data.appAdmin;
    this.removedBy = data.removedBy;
  }
}
