import { IQuery } from '@nestjs/cqrs';

export class FindClassroomInstructorByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
