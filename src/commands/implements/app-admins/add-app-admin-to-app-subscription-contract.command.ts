import { ICommand } from '@nestjs/cqrs';

import { AddAppAdminToAppSubscriptionContractDTO } from '@/dtos/app-admins/add-app-admin-to-app-subscription-contract.dto';

export class AddAppAdminToAppSubscriptionContractCommand
  implements ICommand, AddAppAdminToAppSubscriptionContractDTO
{
  appAdmin: string;
  createdBy: string;

  constructor(data: AddAppAdminToAppSubscriptionContractDTO) {
    this.appAdmin = data.appAdmin;
    this.createdBy = data.createdBy;
  }
}
