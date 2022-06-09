import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomsStudentEntity } from '@/entities';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

export class ClassroomsStudentMapper {
  toModel(classroomsStudent: ClassroomsStudentEntity) {
    return (
      classroomsStudent &&
      new ClassroomsStudentModel({
        ...classroomsStudent,
        updatedAt: convertToISODateString(classroomsStudent.updatedAt),
        createdAt: convertToISODateString(classroomsStudent.createdAt)
      })
    );
  }
  toModels(classroomsStudents: ClassroomsStudentEntity[]) {
    return classroomsStudents?.length > 0
      ? classroomsStudents.map(this.toModel).filter(Boolean)
      : [];
  }
}
