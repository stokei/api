import { convertToISODateString } from '@stokei/nestjs';
import { CoursesAdminEntity } from '@/entities';
import { CoursesAdminModel } from '@/models/courses-admin.model';

export class CoursesAdminMapper {
  toModel(coursesAdmin: CoursesAdminEntity) {
    return (
      coursesAdmin &&
      new CoursesAdminModel({
        ...coursesAdmin,
        updatedAt: convertToISODateString(coursesAdmin.updatedAt),
        createdAt: convertToISODateString(coursesAdmin.createdAt)
      })
    );
  }
  toModels(coursesAdmins: CoursesAdminEntity[]) {
    return coursesAdmins?.length > 0
      ? coursesAdmins.map(this.toModel).filter(Boolean)
      : [];
  }
}
