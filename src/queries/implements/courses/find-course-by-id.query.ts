import { IQuery } from '@nestjs/cqrs';

export class FindCourseByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
