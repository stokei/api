import { CreateCoursesAdminCommandHandler } from './create-courses-admin';
import { RemoveCoursesAdminCommandHandler } from './remove-courses-admin';
import { UpdateCoursesAdminCommandHandler } from './update-courses-admin';

export const CoursesAdminCommandHandlers = [
  CreateCoursesAdminCommandHandler,
  RemoveCoursesAdminCommandHandler,
  UpdateCoursesAdminCommandHandler
];
