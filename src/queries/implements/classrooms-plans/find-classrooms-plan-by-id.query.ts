import { IQuery } from '@nestjs/cqrs';

export class FindClassroomsPlanByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
