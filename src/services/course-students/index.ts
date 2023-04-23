import { CreateCourseStudentService } from './create-course-student';
import { CreateOrFindCourseStudentService } from './create-or-find-course-student';
import { FindAllCourseStudentsService } from './find-all-course-students';
import { FindCourseStudentByCourseAndStudentService } from './find-course-student-by-course-and-student';
import { FindCourseStudentByIdService } from './find-course-student-by-id';
import { RemoveCourseStudentService } from './remove-course-student';

export const CourseStudentServices = [
  CreateCourseStudentService,
  RemoveCourseStudentService,
  FindCourseStudentByIdService,
  FindAllCourseStudentsService,
  FindCourseStudentByCourseAndStudentService,
  CreateOrFindCourseStudentService
];
