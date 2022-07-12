import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomModuleEntity } from '@/entities';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

export class ClassroomModuleMapper {
  toModel(classroomModule: ClassroomModuleEntity) {
    return (
      classroomModule &&
      new ClassroomModuleModel({
        ...classroomModule,
        updatedAt: convertToISODateString(classroomModule.updatedAt),
        createdAt: convertToISODateString(classroomModule.createdAt)
      })
    );
  }
  toModels(classroomModules: ClassroomModuleEntity[]) {
    return classroomModules?.length > 0
      ? classroomModules.map(this.toModel).filter(Boolean)
      : [];
  }
}
