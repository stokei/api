import { IQuery } from '@nestjs/cqrs';

export class FindCourseInstructorByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
