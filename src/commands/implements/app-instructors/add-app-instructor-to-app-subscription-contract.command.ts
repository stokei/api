import { ICommand } from '@nestjs/cqrs';

import { AddAppInstructorToAppSubscriptionContractDTO } from '@/dtos/app-instructors/add-app-instructor-to-app-subscription-contract.dto';

export class AddAppInstructorToAppSubscriptionContractCommand
  implements ICommand, AddAppInstructorToAppSubscriptionContractDTO
{
  appInstructor: string;
  createdBy: string;

  constructor(data: AddAppInstructorToAppSubscriptionContractDTO) {
    this.appInstructor = data.appInstructor;
    this.createdBy = data.createdBy;
  }
}
