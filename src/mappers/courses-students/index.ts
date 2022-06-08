import { convertToISODateString } from '@stokei/nestjs';
import { CoursesStudentEntity } from '@/entities';
import { CoursesStudentModel } from '@/models/courses-student.model';

export class CoursesStudentMapper {
  toModel(coursesStudent: CoursesStudentEntity) {
    return (
      coursesStudent &&
      new CoursesStudentModel({
        ...coursesStudent,
        updatedAt: convertToISODateString(coursesStudent.updatedAt),
        createdAt: convertToISODateString(coursesStudent.createdAt)
      })
    );
  }
  toModels(coursesStudents: CoursesStudentEntity[]) {
    return coursesStudents?.length > 0
      ? coursesStudents.map(this.toModel).filter(Boolean)
      : [];
  }
}
