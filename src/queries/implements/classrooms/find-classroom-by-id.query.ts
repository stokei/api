import { IQuery } from '@nestjs/cqrs';

export class FindClassroomByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
