import { IQuery } from '@nestjs/cqrs';

export class FindPlanByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
