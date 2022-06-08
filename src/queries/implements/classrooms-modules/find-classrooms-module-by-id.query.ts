import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsModuleByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
