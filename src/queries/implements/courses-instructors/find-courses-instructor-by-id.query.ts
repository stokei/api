import { IQuery } from '@nestjs/cqrs';

export class FindCoursesInstructorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
