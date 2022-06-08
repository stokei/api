import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsTagByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
