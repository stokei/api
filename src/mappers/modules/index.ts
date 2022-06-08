import { convertToISODateString } from '@stokei/nestjs';
import { ModuleEntity } from '@/entities';
import { ModuleModel } from '@/models/module.model';

export class ModuleMapper {
  toModel(module: ModuleEntity) {
    return (
      module &&
      new ModuleModel({
        ...module,
        updatedAt: convertToISODateString(module.updatedAt),
        createdAt: convertToISODateString(module.createdAt)
      })
    );
  }
  toModels(modules: ModuleEntity[]) {
    return modules?.length > 0 ? modules.map(this.toModel).filter(Boolean) : [];
  }
}
