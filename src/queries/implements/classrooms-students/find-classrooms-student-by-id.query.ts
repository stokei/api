import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsStudentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
