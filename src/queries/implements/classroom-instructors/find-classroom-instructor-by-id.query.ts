import { IQuery } from '@nestjs/cqrs';

export class FindClassroomInstructorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
