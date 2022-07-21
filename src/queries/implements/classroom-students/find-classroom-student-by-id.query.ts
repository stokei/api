import { IQuery } from '@nestjs/cqrs';

export class FindClassroomStudentByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
