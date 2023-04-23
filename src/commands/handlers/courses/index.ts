import { AddCourseToAppSubscriptionContractCommandHandler } from './add-course-to-app-subscription-contract';
import { CreateCourseCommandHandler } from './create-course';
import { RemoveCourseCommandHandler } from './remove-course';
import { RemoveCourseFromAppSubscriptionContractCommandHandler } from './remove-course-from-app-subscription-contract';
import { UpdateCourseCommandHandler } from './update-course';

export const CourseCommandHandlers = [
  CreateCourseCommandHandler,
  RemoveCourseCommandHandler,
  UpdateCourseCommandHandler,
  AddCourseToAppSubscriptionContractCommandHandler,
  RemoveCourseFromAppSubscriptionContractCommandHandler
];
