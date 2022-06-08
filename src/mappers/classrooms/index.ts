import { convertToISODateString } from '@stokei/nestjs';
import { ClassroomEntity } from '@/entities';
import { ClassroomModel } from '@/models/classroom.model';

export class ClassroomMapper {
  toModel(classroom: ClassroomEntity) {
    return (
      classroom &&
      new ClassroomModel({
        ...classroom,
        updatedAt: convertToISODateString(classroom.updatedAt),
        createdAt: convertToISODateString(classroom.createdAt)
      })
    );
  }
  toModels(classrooms: ClassroomEntity[]) {
    return classrooms?.length > 0
      ? classrooms.map(this.toModel).filter(Boolean)
      : [];
  }
}
