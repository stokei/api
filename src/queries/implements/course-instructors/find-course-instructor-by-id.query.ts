import { IQuery } from '@nestjs/cqrs';

export class FindCourseInstructorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
