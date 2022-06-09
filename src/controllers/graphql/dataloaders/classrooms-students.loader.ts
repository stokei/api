import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomsStudentsService } from '@/services/classrooms-students/find-all-classrooms-students';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomsStudentsLoader {
  constructor(
    private readonly classroomsStudentsService: FindAllClassroomsStudentsService
  ) {}

  readonly findByIds = new DataLoader(
    async (classroomsStudentIds: string[]) => {
      const classroomsStudents = await this.classroomsStudentsService.execute({
        where: {
          AND: {
            ids: classroomsStudentIds
          }
        }
      });
      const classroomsStudentsMap = new Map(
        classroomsStudents?.items?.map((classroomsStudent) => [
          classroomsStudent.id,
          classroomsStudent
        ])
      );
      return classroomsStudentIds.map((classroomsStudentId) =>
        classroomsStudentsMap.get(classroomsStudentId)
      );
    }
  );
}
