import { ICommand } from '@nestjs/cqrs';

import { AddCourseToAppSubscriptionContractDTO } from '@/dtos/courses/add-course-to-app-subscription-contract.dto';

export class AddCourseToAppSubscriptionContractCommand
  implements ICommand, AddCourseToAppSubscriptionContractDTO
{
  course: string;
  createdBy: string;

  constructor(data: AddCourseToAppSubscriptionContractDTO) {
    this.course = data.course;
    this.createdBy = data.createdBy;
  }
}
