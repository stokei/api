import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsMaterialByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
