import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomsModuleEntity } from '@/entities';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

export class ClassroomsModuleMapper {
  toModel(classroomsModule: ClassroomsModuleEntity) {
    return (
      classroomsModule &&
      new ClassroomsModuleModel({
        ...classroomsModule,
        updatedAt: convertToISODateString(classroomsModule.updatedAt),
        createdAt: convertToISODateString(classroomsModule.createdAt)
      })
    );
  }
  toModels(classroomsModules: ClassroomsModuleEntity[]) {
    return classroomsModules?.length > 0
      ? classroomsModules.map(this.toModel).filter(Boolean)
      : [];
  }
}
