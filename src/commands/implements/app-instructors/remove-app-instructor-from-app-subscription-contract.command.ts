import { ICommand } from '@nestjs/cqrs';

import { RemoveAppInstructorFromAppSubscriptionContractDTO } from '@/dtos/app-instructors/remove-app-instructor-from-app-subscription-contract.dto';

export class RemoveAppInstructorFromAppSubscriptionContractCommand
  implements ICommand, RemoveAppInstructorFromAppSubscriptionContractDTO
{
  appInstructor: string;
  removedBy: string;

  constructor(data: RemoveAppInstructorFromAppSubscriptionContractDTO) {
    this.appInstructor = data.appInstructor;
    this.removedBy = data.removedBy;
  }
}
