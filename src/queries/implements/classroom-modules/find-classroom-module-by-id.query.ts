import { IQuery } from '@nestjs/cqrs';

export class FindClassroomModuleByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
