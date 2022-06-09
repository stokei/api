import { CreateCoursesStudentService } from './create-courses-student';
import { FindAllCoursesStudentsService } from './find-all-courses-students';
import { FindCoursesStudentByIdService } from './find-courses-student-by-id';
import { RemoveCoursesStudentService } from './remove-courses-student';
import { UpdateCoursesStudentService } from './update-courses-student';

export const CoursesStudentServices = [
  CreateCoursesStudentService,
  RemoveCoursesStudentService,
  UpdateCoursesStudentService,
  FindCoursesStudentByIdService,
  FindAllCoursesStudentsService
];
