import { ICommand } from '@nestjs/cqrs';

import { AddAppAdminToAppSubscriptionContractDTO } from '@/dtos/apps/add-app-admin-to-app-subscription-contract.dto';

export class AddAppAdminToAppSubscriptionContractCommand
  implements ICommand, AddAppAdminToAppSubscriptionContractDTO
{
  app: string;
  admin: string;
  createdBy: string;

  constructor(data: AddAppAdminToAppSubscriptionContractDTO) {
    this.app = data.app;
    this.admin = data.admin;
    this.createdBy = data.createdBy;
  }
}
