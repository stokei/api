import { IQuery } from '@nestjs/cqrs';

export class FindProjectsPlanByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
