import { CountCoursesAdminsRepository } from './count-courses-admins';
import { CreateCoursesAdminRepository } from './create-courses-admin';
import { ExistsCoursesAdminsRepository } from './exists-courses-admins';
import { FindAllCoursesAdminsRepository } from './find-all-courses-admins';
import { FindCoursesAdminByIdRepository } from './find-courses-admin-by-id';
import { RemoveCoursesAdminRepository } from './remove-courses-admin';
import { UpdateCoursesAdminRepository } from './update-courses-admin';

export const CoursesAdminsRepositories = [
  CountCoursesAdminsRepository,
  CreateCoursesAdminRepository,
  ExistsCoursesAdminsRepository,
  FindCoursesAdminByIdRepository,
  FindAllCoursesAdminsRepository,
  RemoveCoursesAdminRepository,
  UpdateCoursesAdminRepository
];
