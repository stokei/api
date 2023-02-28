import { ICommand } from '@nestjs/cqrs';

import { RemoveAppInstructorFromAppSubscriptionContractDTO } from '@/dtos/apps/remove-app-instructor-from-app-subscription-contract.dto';

export class RemoveAppInstructorFromAppSubscriptionContractCommand
  implements ICommand, RemoveAppInstructorFromAppSubscriptionContractDTO
{
  app: string;
  instructor: string;
  removedBy: string;

  constructor(data: RemoveAppInstructorFromAppSubscriptionContractDTO) {
    this.app = data.app;
    this.instructor = data.instructor;
    this.removedBy = data.removedBy;
  }
}
