import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllClassroomStudentsService } from '@/services/classroom-students/find-all-classroom-students';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomStudentsLoader {
  constructor(
    private readonly classroomStudentsService: FindAllClassroomStudentsService
  ) {}

  readonly findByIds = new DataLoader(async (classroomStudentIds: string[]) => {
    const classroomStudents = await this.classroomStudentsService.execute({
      where: {
        AND: {
          ids: classroomStudentIds
        }
      }
    });
    const classroomStudentsMap = new Map(
      classroomStudents?.items?.map((classroomStudent) => [
        classroomStudent.id,
        classroomStudent
      ])
    );
    return classroomStudentIds.map((classroomStudentId) =>
      classroomStudentsMap.get(classroomStudentId)
    );
  });
}
