import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomInstructorEntity } from '@/entities';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

export class ClassroomInstructorMapper {
  toModel(classroomInstructor: ClassroomInstructorEntity) {
    return (
      classroomInstructor &&
      new ClassroomInstructorModel({
        ...classroomInstructor,
        updatedAt: convertToISODateString(classroomInstructor.updatedAt),
        createdAt: convertToISODateString(classroomInstructor.createdAt)
      })
    );
  }
  toModels(classroomInstructors: ClassroomInstructorEntity[]) {
    return classroomInstructors?.length > 0
      ? classroomInstructors.map(this.toModel).filter(Boolean)
      : [];
  }
}
