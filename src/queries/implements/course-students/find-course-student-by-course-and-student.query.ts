import { IQuery } from '@nestjs/cqrs';

import { FindCourseStudentByCourseAndStudentDTO } from '@/dtos/course-students/find-course-student-by-course-and-student.dto';

export class FindCourseStudentByCourseAndStudentQuery
  implements IQuery, FindCourseStudentByCourseAndStudentDTO
{
  course: string;
  student: string;

  constructor(data: FindCourseStudentByCourseAndStudentDTO) {
    this.course = data.course;
    this.student = data.student;
  }
}
