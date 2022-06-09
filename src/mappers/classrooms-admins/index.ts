import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomsAdminEntity } from '@/entities';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

export class ClassroomsAdminMapper {
  toModel(classroomsAdmin: ClassroomsAdminEntity) {
    return (
      classroomsAdmin &&
      new ClassroomsAdminModel({
        ...classroomsAdmin,
        updatedAt: convertToISODateString(classroomsAdmin.updatedAt),
        createdAt: convertToISODateString(classroomsAdmin.createdAt)
      })
    );
  }
  toModels(classroomsAdmins: ClassroomsAdminEntity[]) {
    return classroomsAdmins?.length > 0
      ? classroomsAdmins.map(this.toModel).filter(Boolean)
      : [];
  }
}
