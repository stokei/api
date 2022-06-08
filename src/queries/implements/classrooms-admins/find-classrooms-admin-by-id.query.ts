import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsAdminByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
