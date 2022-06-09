import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomsMaterialEntity } from '@/entities';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

export class ClassroomsMaterialMapper {
  toModel(classroomsMaterial: ClassroomsMaterialEntity) {
    return (
      classroomsMaterial &&
      new ClassroomsMaterialModel({
        ...classroomsMaterial,
        updatedAt: convertToISODateString(classroomsMaterial.updatedAt),
        createdAt: convertToISODateString(classroomsMaterial.createdAt)
      })
    );
  }
  toModels(classroomsMaterials: ClassroomsMaterialEntity[]) {
    return classroomsMaterials?.length > 0
      ? classroomsMaterials.map(this.toModel).filter(Boolean)
      : [];
  }
}
