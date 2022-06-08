import { convertToISODateString } from '@stokei/nestjs';
import { ClassroomsPlanEntity } from '@/entities';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

export class ClassroomsPlanMapper {
  toModel(classroomsPlan: ClassroomsPlanEntity) {
    return (
      classroomsPlan &&
      new ClassroomsPlanModel({
        ...classroomsPlan,
        updatedAt: convertToISODateString(classroomsPlan.updatedAt),
        createdAt: convertToISODateString(classroomsPlan.createdAt)
      })
    );
  }
  toModels(classroomsPlans: ClassroomsPlanEntity[]) {
    return classroomsPlans?.length > 0
      ? classroomsPlans.map(this.toModel).filter(Boolean)
      : [];
  }
}
