import { IQuery } from '@nestjs/cqrs';

export class FindCoursesStudentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
