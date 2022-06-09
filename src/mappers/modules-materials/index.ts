import { convertToISODateString } from '@stokei/nestjs';

import { ModulesMaterialEntity } from '@/entities';
import { ModulesMaterialModel } from '@/models/modules-material.model';

export class ModulesMaterialMapper {
  toModel(modulesMaterial: ModulesMaterialEntity) {
    return (
      modulesMaterial &&
      new ModulesMaterialModel({
        ...modulesMaterial,
        updatedAt: convertToISODateString(modulesMaterial.updatedAt),
        createdAt: convertToISODateString(modulesMaterial.createdAt)
      })
    );
  }
  toModels(modulesMaterials: ModulesMaterialEntity[]) {
    return modulesMaterials?.length > 0
      ? modulesMaterials.map(this.toModel).filter(Boolean)
      : [];
  }
}
