import { IQuery } from '@nestjs/cqrs';

export class FindVideoAuthorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
