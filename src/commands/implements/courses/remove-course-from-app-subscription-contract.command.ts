import { ICommand } from '@nestjs/cqrs';

import { RemoveCourseFromAppSubscriptionContractDTO } from '@/dtos/courses/remove-course-from-app-subscription-contract.dto';

export class RemoveCourseFromAppSubscriptionContractCommand
  implements ICommand, RemoveCourseFromAppSubscriptionContractDTO
{
  course: string;
  removedBy: string;

  constructor(data: RemoveCourseFromAppSubscriptionContractDTO) {
    this.course = data.course;
    this.removedBy = data.removedBy;
  }
}
