import { FindCoursesAdminByIdService } from './find-courses-admin-by-id';
import { FindAllCoursesAdminsService } from './find-all-courses-admins';
import { CreateCoursesAdminService } from './create-courses-admin';
import { RemoveCoursesAdminService } from './remove-courses-admin';
import { UpdateCoursesAdminService } from './update-courses-admin';

export const CoursesAdminServices = [
  CreateCoursesAdminService,
  RemoveCoursesAdminService,
  UpdateCoursesAdminService,
  FindCoursesAdminByIdService,
  FindAllCoursesAdminsService
];
