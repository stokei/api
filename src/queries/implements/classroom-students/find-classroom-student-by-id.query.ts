import { IQuery } from '@nestjs/cqrs';

export class FindClassroomStudentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
