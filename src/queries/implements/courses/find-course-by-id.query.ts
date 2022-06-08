import { IQuery } from '@nestjs/cqrs';

export class FindCourseByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
