import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsInstructorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
