import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsEnrollmentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
