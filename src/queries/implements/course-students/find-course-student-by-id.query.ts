import { IQuery } from '@nestjs/cqrs';

export class FindCourseStudentByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
