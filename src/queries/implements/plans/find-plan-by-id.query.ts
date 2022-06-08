import { IQuery } from '@nestjs/cqrs';

export class FindPlanByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
