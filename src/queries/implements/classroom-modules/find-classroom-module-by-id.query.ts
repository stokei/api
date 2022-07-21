import { IQuery } from '@nestjs/cqrs';

export class FindClassroomModuleByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
