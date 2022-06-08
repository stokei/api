import { convertToISODateString } from '@stokei/nestjs';
import { ClassroomsEnrollmentEntity } from '@/entities';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

export class ClassroomsEnrollmentMapper {
  toModel(classroomsEnrollment: ClassroomsEnrollmentEntity) {
    return (
      classroomsEnrollment &&
      new ClassroomsEnrollmentModel({
        ...classroomsEnrollment,
        updatedAt: convertToISODateString(classroomsEnrollment.updatedAt),
        createdAt: convertToISODateString(classroomsEnrollment.createdAt)
      })
    );
  }
  toModels(classroomsEnrollments: ClassroomsEnrollmentEntity[]) {
    return classroomsEnrollments?.length > 0
      ? classroomsEnrollments.map(this.toModel).filter(Boolean)
      : [];
  }
}
