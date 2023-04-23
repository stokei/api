import { ICommand } from '@nestjs/cqrs';

import { AddAppInstructorToAppSubscriptionContractDTO } from '@/dtos/apps/add-app-instructor-to-app-subscription-contract.dto';

export class AddAppInstructorToAppSubscriptionContractCommand
  implements ICommand, AddAppInstructorToAppSubscriptionContractDTO
{
  app: string;
  instructor: string;
  createdBy: string;

  constructor(data: AddAppInstructorToAppSubscriptionContractDTO) {
    this.app = data.app;
    this.instructor = data.instructor;
    this.createdBy = data.createdBy;
  }
}
