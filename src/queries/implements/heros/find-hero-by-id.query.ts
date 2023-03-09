import { IQuery } from '@nestjs/cqrs';

export class FindHeroByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
