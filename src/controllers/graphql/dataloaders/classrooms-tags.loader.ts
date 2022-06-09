import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomsTagsService } from '@/services/classrooms-tags/find-all-classrooms-tags';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsTagsLoader {
  constructor(
    private readonly classroomsTagsService: FindAllClassroomsTagsService
  ) {}

  readonly findByIds = new DataLoader(async (classroomsTagIds: string[]) => {
    const classroomsTags = await this.classroomsTagsService.execute({
      where: {
        AND: {
          ids: classroomsTagIds
        }
      }
    });
    const classroomsTagsMap = new Map(
      classroomsTags?.items?.map((classroomsTag) => [
        classroomsTag.id,
        classroomsTag
      ])
    );
    return classroomsTagIds.map((classroomsTagId) =>
      classroomsTagsMap.get(classroomsTagId)
    );
  });
}
