import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomStudentEntity } from '@/entities';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

export class ClassroomStudentMapper {
  toModel(classroomStudent: ClassroomStudentEntity) {
    return (
      classroomStudent &&
      new ClassroomStudentModel({
        ...classroomStudent,
        updatedAt: convertToISODateString(classroomStudent.updatedAt),
        createdAt: convertToISODateString(classroomStudent.createdAt)
      })
    );
  }
  toModels(classroomStudents: ClassroomStudentEntity[]) {
    return classroomStudents?.length > 0
      ? classroomStudents.map(this.toModel).filter(Boolean)
      : [];
  }
}
