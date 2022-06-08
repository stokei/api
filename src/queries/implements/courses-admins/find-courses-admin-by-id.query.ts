import { IQuery } from '@nestjs/cqrs';

export class FindCoursesAdminByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
