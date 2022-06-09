import { convertToISODateString } from '@stokei/nestjs';

import { ClassroomsTagEntity } from '@/entities';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

export class ClassroomsTagMapper {
  toModel(classroomsTag: ClassroomsTagEntity) {
    return (
      classroomsTag &&
      new ClassroomsTagModel({
        ...classroomsTag,
        updatedAt: convertToISODateString(classroomsTag.updatedAt),
        createdAt: convertToISODateString(classroomsTag.createdAt)
      })
    );
  }
  toModels(classroomsTags: ClassroomsTagEntity[]) {
    return classroomsTags?.length > 0
      ? classroomsTags.map(this.toModel).filter(Boolean)
      : [];
  }
}
