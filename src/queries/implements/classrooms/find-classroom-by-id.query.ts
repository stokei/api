import { IQuery } from '@nestjs/cqrs';

export class FindClassroomByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
