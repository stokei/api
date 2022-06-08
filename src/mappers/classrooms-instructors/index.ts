import { convertToISODateString } from '@stokei/nestjs';
import { ClassroomsInstructorEntity } from '@/entities';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

export class ClassroomsInstructorMapper {
  toModel(classroomsInstructor: ClassroomsInstructorEntity) {
    return (
      classroomsInstructor &&
      new ClassroomsInstructorModel({
        ...classroomsInstructor,
        updatedAt: convertToISODateString(classroomsInstructor.updatedAt),
        createdAt: convertToISODateString(classroomsInstructor.createdAt)
      })
    );
  }
  toModels(classroomsInstructors: ClassroomsInstructorEntity[]) {
    return classroomsInstructors?.length > 0
      ? classroomsInstructors.map(this.toModel).filter(Boolean)
      : [];
  }
}
