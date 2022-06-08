import { Injectable, Scope } from '@nestjs/common';
import { FindAllClassroomsService } from '@/services/classrooms/find-all-classrooms';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsLoader {
  constructor(private readonly classroomsService: FindAllClassroomsService) {}

  readonly findByIds = new DataLoader(async (classroomIds: string[]) => {
    const classrooms = await this.classroomsService.execute({
      where: {
        AND: {
          ids: classroomIds
        }
      }
    });
    const classroomsMap = new Map(
      classrooms?.items?.map((classroom) => [classroom.id, classroom])
    );
    return classroomIds.map((classroomId) => classroomsMap.get(classroomId));
  });
}
