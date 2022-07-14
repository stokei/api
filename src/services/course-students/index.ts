import { CreateCourseStudentService } from './create-course-student';
import { FindAllCourseStudentsService } from './find-all-course-students';
import { FindCourseStudentByIdService } from './find-course-student-by-id';
import { RemoveCourseStudentService } from './remove-course-student';

export const CourseStudentServices = [
  CreateCourseStudentService,
  RemoveCourseStudentService,
  FindCourseStudentByIdService,
  FindAllCourseStudentsService
];
