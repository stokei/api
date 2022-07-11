import { IQuery } from '@nestjs/cqrs';

export class FindCourseStudentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
